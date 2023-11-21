// Importa a função de conexão com o MongoDB.
import connectionWithMongoDB from "@/config/mongoose";

// Importa os modelos de CondoUnit e Resident do MongoDB.
import { CondoUnit } from "@/models/CondoUnit";
import { Resident } from "@/models/Resident";

// Importa a função para sanitizar e transformar dados em números inteiros.
import sanitizedAndParInt from "@/utils/sanitizedAndParInt";

// Função principal que manipula as requisições relacionadas à atualização de uma unidade de condomínio.
export default async function handle(req, res) {
    try {
        // Aguarda a conexão com o MongoDB antes de processar qualquer requisição.
        await connectionWithMongoDB();

        // Obtém o método HTTP da solicitação (GET, POST, PUT, DELETE).
        const { method } = req;

        // Verifica se o método da solicitação é PUT.
        if (method === "PUT") {
            // Obtém o ID da unidade de condomínio a ser atualizada a partir da URL.
            const { id } = req.query;

            // Obtém os dados da requisição relacionados à atualização da unidade de condomínio.
            const {
                residentCpfNumber,
                condoUnitNumber,
                condoUnitBlock,
                condoUnitStatus,
                condoUnitImages,
            } = req.body;

            // Sanitiza e transforma alguns dados em números inteiros.
            const sanitizedResidentCpfNumber = sanitizedAndParInt(residentCpfNumber);

            // Busca o residente no banco de dados pelo CPF.
            const resident = await Resident.findOne({ residentCpfNumber: sanitizedResidentCpfNumber });

            // Verifica se o residente existe.
            if (!resident) {
                // Retorna uma resposta de erro com status(404) caso o residente não seja encontrado.
                return res.status(404).json({
                    success: false,
                    error: "Residente não encontrado.",
                });
            }

            // Obtém a data e hora atual no formato UTC.
            const currentDate = new Date();
            const currentDateUTCString = currentDate.toISOString();

            // Realiza a atualização no banco de dados.
            const updatedCondoUnitData = await CondoUnit.findByIdAndUpdate(
                id,
                {
                    residentCpfNumber: sanitizedResidentCpfNumber,
                    residentHolderId: resident._id,
                    condoUnitNumber,
                    condoUnitBlock,
                    condoUnitStatus,
                    condoUnitImages,
                    updatedAt: currentDateUTCString,
                },
                { new: true } // Retorna a versão atualizada da unidade após a atualização.
            );

            // Retorna os dados da unidade de condomínio atualizada.
            res.status(200).json({
                success: true,
                data: updatedCondoUnitData,
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
