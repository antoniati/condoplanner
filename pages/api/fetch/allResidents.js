import connectionWithMongoDB from "@/config/mongoose";
import { Resident } from "@/models/Resident";
import { CondoUnit } from "@/models/CondoUnit";
import * as handleApiResponses from "@/utils/constantsData/handleApiResponses";

export default async function handle(req, res) {
      try {
            switch (req.method) {
                  case "GET":
                        await connectionWithMongoDB();

                        // Obter dados de todas as unidades de condomínio
                        const listOfAllCondoUnits = await CondoUnit.find({});

                        // Obter dados de todos os moradores, populando as unidades de condomínio
                        const listOfAllResidents = await Resident.find({}).populate("condoUnitIds");

                        // Combine os dados em um único objeto de resposta
                        const responseData = {
                              allCondoUnits: listOfAllCondoUnits,
                              allResidents: listOfAllResidents,
                        };

                        handleApiResponses.handleRequestSuccess(res, responseData);
                        break;

                  default:
                        return handleApiResponses.handleMethodNotAllowed(res);
            }
      } catch (error) {
            return handleApiResponses.handleInternalServerError(res);
      }
}
