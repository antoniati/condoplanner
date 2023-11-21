// Importa a função de conexão com o MongoDB.
import connectionWithMongoDB from "@/config/mongoose";

// Importa o modelo de Resident do MongoDB.
import { Resident } from "@/models/Resident";

// Importa a função para sanitizar e transformar dados em números inteiros.
import sanitizedAndParInt from "@/utils/sanitizedAndParInt";

// Função principal que manipula as requisições relacionadas à atualização de um morador.
export default async function handle(req, res) {
    try {
        // Aguarda a conexão com o MongoDB antes de processar qualquer requisição.
        await connectionWithMongoDB();

        // Obtém o método HTTP da solicitação (GET, POST, PUT, DELETE).
        const { method } = req;

        // Verifica se o método da solicitação é PUT.
        if (method === "PUT") {
            // Obtém o ID do morador a ser atualizado a partir da URL.
            const { id } = req.query;

            // Obtém os dados da requisição relacionados à atualização do morador.
            const {
                // Dados Pessoais
                residentFullName,
                residentCpfNumber,
                residentRgNumber,
                dateOfBirthOfResident,
                residentEmail,
                residentContactPhone,
                residentOcupation,
                kinshipResident,
                typeOfResident,

                // Endereço
                residentZipCode,
                residentStreet,
                streetComplement,
                residentNeighborhood,
                residentCity,
                residentState,
            } = req.body;

            // Sanitiza e transforma alguns dados em números inteiros.
            const sanitizedRgNumber = sanitizedAndParInt(residentRgNumber);
            const sanitizedCpfNumber = sanitizedAndParInt(residentCpfNumber);
            const sanitizedContactPhone = sanitizedAndParInt(residentContactPhone);
            const sanitizedZipCode = sanitizedAndParInt(residentZipCode);

            // Obtém a data e hora atual no formato UTC.
            const currentDate = new Date();
            const currentDateUTCString = currentDate.toISOString();

            // Realiza a atualização no banco de dados.
            const updatedResident = await Resident.findByIdAndUpdate(
                id,
                {
                    // Dados Pessoais
                    residentFullName,
                    residentCpfNumber: sanitizedCpfNumber,
                    residentRgNumber: sanitizedRgNumber,
                    dateOfBirthOfResident,
                    residentEmail,
                    residentContactPhone: sanitizedContactPhone,
                    residentOcupation,
                    kinshipResident,
                    typeOfResident,

                    // Endereço
                    residentZipCode: sanitizedZipCode,
                    residentStreet,
                    streetComplement,
                    residentNeighborhood,
                    residentCity,
                    residentState,
                    updatedAt: currentDateUTCString,
                },
                { new: true } // Retorna a versão atualizada do morador após a atualização.
            );

            // Retorna os dados do morador atualizado.
            res.status(200).json({
                success: true,
                data: updatedResident,
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
