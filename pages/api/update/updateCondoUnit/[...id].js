import connectionWithMongoDB from "@/config/mongoose";
import { CondoUnit } from "@/models/CondoUnit";
import * as handleApiResponses from "@/utils/constantsData/handleApiResponses";
import { condoUnitFieldsNames } from "@/utils/inputFields/condoUnitInputFields";

export default async function handle(req, res) {
      const { method, query, body } = req;
      const { id } = query;

      try {
            switch (method) {
                  case "PUT":
                        await connectionWithMongoDB();

                        const condoUnitData = condoUnitFieldsNames.reduce((accumulator, currentField) => {
                              accumulator[currentField] = body[currentField];
                              return accumulator;
                        }, {});

                        const updatedCondoUnit = await CondoUnit.findByIdAndUpdate(
                              id,
                              condoUnitData,
                              { new: true }
                        );

                        return handleApiResponses.handleRequestSuccess(res, updatedCondoUnit);

                  default:
                        return handleApiResponses.handleMethodNotAllowed(res);
            }

      } catch (error) {
            return handleApiResponses.handleInternalServerError(res);
      };
};