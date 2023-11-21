// Importa a função de conexão com o MongoDB.
import connectionWithMongoDB from "@/config/mongoose";

// Importa o modelo CondoUnit do MongoDB.
import { CondoUnit } from "@/models/CondoUnit";

// Função principal que manipula as requisições relacionadas à exclusão de uma unidade do condomínio.
export default async function handle(req, res) {
    try {
        // Aguarda a conexão com o MongoDB antes de processar qualquer requisição.
        await connectionWithMongoDB();

        // Obtém o método HTTP da solicitação (GET, POST, PUT, DELETE).
        const { method } = req;

        // Verifica o método da solicitação.
        if (method === "DELETE") {
            // Obtém o ID da unidade a ser excluída da URL.
            const { id } = req.query;

            // Realiza a exclusão no banco de dados com base no ID fornecido.
            await CondoUnit.findByIdAndDelete(id);

            // Retorna uma resposta de sucesso após a exclusão.
            res.status(200).json({
                success: true,
                message: "Unidade excluída com sucesso.",
            });
        } else {
            // Se o método não for DELETE, retorna um erro indicando método não permitido.
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
