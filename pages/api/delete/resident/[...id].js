import connectionWithMongoDB from "@/config/mongoose";
import { Resident } from "@/models/Resident";

export default async function handle(req, res) {
    try {
        // Aguarda a conexão com o banco de dados.
        await connectionWithMongoDB();

        // Obtém o método HTTP da solicitação (GET, POST, PUT, DELETE).
        const { method } = req;

        if (method === "DELETE") {
            // Exclui um Morador com base no ID fornecido na URL
            const { id } = req.query;

            // Realiza a exclusão no banco de dados
            await Resident.findByIdAndDelete(id);

            res.status(200).json({
                success: true,
                message: "Morador excluído com sucesso.",
            });
        } else {
            res.status(405).json({
                success: false,
                error: "Método não permitido.",
            });
        }
    } catch (error) {
        console.error("Erro ao processar a solicitação:", error);
        return res.status(500).json({
            success: false,
            error: "Ocorreu um erro ao processar a solicitação.",
        });
    }
}
