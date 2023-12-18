import connectionWithMongoDB from "@/config/mongoose";
import { AccessLog } from "@/models/AccessLog";
import * as handleApiResponses from "@/utils/constantsData/handleApiResponses";

export default async function handle(req, res) {
      const { method, query, body } = req;
      const { id } = query;

      try {
            switch (method) {
                  case 'PUT':
                        await connectionWithMongoDB();

                        if (!body) {
                              return handleApiResponses.handleBadRequest(res, 'Dados insuficientes para a atualização.');
                        }

                        try {
                              const updatedAccessLog = await AccessLog.findByIdAndUpdate(
                                    id,
                                    { ...body },
                                    { new: true }
                              );

                              console.log('Updated Access Log:', updatedAccessLog);

                              if (!updatedAccessLog) {
                                    return handleApiResponses.handleNotFound(res, 'Registro não encontrado.');
                              }

                              return handleApiResponses.handleRequestSuccess(res, updatedAccessLog);
                        } catch (error) {
                              console.error('Erro no servidor:', error);
                              return handleApiResponses.handleInternalServerError(res);
                        }
                  default:
                        return handleApiResponses.handleMethodNotAllowed(res);
            }
      } catch (error) {
            console.error('Erro no servidor:', error);
            return handleApiResponses.handleInternalServerError(res);
      }
}
