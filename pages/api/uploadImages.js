// Importa uma função para conectar-se ao MongoDB usando Mongoose.
import mongooseConnect from "@/config/mongoose";

// Importações relacionadas ao AWS SDK para interagir com o Amazon S3.
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

// Biblioteca para lidar com formulários multipart no Node.js.
import multiparty from "multiparty";

// Biblioteca para determinar o tipo MIME de um arquivo.
import mime from "mime-types";

// Módulo FileSystem para operações de leitura de arquivos.
import fs from "fs"

// Função principal que lida com as requisições.
export default async function handle(req, res) {
    // Conecta-se ao MongoDB usando a função mongooseConnect.
    await mongooseConnect();

    // Manipulação do Formulário e AWS S3:
    const form = new multiparty.Form();

    // Aguarda a conclusão do processamento do formulário e resolve as promessas.
    const { fields, files } = await new Promise((resolve, reject) => {
        // Chama o método `parse` do objeto `form` para analisar a requisição `req`.
        form.parse(req, (err, fields, files) => {
            // Se ocorrer um erro durante o processamento do formulário, rejeita a promessa.
            if (err) reject(err);

            // Caso contrário, resolve a promessa com os campos e arquivos do formulário.
            resolve({ fields, files });
        });
    });

    // Cria uma instância do cliente AWS S3 para interagir com o serviço S3.
    const client = new S3Client({
        // Configura a região e credenciais usando variáveis de ambiente.
        region: "sa-east-1",
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
        }
    })

    // Inicializa uma array para armazenar os links gerados.
    const links = [];

    // Itera sobre cada arquivo no formulário.
    for (const file of files.file) {
        // Gera um novo nome de arquivo baseado na data atual e extensão do arquivo original.
        const extensionFile = file.originalFilename.split(".").pop();
        const newFileName = Date.now() + "." + extensionFile;

        // Envia o arquivo para o Amazon S3 usando o AWS SDK.
        await client.send(new PutObjectCommand({
            // nome do bucket do AWS SDK
            Bucket: process.env.BUCKET_NAME,
            // novo nome do arquivo defino como chave
            Key: newFileName,
            // Lê o conteúdo do arquivo a ser enviado.
            Body: fs.readFileSync(file.path),
            ACL: "public-read",
            // Define o tipo de conteúdo (MIME) do arquivo com base em sua extensão.
            ContentType: mime.lookup(file.path),
        }));

        // Gera o link para o arquivo recém-carregado.
        const link = `https://${process.env.BUCKET_NAME}.s3.sa-east-1.amazonaws.com/${newFileName}`;
        
        // Adiciona o link à array de links.
        links.push(link);
    }

    // Retorna os links gerados como uma resposta JSON.
    return res.json({ links });
}

// Configuração adicional para a API, desabilitando o parse automático do corpo da requisição.
export const config = {
    api: { bodyParser: false },
}
