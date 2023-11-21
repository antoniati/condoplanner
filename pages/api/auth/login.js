// Importa o modelo User do MongoDB.
import { User } from "@/models/User";

// Importa a função de conexão com o MongoDB.
import connectionWithMongoDB from "@/config/mongoose";

// Importa a biblioteca bcrypt para verificar a senha.
import bcrypt from "bcrypt";

// Função principal que manipula as requisições relacionadas à autenticação de usuários.
export default async function handle(req, res) {
    // Obtém o método HTTP da solicitação (GET, POST, PUT, DELETE).
    const { method } = req;

    // Aguarda a conexão com o MongoDB antes de processar qualquer requisição.
    await connectionWithMongoDB();

    // Verifica o método da solicitação.
    if (method === "POST") {
        // Extrai dados do corpo da solicitação.
        const { userEmail, userPassword } = req.body;

        try {
            // Busca um usuário no banco de dados pelo e-mail.
            const existingUser = await User.findOne({ userEmail });

            // Verifica se o usuário existe.
            if (!existingUser) {
                return res.status(401).json({
                    error: "E-mail ou Senha inválidos."
                });
            }

            // Compara a senha fornecida com a senha armazenada no banco de dados.
            const isPasswordValid = await bcrypt.compare(userPassword, existingUser.userPassword);

            // Verifica se a senha é válida.
            if (!isPasswordValid) {
                return res.status(401).json({
                    error: "E-mail ou Senha inválidos."
                });
            }

            // Retorna uma resposta de sucesso indicando que o usuário está autenticado.
            return res.status(200).json({
                success: "Logado com sucesso!"
            });

        } catch (error) {
            // Captura e retorna erros inesperados durante o processamento.
            console.error(error);
            return res.status(500).json({
                error: 'Erro no servidor.'
            });
        }
    }
}
