import connectionWithMongoDB from "@/config/mongoose";
import { Resident } from "@/models/Resident";

export default async function handle(req, res) {
    try {
        await connectionWithMongoDB();

        if (req.method === "GET") {
            const { id } = req.query;

            // Verifique se o ID foi fornecido na consulta.
            if (!id) {
                return res.status(400).json({
                    success: false,
                    error: "ID do morador não fornecido.",
                });
            }

            // Busque o morador com base no ID fornecido.
            const resident = await Resident.findById(id);

            if (!resident) {
                return res.status(404).json({
                    success: false,
                    error: "Morador não encontrado.",
                });
            }

            // Retorne os dados do morador encontrado.
            res.status(200).json({
                success: true,
                data: resident,
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
