import connectionWithMongoDB from "@/config/mongoose";
import { Resident } from "@/models/Resident";
import formatDate from "@/utils/formatDate";
import sanitizedAndParInt from "@/utils/sanitizedAndParInt";

// Rota de Manipulação de Dados dos Moradores
export default async function handle(req, res) {
    try {
        // Aguarda a conexão com o banco de dados.
        await connectionWithMongoDB();

        // Obtém o método HTTP da solicitação (GET, POST, PUT, DELETE).
        const { method } = req;

        // Verifica se o método da solicitação é POST.
        if (method == "POST") {
            // Atribui os dados da solicitação ao corpo (req.body).
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
            currentDate.setHours(currentDate.getHours() - 3);

            // Cria um novo Morador com os dados da solicitação.
            const newResident = await Resident.create({
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
                createdAt: currentDate,

            });

            // Retorna uma resposta de sucesso com os dados do novo Morador.
            res.status(201).json({
                success: true,
                data: newResident
            });

        } else if (method === "GET") {
            // Operação para buscar todos os moradores
            const residents = await Resident.find({});
            res.status(200).json({
                success: true,
                data: residents,
            });
            
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