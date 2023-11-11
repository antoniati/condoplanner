import connectionWithMongoDB from "@/config/mongoose";
import { Resident } from "@/models/Resident";
import formatDate from "@/utils/formatDate";
import sanitizedAndParInt from "@/utils/sanitizedAndParInt";

export default async function handle(req, res) {
    try {
        // Aguarda a conexão com o banco de dados.
        await connectionWithMongoDB();

        // Obtém o método HTTP da solicitação (GET, POST, PUT, DELETE).
        const { method } = req;

        if (method === "PUT") {
            // Atualiza um Morador existente com base no ID fornecido na URL
            const { id } = req.query;
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

            const sanitizedRgNumber = sanitizedAndParInt(residentRgNumber);
            const sanitizedCpfNumber = sanitizedAndParInt(residentCpfNumber);
            const sanitizedContactPhone = sanitizedAndParInt(residentContactPhone);
            const sanitizedZipCode = sanitizedAndParInt(residentZipCode);

            const currentDate = new Date();
            const currentDateUTCString = currentDate.toISOString();

            // Realiza a atualização no banco de dados
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
                { new: true }
            );

            res.status(200).json({
                success: true,
                data: updatedResident,
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
