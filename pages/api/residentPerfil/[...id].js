// Importa a função de conexão com o MongoDB.
import connectionWithMongoDB from "@/config/mongoose";

// Importa o modelo Resident do MongoDB.
import { Resident } from "@/models/Resident";

// Função principal que manipula as requisições relacionadas à busca de moradores por ID.
export default async function handle(req, res) {
    try {
        // Aguarda a conexão com o MongoDB antes de processar qualquer requisição.
        await connectionWithMongoDB();

        // Verifica se o método da solicitação é GET.
        if (req.method === "GET") {
            // Obtém o ID do morador a ser buscado a partir da URL.
            const { id } = req.query;

            // Verifica se o ID foi fornecido na consulta.
            if (!id) {
                // Retorna um erro indicando que o ID do morador não foi fornecido.
                return res.status(400).json({
                    success: false,
                    error: "ID do morador não fornecido.",
                });
            }

            // Busca o morador no banco de dados usando o ID fornecido.
            const resident = await Resident.findById(id);

            // Verifica se o morador foi encontrado.
            if (!resident) {
                // Retorna um erro indicando que o morador não foi encontrado.
                return res.status(404).json({
                    success: false,
                    error: "Morador não encontrado.",
                });
            }

            // Retorna os dados do morador encontrado.
            res.status(200).json({
                success: true,
                data: resident,
            });
        } else {
            // Se o método da solicitação não for GET, retorna um erro indicando método não permitido.
            res.status(405).json({
                success: false,
                error: "Método não permitido.",
            });
        }
    } catch (error) {
        // Captura e retorna erros inesperados durante o processamento.
        console.error("Erro ao processar a solicitação:", error);
        return res.status(500).json({
            success: false,
            error: "Ocorreu um erro ao processar a solicitação.",
        });
    }
}
