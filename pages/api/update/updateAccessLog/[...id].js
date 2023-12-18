import connectionWithMongoDB from "@/config/mongoose";
import { AccessLog } from "@/models/AccessLog";
import * as handleApiResponses from "@/utils/constantsData/handleApiResponses";

export default async function handle(req, res) {
      const { method, query, body } = req;
      const { id } = query;

      try {
            switch (method) {
                  case "PUT":
                        await connectionWithMongoDB();

                        if (!body) {
                              return handleApiResponses.handleBadRequest(res, "Dados insuficientes para a atualização.");
                        }

                        const updatedAccessLog = await AccessLog.findByIdAndUpdate(
                              id,
                              {
                                    statusAccessLog: body.statusAccessLog,
                                    checkIn: body.checkIn,
                                    checkOut: body.checkOut,
                              },
                              { new: true }
                        );

                        return handleApiResponses.handleRequestSuccess(res, updatedAccessLog);

                  default:
                        return handleApiResponses.handleMethodNotAllowed(res);
            }
      } catch (error) {
            return handleApiResponses.handleInternalServerError(res);
      }
}
