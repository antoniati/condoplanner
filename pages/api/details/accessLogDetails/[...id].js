import connectionWithMongoDB from "@/config/mongoose";
import { AccessLog } from "@/models/AccessLog";
import { Resident } from "@/models/Resident";
import { CondoUnit } from "@/models/CondoUnit"; // Certifique-se de importar o modelo correto
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
                        const accessLogFound = await AccessLog.findById(id);

                        if (accessLogFound) {
                              const residentIds = accessLogFound.residents.map(resident => resident.residentId);
                              const isResponsibleList = accessLogFound.residents.map(resident => resident.isResponsible);

                              const residentsDetails = await Resident.find({ _id: { $in: residentIds } });

                              const residents = residentsDetails.map((resident, index) => ({
                                    residentFullName: resident.residentFullName,
                                    residentImage: resident.residentImage,
                                    typeOfResident: resident.typeOfResident,
                                    kinshipResident: resident.kinshipResident,
                                    residentId: resident._id,
                                    isResponsible: isResponsibleList[index]
                              }));

                              const condoUnitData = await CondoUnit.findById(
                                    accessLogFound.condoUnitId,
                                    'condoUnitNumber condoUnitBlock typeOfCondoUnit _id'
                              );

                              const accessLogData = {
                                    statusAccessLog: accessLogFound.statusAccessLog,
                                    checkIn: accessLogFound.checkIn,
                                    checkOut: accessLogFound.checkOut,
                              };

                              return handleApiResponses.handleRequestSuccess(
                                    response,
                                    {
                                          accessLogData,
                                          residents,
                                          condoUnitData
                                    },
                                    defaultSuccessMessages.successfullyFind
                              );
                        } else {
                              return handleApiResponses.handleDataNotFound(
                                    response,
                                    defaultErrorMessage.dataNotFound
                              );
                        }

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
