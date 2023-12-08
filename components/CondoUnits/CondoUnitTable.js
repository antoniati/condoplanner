import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiEye } from "react-icons/hi2";
import CustomButton from "@/components/Buttons/CustomButton";

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

                        if (type === "all" || condoUnit.condoUnitStatus === type) {
                              const searchQuery = query.toLowerCase();
                              const cpf = condoUnit.residentCpfNumber?.toString();
                              const number = condoUnit.condoUnitNumber?.toString();

                              return (
                                    number?.includes(searchQuery)
                                    || cpf?.includes(searchQuery)
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
                  <table>
                        <thead>
                              <tr>
                                    <th>Número da unidade</th>
                                    <th>Bloco</th>
                                    <th>Status</th>
                                    <th>Moradores</th>
                                    <th>Titular da Unidade</th>
                                    <th></th>
                              </tr>
                        </thead>
                        <tbody>
                              {filteredCondoUnitsData &&
                                    filteredCondoUnitsData.map(condoUnit => (
                                          <tr key={condoUnit._id} >
                                                <td>{condoUnit.condoUnitNumber}</td>
                                                <td>{condoUnit.condoUnitBlock}</td>
                                                <td>{condoUnit.condoUnitStatus}</td>
                                                <td>
                                                      {condoUnit.condoUnitStatus === "vazia" ? 0 : condoUnit.residents.length}
                                                </td>
                                                <td>
                                                      {condoUnit.residents &&
                                                            condoUnit.residents.find(resident =>
                                                                  resident.isTitular)?.residentId.residentFullName
                                                      }
                                                </td>
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
            </section>
      );
};

export default CondoUnitTable;
