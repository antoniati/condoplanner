// Importa a função de conexão com o MongoDB.
import connectionWithMongoDB from "@/config/mongoose";

// Importa o modelo Resident do MongoDB.
import { Resident } from "@/models/Resident";

// Função principal que manipula as requisições relacionadas à verificação de existência de e-mail de morador.
export default async function handle(req, res) {
    try {
        // Aguarda a conexão com o MongoDB antes de processar qualquer requisição.
        await connectionWithMongoDB();

        // Obtém o método HTTP da solicitação (GET, POST, PUT, DELETE).
        const { method } = req;

        // Verifica o método da solicitação.
        if (method === "GET") {
            // Obtém o e-mail do morador da consulta da URL.
            const { residentEmail } = req.query;

            // Verifica se o e-mail do morador já existe no banco de dados.
            const existingResident = await Resident.findOne({ residentEmail });

            if (existingResident) {
                // Se existir, retorna verdadeiro e o ID do morador correspondente.
                res.status(200).json({ exists: true, residentId: existingResident._id });
            } else {
                // Se não existir, retorna falso.
                res.status(200).json({ exists: false });
            }
        }
    } catch (error) {
        // Captura e retorna erros inesperados durante o processamento.
        console.error("Erro ao processar a solicitação:", error);
        return res.status(500).json({
            success: false,
            error: "Ocorreu um erro ao processar a solicitação."
        });
    }
}
