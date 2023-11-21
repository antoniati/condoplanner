// Importa a função de conexão com o MongoDB.
import connectionWithMongoDB from "@/config/mongoose";

// Importa o modelo CondoUnit do MongoDB.
import { CondoUnit } from "@/models/CondoUnit";

// Função principal que manipula as requisições relacionadas à obtenção de dados de uma unidade do condomínio.
export default async function handle(req, res) {
    try {
        // Aguarda a conexão com o MongoDB antes de processar qualquer requisição.
        await connectionWithMongoDB();

        // Verifica o método da solicitação (GET, POST, PUT, DELETE).
        if (req.method === "GET") {
            // Obtém o ID da unidade do condomínio a ser consultada a partir da URL.
            const { id } = req.query;

            // Verifica se o ID foi fornecido na consulta.
            if (!id) {
                return res.status(400).json({
                    success: false,
                    error: "ID da unidade do condomínio não fornecido.",
                });
            }

            // Busca a unidade do condomínio com base no ID fornecido, popula o campo residentHolderId.
            const condoUnit = await CondoUnit.findById(id).populate("residentHolderId");

            // Verifica se a unidade do condomínio foi encontrada.
            if (!condoUnit) {
                return res.status(404).json({
                    success: false,
                    error: "Unidade do condomínio não encontrada.",
                });
            }

            // Retorna os dados da unidade do condomínio.
            res.status(200).json({
                success: true,
                data: condoUnit,
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
