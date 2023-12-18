import connectionWithMongoDB from "@/config/mongoose";
import { AccessLog } from "@/models/AccessLog";
import { Resident } from "@/models/Resident";
import * as handleApiResponses from "@/utils/constantsData/handleApiResponses";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import { defaultSuccessMessages } from "@/utils/constantsData/defaultSuccessMessages";

export default async function handle(req, res) {
      const { method, query } = req;
      const { id } = query;

      try {
            switch (method) {
                  case "DELETE":
                        await connectionWithMongoDB();

                        const accessLog = await AccessLog.findById(id);

                        if (!accessLog) {
                              return handleApiResponses.handleDataNotFound(res, "Access log not found");
                        }

                        const residentIds = accessLog.residents.map((resident) => resident.residentId);

                        await Resident.updateMany(
                              { _id: { $in: residentIds } },
                              { $pull: { accessLogs: id } },
                              { new: true, runValidators: true }
                        );

                        await AccessLog.findByIdAndDelete(id);

                        return handleApiResponses.handleRequestSuccess(res, null, defaultSuccessMessages.successfullyDeleted);

                  default:
                        console.log(defaultErrorMessage.methodNotAllowed, method);
                        return handleApiResponses.handleMethodNotAllowed(res);
            }
      } catch (error) {
            return handleApiResponses.handleInternalServerError(res);
      }
}
