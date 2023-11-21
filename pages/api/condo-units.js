// Importa a função de conexão com o MongoDB.
import connectionWithMongoDB from "@/config/mongoose";

// Importa os modelos de CondoUnit e Resident do MongoDB.
import { CondoUnit } from "@/models/CondoUnit"; // modelo das unidades
import { Resident } from "@/models/Resident"; // modelo de residentes

// Importa uma função utilitária.
import sanitizedAndParInt from "@/utils/sanitizedAndParInt";

// Função principal que manipula as requisições relacionadas às unidades de condomínio.
export default async function handle(req, res) {
    try {
        // Aguarda a conexão com o MongoDB antes de processar qualquer requisição.
        await connectionWithMongoDB();

        // Obtém o método HTTP da solicitação (GET, POST, PUT, DELETE).
        const { method } = req;

        // Verifica o método da solicitação.
        if (method === "POST") {
            // Extrai dados do corpo da solicitação.
            const {
                residentCpfNumber,
                condoUnitNumber,
                condoUnitBlock,
                condoUnitStatus,
                condoUnitImages
            } = req.body;

            // Sanitiza e transforma alguns dados em números inteiros.
            const sanitizedResidentCpfNumber = sanitizedAndParInt(residentCpfNumber);

            // Busca o residente no banco de dados pelo CPF.
            const resident = await Resident.findOne({ residentCpfNumber: sanitizedResidentCpfNumber });

            // Verifica se o residente existe.
            if (!resident) {
                // retorna uma resposta de erro com status(404), caso dado não seja encontrado
                return res.status(404).json({
                    success: false,
                    error: "Residente não encontrado.",
                });
            }

            // Cria uma nova unidade de condomínio associada ao residente.
            const newUnit = await CondoUnit.create({
                residentCpfNumber: sanitizedResidentCpfNumber,
                residentHolderId: resident._id,
                condoUnitNumber,
                condoUnitBlock,
                condoUnitStatus,
                condoUnitImages
            });

            // Retorna uma resposta de sucesso com os dados da nova unidade.
            res.status(201).json({
                success: true,
                data: newUnit,
            });

            // Verifica o método da solicitação.
        } else if (method === "GET") {
            // Operação para buscar todas as unidades de condomínio, com dados do residente associado.
            const condoUnits = await CondoUnit.find({}).populate("residentHolderId");

            // Retorna uma resposta com os dados de todas as unidades de condomínio.
            res.status(200).json({
                success: true,
                data: condoUnits,
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
