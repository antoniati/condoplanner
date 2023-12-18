import connectionWithMongoDB from "@/config/mongoose";
import { Resident } from "@/models/Resident";
import { CondoUnit } from "@/models/CondoUnit";
import * as handleApiResponses from "@/utils/constantsData/handleApiResponses";
import { AccessLog } from "@/models/AccessLog";

export default async function handle(req, res) {
      try {
            switch (req.method) {
                  case "GET":
                        await connectionWithMongoDB();

                        const listOfAllCondoUnits = await CondoUnit.find({});
                        const listOfAllAccessLogs = await AccessLog.find({});
                        const listOfAllResidents = await Resident.find({}).populate("condoUnitIds accessLogs");

                        const responseData = {
                              allCondoUnits: listOfAllCondoUnits,
                              allResidents: listOfAllResidents,
                              allAccessLogs: listOfAllAccessLogs,
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
