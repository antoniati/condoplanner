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
                        const listOfAllAccessLogs = await AccessLog.find({});

                        const listOfAllCondoUnits = await CondoUnit.find({}).populate({
                              path: 'residents.residentId',
                              select: 'residentFullName',
                        }).populate({
                              path: 'accessLogs',
                              select: 'statusAccessLog checkIn checkOut residents',
                        });

                        const responseData = {
                              allResidents: listOfAllResidents,
                              allCondoUnits: listOfAllCondoUnits,
                              allAccessLogs: listOfAllAccessLogs,
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
