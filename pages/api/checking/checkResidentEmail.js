import connectionWithMongoDB from "@/config/mongoose";
import { Resident } from "@/models/Resident";

// Rota de Manipulação de Dados dos Moradores
export default async function handle(req, res) {
    try {
        // Aguarda a conexão com o banco de dados.
        await connectionWithMongoDB();

        // Obtém o método HTTP da solicitação (GET, POST, PUT, DELETE).
        const { method } = req;

        if (method === "GET") {
            // Obtém o email do morador da consulta da URL
            const { residentEmail } = req.query;

            // Verifica se o email já existe no banco de dados
            const existingResident = await Resident.findOne({ residentEmail });

            if (existingResident) {
                res.status(200).json({ exists: true });
            } else {
                res.status(200).json({ exists: false });
            }
        }
    } catch (error) {
        // Captura e retorna erros inesperados.
        console.error("Erro ao processar a solicitação:", error);
        return res.status(500).json({
            success: false,
            error: "Ocorreu um erro ao processar a solicitação."
        });
    }
}