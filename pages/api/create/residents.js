import connectionWithMongoDB from "@/config/mongoose";
import { Resident } from "@/models/Resident";
import * as handleApiResponses from "@/utils/constantsData/handleApiResponses";
import { residentFieldsNames } from "@/utils/inputFields/residentInputFields";
import { removeNonNumericCharacters } from "@/utils/formatData/removeNonNumericCharacters";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import { defaultSuccessMessages } from "@/utils/constantsData/defaultSuccessMessages";

export default async function handle(request, response) {
      const { method, body } = request;

      const residentData = residentFieldsNames.reduce((accumulator, currentField) => {
            if (body[currentField]) {
                  if (currentField === "residentCpfNumber" || currentField === "residentRgNumber") {
                        accumulator[currentField] = removeNonNumericCharacters(body[currentField]);
                  } else {
                        accumulator[currentField] = body[currentField];
                  }
            } else {
                  accumulator[currentField] = undefined;
            }

            return accumulator;
      }, {});

      try {
            await connectionWithMongoDB();

            switch (method) {
                  case "POST":
                        const newResident = await Resident.create(residentData);

                        return handleApiResponses.handleRegisterSuccess(
                              response,
                              newResident,
                              defaultSuccessMessages.successfullyCreated
                        );

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
