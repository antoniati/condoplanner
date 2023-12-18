import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiEye, HiTrash, HiClipboardDocumentList, HiPencilSquare } from "react-icons/hi2";
import Layout from "@/components/Layout";
import HeaderSection from "@/components/HeaderSection";
import LoadingDataMessage from "@/components/Loadings/LoadingDataMessage";
import { fetchAccessLogDataById } from "@/utils/fetchData/fetchAccessLogDataById";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";

import CustomButton from "@/components/Buttons/CustomButton";
import { formatDate } from "@/utils/inputFields/inputFieldsMask";
import { calculateDurationInDays } from "@/utils/calculateDurationInDays";

export default function AccessLogDetailsPage() {
      const [accessLogData, setAccessLogData] = useState({});
      const [isLoadingData, setIsLoadingData] = useState(true);

      const router = useRouter();
      const { id } = router.query;

      useEffect(() => {
            setIsLoadingData(true);

            if (id) {
                  handleFetchAccessLogData();
            }

      }, [id]);

      const handleFetchAccessLogData = async () => {
            try {
                  const response = await fetchAccessLogDataById(id);

                  const acceslogData = {
                        ...response
                  }

                  setAccessLogData(acceslogData);

            } catch (error) {
                  console.error(
                        `${defaultErrorMessage.internalServerError}`,
                        error.message
                  );
            } finally {
                  setIsLoadingData(false);
            }
      };

      const handleGoDetailsPage = (id) => {
            return router.push(
                  `/acessos/detalhes/${id}`
            );
      };

      const rowClass = accessLogData.accessLogData?.statusAccessLog === 'ativo'
            ? 'bg-light-blue text-white'
            : accessLogData.accessLogData?.statusAccessLog === 'finalizado'
                  ? 'bg-slate-200 text-dark-gray'
                  : 'bg-red-300 text-dark-gray';

      return (
            <Layout>
                  <HeaderSection
                        headerIcon={<HiClipboardDocumentList />}
                        headerTitle={"Detalhes do Acesso"}
                  >
                        <CustomButton
                              buttonIcon={<HiPencilSquare size={24} />}
                              buttonText={"Editar Acesso"}
                              buttonStyle={"blue-button"}
                              buttonType={"button"}
                              buttonFunction={() =>
                                    router.push(`/acessos/editar/${id}`)
                              }
                        />
                        <CustomButton
                              buttonIcon={<HiTrash size={24} />}
                              buttonText={"Excluir"}
                              buttonStyle={"red-button"}
                              buttonType={"button"}
                              buttonFunction={() =>
                                    router.push(`/acessos/deletar/${id}`)
                              }
                        />
                  </HeaderSection>

                  {isLoadingData ? (
                        <span className="mainWrapper">
                              <LoadingDataMessage />
                        </span>
                  ) : (
                        <span className={"mainWrapper"}>
                              <section className="sectionContainer">
                                    <h2 className="defaultTitle">
                                          Dados do Acesso
                                    </h2>
                                    <section className="basicTable">
                                          <table>
                                                <thead>
                                                      <tr>
                                                            <th>Status</th>
                                                            <th>Check-In</th>
                                                            <th>Check-Out</th>
                                                            <th>Moradores</th>
                                                            <th>Duração</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      <tr>
                                                            <td className={`${rowClass}`}>
                                                                  {accessLogData.accessLogData?.statusAccessLog}
                                                            </td>
                                                            <td>{accessLogData.accessLogData?.checkIn &&
                                                                  formatDate(accessLogData.accessLogData?.checkIn) || "-"
                                                            }</td>
                                                            <td>{accessLogData.accessLogData?.checkIn &&
                                                                  formatDate(accessLogData.accessLogData?.checkOut) || "-"
                                                            }</td>
                                                            <td>{accessLogData.residents?.length}</td>
                                                            <td>
                                                                  {
                                                                        calculateDurationInDays(
                                                                              accessLogData.accessLogData?.checkIn,
                                                                              accessLogData.accessLogData?.checkOut)
                                                                  } Dias
                                                            </td>
                                                      </tr>
                                                </tbody>
                                          </table>
                                    </section>
                              </section>
                              <section className="sectionContainer">
                                    <h2 className="defaultTitle">
                                          Unidade Acessada
                                    </h2>
                                    <section className="basicTable">
                                          <table>
                                                <thead>
                                                      <tr>
                                                            <th>Unidade</th>
                                                            <th>Bloco</th>
                                                            <th>Tipo</th>
                                                            <th></th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      <tr>
                                                            <td>{accessLogData.condoUnitData?.condoUnitNumber}</td>
                                                            <td>{accessLogData.condoUnitData?.condoUnitBlock}</td>
                                                            <td>{accessLogData.condoUnitData?.typeOfCondoUnit}</td>
                                                            <td className="w-40">
                                                                  <span>
                                                                        <CustomButton
                                                                              buttonIcon={<HiEye size={24} />}
                                                                              buttonText={"Ver Unidade"}
                                                                              buttonStyle={"gray-button"}
                                                                              buttonType={"button"}
                                                                              buttonFunction={() =>
                                                                                    router.push(
                                                                                          `/unidades/detalhes/${accessLogData.condoUnitData?._id}`
                                                                                    )
                                                                              }
                                                                        />
                                                                  </span>
                                                            </td>
                                                      </tr>
                                                </tbody>
                                          </table>
                                    </section>
                              </section>
                              <section className="sectionContainer">
                                    <h2 className="defaultTitle">
                                          Residentes do Acesso
                                    </h2>
                                    <section className="basicTable">
                                          <table>
                                                <thead>
                                                      <tr>
                                                            <th className="photo">Foto</th>
                                                            <th>Nome Completo</th>
                                                            <th>Tipo</th>
                                                            <th>Parentesco</th>
                                                            <th></th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {accessLogData?.residents.map((resident, index) => (
                                                            <tr key={index}>
                                                                  <td className="photo">
                                                                        <img src={resident?.residentImage} />
                                                                  </td>
                                                                  <td>{resident?.residentFullName}</td>
                                                                  <td>{resident?.typeOfResident}</td>
                                                                  <td>{resident?.kinshipResident}</td>
                                                                  <td className="w-40">
                                                                        <span>
                                                                              <CustomButton
                                                                                    buttonIcon={<HiEye size={24} />}
                                                                                    buttonText={"Ver Perfil"}
                                                                                    buttonStyle={"black-button"}
                                                                                    buttonType={"button"}
                                                                                    buttonFunction={() =>
                                                                                          router.push(
                                                                                                `/moradores/perfil/${resident?.residentId}`
                                                                                          )
                                                                                    }
                                                                              />
                                                                              {console.log(accessLogData)}
                                                                        </span>
                                                                  </td>
                                                            </tr>
                                                      ))}
                                                </tbody>
                                          </table>
                                    </section>
                              </section>
                        </span>
                  )}
            </Layout>
      );
};
