import connectionWithMongoDB from "@/config/mongoose";
import { Resident } from "@/models/Resident";
import * as handleApiResponses from "@/utils/constantsData/handleApiResponses";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import { defaultSuccessMessages } from "@/utils/constantsData/defaultSuccessMessages";

export default async function handle(request, response) {
      const { method, query } = request;
      const { residentRgNumber } = query;

      try {
            await connectionWithMongoDB();

            switch (method) {
                  case "GET":
                        const residentData = await Resident.findOne({
                              residentRgNumber: residentRgNumber
                        });

                        if (residentData) {
                              return handleApiResponses.handleRequestSuccess(
                                    response,
                                    residentData,
                                    defaultSuccessMessages.successfullyFind
                              );
                        } else {
                              return handleApiResponses.handleDataNotFound(
                                    response,
                                    defaultErrorMessage.dataNotFound
                              );
                        };

                  default:
                        return handleApiResponses.handleMethodNotAllowed(
                              response,
                              defaultErrorMessage.methodNotAllowed
                        );
            };

      } catch (error) {
            return handleApiResponses.handleInternalServerError(
                  response,
                  defaultErrorMessage.internalServerError
            );
      };
};
