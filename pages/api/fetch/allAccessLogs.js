import connectionWithMongoDB from "@/config/mongoose";
import { AccessLog } from "@/models/AccessLog";
import { CondoUnit } from "@/models/CondoUnit";
import { Resident } from "@/models/Resident";
import * as handleApiResponses from "@/utils/constantsData/handleApiResponses";

export default async function handle(req, res) {
      try {
            switch (req.method) {
                  case "GET":
                        await connectionWithMongoDB();
                        const listOfAllResidents = await Resident.find({});
                        const listOfCondoUnits = await CondoUnit.find({});


                        const listOfAllAccessLogs = await AccessLog.find({}).populate({
                              path: 'condoUnitId',
                              select: 'condoUnitNumber condoUnitBlock typeOfCondoUnit',
                        }).populate({
                              path: 'residents.residentId',
                              select: 'residentFullName typeOfResident kinshipResident',
                        });
                        
                        const responseData = {
                              allAccessLogs: listOfAllAccessLogs,
                              allResidents: listOfAllResidents,
                              allCondoUnits: listOfCondoUnits
                        };

                        handleApiResponses.handleRequestSuccess(res, responseData);
                        break;

                  default:
                        return handleApiResponses.handleMethodNotAllowed(res);
            }

      } catch (error) {
            return handleApiResponses.handleInternalServerError(res);
      };
};
