// Libs
import { useRouter } from "next/router"; // Hook de roteamento do Next.js
import { useEffect, useState } from "react"; // 
import { HiEye } from "react-icons/hi2"; // Ícones da biblioteca "hero-icons"
import { FaRegCalendarCheck, FaRegCalendarXmark } from "react-icons/fa6"; // Ícones da biblioteca "fontawesome"

// Components
import CustomButton from "@/components/Buttons/CustomButton"; // Componente padrão de botão personalizado
import CustomModal from "@/components/CustomModal"; // Componente padrão de modal personalizado
import DataNotFoundMessage from "@/components/Loadings/DataNotFoundMessage"; // Componente padrão de mensagem de dados não encontrados
import LoadingDataMessage from "@/components/Loadings/LoadingDataMessage"; // Componente padrão de mensagem de carregamento de dados.

// Utils
import { formatDate } from "@/utils/inputFields/inputFieldsMask";
import { calculateDurationInDays } from "@/utils/calculateDurationInDays";
import { checkInAccessLog, checkOutAccessLog } from "@/utils/startAccessLog";

const AccessLogTable = ({ filter, accessLogsData }) => {
      const [selectedAccessId, setSelectedAccessId] = useState(null);
      const [filteredAccessLogs, setFilteredAccessLogs] = useState([]);
      const [isModalCheckInOpen, setIsModalCheckInOpen] = useState(false);
      const [isModalCheckOutOpen, setIsModalCheckOutOpen] = useState(false);
      const [isLoadingData, setIsLoadingData] = useState(true);

      useEffect(() => {
            const handleFilter = async () => {
                  if (accessLogsData && accessLogsData.allAccessLogs) {
                        setIsLoadingData(true);

                        const filteredData = accessLogsData.allAccessLogs.filter((accessLog) => {
                              const { type, query } = filter;

                              if (type === "all" || accessLog.statusAccessLog === type) {
                                    const searchQuery = query.toLowerCase();
                                    const condoUnitNumber = accessLog.condoUnitId.condoUnitNumber.toLowerCase();

                                    return condoUnitNumber.includes(searchQuery);
                              }

                              return false;
                        });

                        setFilteredAccessLogs(filteredData.reverse());
                        setIsLoadingData(false);
                  };
            };

            handleFilter();
      }, [filter, accessLogsData]);

      const router = useRouter();

      const handleGoDetailsPage = (id) => {
            return router.push(`/acessos/detalhes/${id}`);
      };

      return (
            <>
                  <section className="basicTable">
                        {isLoadingData ? (
                              <LoadingDataMessage />
                        ) : (
                              filteredAccessLogs.length === 0 ? (
                                    <DataNotFoundMessage />
                              ) : (
                                    <table>
                                          <thead>
                                                <tr>
                                                      <th>Status</th>
                                                      <th>Unidade</th>
                                                      <th>Bloco</th>
                                                      <th>Tipo</th>
                                                      <th>Entrada</th>
                                                      <th>Saída</th>
                                                      <th>Duração</th>
                                                      <th></th>
                                                </tr>
                                          </thead>

                                          <tbody>
                                                {filteredAccessLogs.map((accessLog) => {
                                                      const {
                                                            _id,
                                                            statusAccessLog,
                                                            condoUnitId,
                                                            checkIn,
                                                            checkOut,
                                                      } = accessLog;

                                                      const {
                                                            condoUnitNumber,
                                                            condoUnitBlock,
                                                            typeOfCondoUnit
                                                      } = condoUnitId || {};

                                                      const durationInDays = calculateDurationInDays(checkIn, checkOut);

                                                      const rowClass = statusAccessLog === 'ativo'
                                                            ? 'bg-light-blue text-white'
                                                            : statusAccessLog === 'finalizado'
                                                                  ? 'bg-slate-200 text-dark-gray'
                                                                  : statusAccessLog === 'pendente'
                                                                        ? 'bg-red-300 text-dark-gray'
                                                                        : 'bg-slate-50 text-dark-gray';

                                                      return (
                                                            <tr key={_id}>
                                                                  <td className={`${rowClass}`}>
                                                                        {statusAccessLog}
                                                                  </td>
                                                                  <td>{condoUnitNumber}</td>
                                                                  <td>{condoUnitBlock}</td>
                                                                  <td>{typeOfCondoUnit}</td>
                                                                  <td>{checkIn && formatDate(checkIn) || "-"}</td>
                                                                  <td>{checkOut && formatDate(checkOut) || "-"}</td>
                                                                  <td>{durationInDays && durationInDays || "-"} Dias</td>
                                                                  <td>
                                                                        <div className="flex w-full gap-2">
                                                                              {statusAccessLog === "pendente" ? (
                                                                                    <CustomButton
                                                                                          buttonText={"Check-In"}
                                                                                          buttonStyle={"blue-button"}
                                                                                          buttonType={"button"}
                                                                                          buttonFunction={() => {
                                                                                                setSelectedAccessId(_id);
                                                                                                setIsModalCheckInOpen(true);
                                                                                          }}
                                                                                    />
                                                                              ) : statusAccessLog === "ativo" && (
                                                                                    <CustomButton
                                                                                          buttonText={"Check-Out"}
                                                                                          buttonStyle={"black-button"}
                                                                                          buttonType={"button"}
                                                                                          buttonFunction={() => {
                                                                                                setSelectedAccessId(_id);
                                                                                                setIsModalCheckOutOpen(true);
                                                                                          }}
                                                                                    />
                                                                              )}
                                                                              <CustomButton
                                                                                    buttonIcon={<HiEye size={24} />}
                                                                                    buttonText={"Ver Acesso"}
                                                                                    buttonStyle={"gray-button"}
                                                                                    buttonType={"button"}
                                                                                    buttonFunction={() =>
                                                                                          handleGoDetailsPage(_id)
                                                                                    }
                                                                              />
                                                                        </div>
                                                                  </td>
                                                            </tr>
                                                      )
                                                })}
                                          </tbody>
                                    </table>
                              ))
                        }
                  </section>

                  {isModalCheckInOpen && selectedAccessId && (
                        accessLogsData.allAccessLogs.map((accessLog) => {
                              if (selectedAccessId === accessLog._id) {
                                    const {
                                          condoUnitNumber,
                                          condoUnitBlock
                                    } = accessLog.condoUnitId;

                                    return (
                                          <CustomModal
                                                key={accessLog._id}
                                                modalTitle={
                                                      <span>
                                                            Dar Entrada à Unidade:<br />
                                                            <b>{condoUnitNumber}</b>, bloco: <b>{condoUnitBlock.toUpperCase()}</b> ?
                                                      </span>
                                                }
                                                modalDescription={
                                                      <span>
                                                            Clique em Iniciar Acesso para fazer o
                                                            <b> Check-In</b> da unidade: <b>{condoUnitNumber}</b> bloco: <b>{condoUnitBlock.toUpperCase()}</b> ?
                                                      </span>
                                                }
                                                modalIcon={<FaRegCalendarCheck size={56} color={"#3f3cbb"} />}
                                                functionToCloseModal={() => setIsModalCheckInOpen(false)}
                                          >
                                                <CustomButton
                                                      buttonType={"button"}
                                                      buttonStyle={"blue-button"}
                                                      buttonText={"Iniciar Acesso"}
                                                      buttonFunction={() =>
                                                            checkInAccessLog(
                                                                  selectedAccessId,
                                                                  setIsModalCheckInOpen
                                                            )
                                                      }
                                                />
                                          </CustomModal>
                                    );
                              };
                              return null;
                        }))}
                  {isModalCheckOutOpen && selectedAccessId && (
                        accessLogsData.allAccessLogs.map((accessLog) => {
                              if (selectedAccessId === accessLog._id) {
                                    const {
                                          condoUnitNumber,
                                          condoUnitBlock
                                    } = accessLog.condoUnitId;

                                    return (
                                          <CustomModal
                                                key={accessLog._id}
                                                modalTitle={
                                                      <span>
                                                            Finalizar Acesso à Unidade:<br />
                                                            <b>{condoUnitNumber}</b>, bloco: <b>{condoUnitBlock.toUpperCase()}</b> ?
                                                      </span>
                                                }
                                                modalDescription={
                                                      <span>
                                                            Clique em Finalizar Acesso para fazer o
                                                            <b> Check-out</b> da unidade: <b>{condoUnitNumber}</b> bloco: <b>{condoUnitBlock.toUpperCase()}</b> ?
                                                      </span>
                                                }
                                                modalIcon={<FaRegCalendarXmark size={56} color={"#3f3cbb"} />}
                                                functionToCloseModal={() => setIsModalCheckOutOpen(false)}
                                          >
                                                <CustomButton
                                                      buttonType={"button"}
                                                      buttonStyle={"blue-button"}
                                                      buttonText={"Finalizar Acesso"}
                                                      buttonFunction={() =>
                                                            checkOutAccessLog(
                                                                  selectedAccessId,
                                                                  setIsModalCheckOutOpen
                                                            )
                                                      }
                                                />
                                          </CustomModal>
                                    );
                              }

                              return null;
                        })
                  )
                  }
            </>
      );
};

export default AccessLogTable;