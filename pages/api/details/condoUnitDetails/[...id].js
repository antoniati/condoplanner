import connectionWithMongoDB from "@/config/mongoose";
import { CondoUnit } from "@/models/CondoUnit";
import * as handleApiResponses from "@/utils/constantsData/handleApiResponses";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import { defaultSuccessMessages } from "@/utils/constantsData/defaultSuccessMessages";

export default async function handle(request, response) {
      const { method, query } = request;
      const { id } = query;

      try {
            await connectionWithMongoDB();

            switch (method) {
                  case "GET":
                        const condoUnitData = await CondoUnit.findById(id).populate("residents.residentId");

                        if (condoUnitData) {
                              return handleApiResponses.handleRequestSuccess(
                                    response,
                                    condoUnitData,
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
