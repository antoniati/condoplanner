// Importa a conexão com o MongoDB e o modelo da unidade
import connectionWithMongoDB from "@/config/mongoose";
import { CondoUnit } from "@/models/CondoUnit";

export default async function handle(req, res) {
    try {
        // Aguarda a conexão com o banco de dados.
        await connectionWithMongoDB();

        // Obtém o método HTTP da solicitação (GET, POST, PUT, DELETE).
        const { method } = req;

        if (method === "GET") {
            // Obtém os parâmetros da consulta da URL
            const { unitNumber, unitBlock } = req.query;

            // Verifica se a unidade já existe no banco de dados
            const existingCondoUnit = await CondoUnit.findOne({ condoUnitNumber: unitNumber, condoUnitBlock: unitBlock });

            if (existingCondoUnit) {
                // Se existir, retorna verdadeiro
                res.status(200).json({ exists: true });
            } else {
                // Se não existir, retorna falso
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
