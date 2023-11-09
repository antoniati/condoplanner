import connectionWithMongoDB from "@/config/mongoose";
import { Resident } from "@/models/Resident";
import sanitizedAndParInt from "@/utils/sanitizedAndParInt";

export default async function handle(req, res) {
    try {
        // Aguarda a conexão com o banco de dados.
        await connectionWithMongoDB();

        // Obtém o método HTTP da solicitação (GET, POST, PUT, DELETE).
        const { method } = req;

        if (method === "GET") {
            // Obtém o RG do morador da consulta da URL
            const { residentRgNumber } = req.query;

            // Transforma o RG do morador em número para fazer a comparação dos dados.
            const sanitizedRgNumber = sanitizedAndParInt(residentRgNumber);

            // Verifica se o RG do morador já existe no banco de dados
            const existingResidentRgNumber = await Resident.findOne({ residentRgNumber: sanitizedRgNumber });

            if (existingResidentRgNumber) {
                // Se existir retornar verdadeiro
                res.status(200).json({ exists: true });
            } else {
                // Se não existir existir retornar falso
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