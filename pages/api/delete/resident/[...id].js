// Importa a função de conexão com o MongoDB.
import connectionWithMongoDB from "@/config/mongoose";

// Importa o modelo Resident do MongoDB.
import { Resident } from "@/models/Resident";

// Função principal que manipula as requisições relacionadas à exclusão de moradores.
export default async function handle(req, res) {
    try {
        // Aguarda a conexão com o MongoDB antes de processar qualquer requisição.
        await connectionWithMongoDB();

        // Verifica o método da solicitação (GET, POST, PUT, DELETE).
        const { method } = req;

        // Verifica se o método da solicitação é DELETE.
        if (method === "DELETE") {
            // Obtém o ID do morador a ser excluído a partir da URL.
            const { id } = req.query;

            // Realiza a exclusão no banco de dados usando o ID fornecido.
            await Resident.findByIdAndDelete(id);

            // Retorna uma resposta de sucesso indicando que o morador foi excluído com sucesso.
            res.status(200).json({
                success: true,
                message: "Morador excluído com sucesso.",
            });
        } else {
            // Se o método da solicitação não for DELETE, retorna um erro indicando método não permitido.
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
