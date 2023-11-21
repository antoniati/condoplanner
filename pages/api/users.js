// Importa o modelo User do MongoDB.
import { User } from "@/models/User";

// Importa a função de conexão com o MongoDB.
import connectionWithMongoDB from "@/config/mongoose";

// Importa o módulo bcrypt para hashing de senha.
import bcrypt from "bcrypt";

// Função principal que manipula as requisições relacionadas à manipulação de dados dos usuários.
export default async function handle(req, res) {
    const { method } = req;

    // Aguarda a conexão com o MongoDB antes de processar qualquer requisição.
    await connectionWithMongoDB();

    // Verifica o método HTTP da solicitação (GET, POST, PUT, DELETE).
    if (method == "GET") {
        // Se o ID foi fornecido na consulta, busca um usuário específico.
        if (req.query?.id) {
            res.json(await User.findOne({ _id: req.query.id }));
        } else {
            // Caso contrário, busca todos os usuários.
            res.json(await User.find());
        }
    }

    if (method == "POST") {
        // Atribui os dados da solicitação ao corpo (req.body).
        const { userEmail, userPassword, confirmPassword } = req.body;

        try {
            // Verifica se o email já existe no banco de dados.
            const existingUser = await User.findOne({ userEmail });
            if (existingUser) {
                return res.status(400).json({
                    error: "E-mail já está cadastrado.",
                });
            }

            // Verifica se as senhas inseridas são iguais.
            if (userPassword !== confirmPassword) {
                return res.status(400).json({
                    errorMessage: "As senhas devem ser iguais.",
                });
            }

            // Faz o hash da senha do usuário.
            const hashedPassword = await bcrypt.hash(userPassword, 10);

            // Cria um novo usuário no banco de dados.
            await User.create({ userEmail, userPassword: hashedPassword });

            // Retorna uma mensagem de sucesso caso o cadastro seja bem-sucedido.
            return res.status(201).json({
                message: 'Usuário cadastrado com sucesso.',
            });
        } catch (error) {
            return res.status(500).json({
                error: 'Erro no servidor.',
            });
        }
    }

    if (method == "PUT") {
        // Atribui os dados da solicitação ao corpo (req.body).
        const { userEmail, userPassword, _id } = req.body;

        // Atualiza os dados do usuário no banco de dados.
        await User.updateOne({ _id }, { userEmail, userPassword });

        // Retorna true para indicar que a atualização foi bem-sucedida.
        res.json(true);
    }

    if (method == "DELETE") {
        // Se o ID foi fornecido na consulta, exclui um usuário específico.
        if (req.query?.id) {
            await User.deleteOne({ _id: req.query.id });
            res.json(true);
        }
    }
}
