import connectionWithMongoDB from "@/config/mongoose";
import { Resident } from "@/models/Resident";
import * as handleApiResponses from "@/utils/constantsData/handleApiResponses";
import { residentFieldsNames } from "@/utils/inputFields/residentInputFields";
import { removeNonNumericCharacters } from "@/utils/formatData/removeNonNumericCharacters";

export default async function handle(req, res) {
      const { method, query, body } = req;
      const { id } = query;

      try {
            switch (method) {
                  case "PUT":
                        await connectionWithMongoDB();

                        const residentData = residentFieldsNames.reduce((accumulator, currentField) => {
                              if (currentField === "residentCpfNumber" || currentField === "residentRgNumber") {
                                    accumulator[currentField] = removeNonNumericCharacters(body[currentField]);
                              } else {
                                    accumulator[currentField] = body[currentField];
                              }
                              return accumulator;
                        }, {});

                        const updatedResident = await Resident.findByIdAndUpdate(
                              id,
                              residentData,
                              { new: true }
                        );

                        return handleApiResponses.handleRequestSuccess(res, updatedResident);

                  default:
                        return handleApiResponses.handleMethodNotAllowed(res);
            }

      } catch (error) {
            return handleApiResponses.handleInternalServerError(res);
      };
};