import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiEye } from "react-icons/hi2";
import CustomButton from "@/components/Buttons/CustomButton";
import DataNotFoundMessage from "../Loadings/DataNotFoundMessage";

const CondoUnitTable = ({ filter, condoUnitsData }) => {
      const [filteredCondoUnitsData, setFilteredCondoUnitsData] = useState([]);
      const router = useRouter();

      useEffect(() => {
            filterCondoUnits();
      }, [filter, condoUnitsData]);

      const filterCondoUnits = () => {
            const filteredData = condoUnitsData.data.allCondoUnits ?
                  condoUnitsData.data.allCondoUnits.filter((condoUnit) => {
                        const { type, query } = filter;

                        if (type === "all" || condoUnit.typeOfCondoUnit === type) {
                              const searchQuery = query.toLowerCase();
                              const number = condoUnit.condoUnitNumber?.toString();
                              const fullName = condoUnit.residents &&
                                    condoUnit.residents.find(resident =>
                                          resident.isHolder)?.residentId?.residentFullName.toLowerCase();
                              return (
                                    fullName?.includes(searchQuery) ||
                                    number?.includes(searchQuery)
                              );
                        }

                        return false;

                  }) : [];

            setFilteredCondoUnitsData(filteredData);
      }

      const handleGoDetailsPage = (id) => {
            return router.push(`/unidades/detalhes/${id}`);
      }

      return (
            <section className={"basicTable"}>
                  {filteredCondoUnitsData.length > 0 ? (
                        <table>
                              <thead>
                                    <tr>
                                          <th>Unidade</th>
                                          <th>Bloco</th>
                                          <th>Tipo</th>
                                          <th>Status de Acesso</th>
                                          <th>Moradores</th>
                                          <th></th>
                                    </tr>
                              </thead>

                              <tbody>
                                    {filteredCondoUnitsData.map(condoUnit => (
                                          <tr key={condoUnit._id} >
                                                <td>{condoUnit.condoUnitNumber}</td>
                                                <td>{condoUnit.condoUnitBlock}</td>
                                                <td>{condoUnit.typeOfCondoUnit}</td>
                                                <td>{condoUnit.accessLogs.length === 0 ? "N/A" : (
                                                      () => {
                                                            const currentDate = new Date();
                                                            let activeAccess = null;
                                                            let pendingAccess = null;
                                                            let finalizedAccess = null;

                                                            condoUnit.accessLogs.forEach(accessLog => {
                                                                  const startDate = new Date(accessLog.checkIn);
                                                                  const endDate = new Date(accessLog.checkOut);

                                                                  if (accessLog.statusAccessLog === "ativo") {
                                                                        activeAccess = accessLog;
                                                                  } else if (accessLog.statusAccessLog === "pendente" && startDate > currentDate && (!pendingAccess || startDate < new Date(pendingAccess.checkIn))) {
                                                                        pendingAccess = accessLog;
                                                                  } else if (accessLog.statusAccessLog === "finalizado" && (!finalizedAccess || endDate > new Date(finalizedAccess.checkOut))) {
                                                                        finalizedAccess = accessLog;
                                                                  }
                                                            });

                                                            if (activeAccess) {
                                                                  return "Ativo";
                                                            } else if (pendingAccess) {
                                                                  return "Pendente";
                                                            } else if (finalizedAccess) {
                                                                  return "Finalizado";
                                                            }

                                                            return "N/A";
                                                      })()
                                                }
                                                </td>
                                                <td>{condoUnit.accessLogs.filter(accessLog => accessLog.statusAccessLog !== "finalizado").reduce((total, accessLog) => total + (accessLog.residents?.length || 0), 0)}</td>
                                                <td>
                                                      <span>
                                                            <CustomButton
                                                                  buttonIcon={<HiEye size={24} />}
                                                                  buttonText={"Ver Unidade"}
                                                                  buttonStyle={"gray-button"}
                                                                  buttonType={"button"}
                                                                  buttonFunction={() =>
                                                                        handleGoDetailsPage(condoUnit._id)
                                                                  }
                                                            />
                                                      </span>
                                                </td>
                                          </tr>
                                    ))}
                              </tbody>
                        </table>
                  ) : (
                        <DataNotFoundMessage />
                  )}
            </section>
      );
};

export default CondoUnitTable;
