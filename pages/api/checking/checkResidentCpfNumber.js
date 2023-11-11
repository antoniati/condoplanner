import connectionWithMongoDB from "@/config/mongoose";
import { Resident } from "@/models/Resident";
import sanitizedAndParInt from "@/utils/sanitizedAndParInt";

// Rota de Manipulação de Dados dos Moradores
export default async function handle(req, res) {
    try {
        // Aguarda a conexão com o banco de dados.
        await connectionWithMongoDB();

        // Obtém o método HTTP da solicitação (GET, POST, PUT, DELETE).
        const { method } = req;

        if (method === "GET") {
            // Obtém o CPF do morador da consulta da URL
            const { residentCpfNumber } = req.query;

            // Transforma o CPF do morador em número para fazer a comparação dos dados.
            const sanitizedCpfNumber = sanitizedAndParInt(residentCpfNumber);

            // Verifica se o CPF do morador já existe no banco de dados
            const existingResidentCpfNumber = await Resident.findOne({ residentCpfNumber: sanitizedCpfNumber });
            console.log(existingResidentCpfNumber);

            if (existingResidentCpfNumber) {
                // Se existir retornar verdadeiro
                res.status(200).json({ exists: true, residentId: existingResidentCpfNumber._id });
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