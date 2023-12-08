import connectionWithMongoDB from "@/config/mongoose";
import { CondoUnit } from "@/models/CondoUnit";
import { Resident } from "@/models/Resident";

import * as handleApiResponses from "@/utils/constantsData/handleApiResponses";
import { condoUnitFieldsNames } from "@/utils/inputFields/condoUnitInputFields";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import { defaultSuccessMessages } from "@/utils/constantsData/defaultSuccessMessages";

export default async function handle(request, response) {
      const { method, body } = request;

      const condoUnitData = condoUnitFieldsNames.reduce((accumulator, currentField) => {
            if (currentField === "condoUnitBlock") {
                  accumulator[currentField] = body[currentField].toUpperCase();
            } else {
                  accumulator[currentField] = body[currentField];
            }

            return accumulator;
      }, {});

      try {
            await connectionWithMongoDB();

            switch (method) {
                  case "POST":
                        const newCondoUnit = await CondoUnit.create(condoUnitData);

                        const residentIds = body.residents.map((resident) => resident.residentId);

                        console.log('Resident IDs:', residentIds);

                        await Resident.updateMany(
                              { _id: { $in: residentIds } },
                              { $push: { condoUnitIds: newCondoUnit._id } },
                              { new: true, runValidators: true }
                        );

                        console.log('Residents updated successfully!');

                        return handleApiResponses.handleRegisterSuccess(
                              response,
                              newCondoUnit,
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
