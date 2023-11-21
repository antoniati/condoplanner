// Importa a função de conexão com o MongoDB.
import connectionWithMongoDB from "@/config/mongoose";

// Importa o modelo Resident do MongoDB.
import { Resident } from "@/models/Resident";

// Importa uma função utilitária para transformar dados em números inteiros
import sanitizedAndParInt from "@/utils/sanitizedAndParInt";

// Função principal que manipula as requisições de consulta de morador por CPF.
export default async function handle(req, res) {
    try {
        // Aguarda a conexão com o MongoDB antes de processar qualquer requisição.
        await connectionWithMongoDB();

        // Obtém o método HTTP da solicitação (GET, POST, PUT, DELETE).
        const { method, query } = req;

        // Extrai o CPF do morador dos parâmetros de consulta.
        const { residentCpfNumber } = query;

        // Verifica o método da solicitação.
        if (method === "GET") {
            // Verifica se o CPF foi fornecido na consulta.
            if (!residentCpfNumber) {
                // retorna uma resposta de erro com status(400), em caso de dados vazios
                return res.status(400).json({
                    success: false,
                    error: "O CPF do residente é obrigatório na consulta.",
                });
            }

            // Sanitiza e transforma o CPF em número inteiro.
            const sanitizedResidentCpfNumber = sanitizedAndParInt(residentCpfNumber)

            // Busca o morador no banco de dados pelo CPF formatado.
            const resident = await Resident.findOne({
                residentCpfNumber: sanitizedResidentCpfNumber,
            });

            // Verifica se o morador foi encontrado.
            if (!resident) {
                // retorna uma resposta de erro com status(404), caso não encontre os dados
                return res.status(404).json({
                    success: false,
                    error: "Morador não encontrado com o CPF fornecido.",
                });
            }

            // Retorna uma resposta de sucesso com os dados do morador e status(200).
            res.status(200).json({
                success: true,
                data: resident,
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
