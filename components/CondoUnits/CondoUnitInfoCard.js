import { HiOutlinePhoto } from "react-icons/hi2";
import { formatDateTime } from "@/utils/inputFields/inputFieldsMask";

const CondoUnitInfoCard = ({ condoUnitData }) => {
      return (
            <section className={"sectionContainer"}>
                  <h2 className="defaultTitle">
                        Dados da Unidade
                        <span>
                              <b>Atualizado em:</b>
                              {formatDateTime(condoUnitData?.updatedAt)}
                        </span>
                  </h2>

                  <section className="basicTable">
                        <table>
                              <thead>
                                    <tr>
                                          <th>Número da Unidade</th>
                                          <th>Bloco</th>
                                          <th>Tipo</th>
                                          <th>Status de Acesso</th>
                                          <th>Títular</th>
                                          <th>Contato</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    <tr className="condoUnitTable">
                                          <td>{condoUnitData?.condoUnitNumber}</td>
                                          <td>{condoUnitData?.condoUnitBlock}</td>
                                          <td>{condoUnitData?.typeOfCondoUnit}</td>
                                          <td>{condoUnitData?.accessLogs.length === 0 ? "N/A" : (
                                                () => {
                                                      const currentDate = new Date();
                                                      let activeAccess = null;
                                                      let pendingAccess = null;
                                                      let finalizedAccess = null;

                                                      condoUnitData?.accessLogs.forEach(accessLog => {
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
                                          <td>
                                                {condoUnitData.residents?.map(resident => {
                                                      if (resident.isHolder === true) {
                                                            return resident.residentId?.residentFullName
                                                      }
                                                })}
                                          </td>
                                          <td>
                                                {condoUnitData.residents?.map(resident => {
                                                      if (resident.isHolder === true) {
                                                            return resident.residentId?.residentContactPhone
                                                      }
                                                })}
                                          </td>
                                    </tr>
                              </tbody>
                        </table>
                  </section>
            </section>
      );
};

export default CondoUnitInfoCard;
