import connectionWithMongoDB from "@/config/mongoose";
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
                        await Resident.findByIdAndDelete(id);
                        
                        return handleApiResponses.handleRequestSuccess(
                              res,
                              null,
                              defaultSuccessMessages.successfullyDeleted
                        );

                  default:
                        console.log(defaultErrorMessage.methodNotAllowed, method);
                        return handleApiResponses.handleMethodNotAllowed(res);
            }

      } catch (error) {
            return handleApiResponses.handleInternalServerError(res);
      };
};
