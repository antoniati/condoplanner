import connectionWithMongoDB from "@/config/mongoose";
import { CondoUnit } from "@/models/CondoUnit";
import { Resident } from "@/models/Resident";
import * as handleApiResponses from "@/utils/constantsData/handleApiResponses";

export default async function handle(req, res) {
      const { method, query, body } = req;
      const { id } = query;

      try {
            switch (method) {
                  case "PUT":
                        await connectionWithMongoDB();

                        if (!body || !body.residents) {
                              return handleApiResponses.handleBadRequest(res, "Dados insuficientes para a atualização.");
                        }

                        const updatedCondoUnit = await CondoUnit.findByIdAndUpdate(
                              id,
                              { residents: body.residents },
                              { new: true }
                        );

                        const residentIds = body.residents.map((resident) => resident.residentId);

                        await Resident.updateMany(
                              { _id: { $in: residentIds } },
                              { $push: { condoUnitIds: id } },
                              { new: true, runValidators: true }
                        );

                        return handleApiResponses.handleRequestSuccess(res, updatedCondoUnit);

                  default:
                        return handleApiResponses.handleMethodNotAllowed(res);
            }
      } catch (error) {
            return handleApiResponses.handleInternalServerError(res);
      }
}
