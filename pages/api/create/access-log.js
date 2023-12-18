import connectionWithMongoDB from "@/config/mongoose";
import { AccessLog } from "@/models/AccessLog";
import { CondoUnit } from "@/models/CondoUnit";
import * as handleApiResponses from "@/utils/constantsData/handleApiResponses";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import { defaultSuccessMessages } from "@/utils/constantsData/defaultSuccessMessages";
import { Resident } from "@/models/Resident";

export default async function handle(request, response) {
      const { method, body } = request;

      try {
            await connectionWithMongoDB();

            switch (method) {
                  case "POST":
                        const status = body.statusAccessLog === "ativo" ? "ativo" : "pendente";

                        const accessLogData = {
                              condoUnitId: body.condoUnitId,
                              residents: body.residents,
                              checkIn: body.checkIn ? new Date(body.checkIn) : undefined,
                              checkOut: body.checkOut ? new Date(body.checkOut) : undefined,
                              statusAccessLog: status,
                        };

                        const newAccessLog = await AccessLog.create(accessLogData);

                        await CondoUnit.findByIdAndUpdate(
                              body.condoUnitId,
                              { $push: { accessLogs: newAccessLog._id } },
                              { new: true, runValidators: true }
                        );

                        const residentIds = body.residents.map((resident) => resident.residentId);

                        await Resident.updateMany(
                              { _id: { $in: residentIds } },
                              { $push: { accessLogs: newAccessLog._id } },
                              { new: true, runValidators: true }
                        );

                        return handleApiResponses.handleRegisterSuccess(
                              response,
                              newAccessLog,
                              defaultSuccessMessages.successfullyCreated
                        );

                  default:
                        return handleApiResponses.handleMethodNotAllowed(
                              response,
                              defaultErrorMessage.methodNotAllowed
                        );
            }
      } catch (error) {
            return handleApiResponses.handleInternalServerError(
                  response,
                  defaultErrorMessage.internalServerError
            );
      }
}
