import { useRouter } from "next/router";
import { HiEye } from "react-icons/hi2";
import CustomButton from "../Buttons/CustomButton";
import DataNotFoundMessage from "../Loadings/DataNotFoundMessage";

const CondoUnitResidentsList = ({ residentsData }) => {
      const router = useRouter();
      return (
            <section className="sectionContainer">
                  <h2 className="defaultTitle">
                        Proprietários da Unidade
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
                                    {residentsData.residents?.length > 0 ? (
                                          residentsData.residents.map(resident => (
                                                <tr key={resident._id}>
                                                      <td className="photo">
                                                            <img
                                                                  src={
                                                                        resident.residentId?.residentImage
                                                                        || "/images/perfil-img.png"
                                                                  }
                                                            />
                                                      </td>
                                                      <td>{resident.residentId?.residentFullName}</td>
                                                      <td>{resident.residentId?.typeOfResident}</td>
                                                      <td>{resident.residentId?.kinshipResident}</td>
                                                      <td className="w-48">
                                                            <span>
                                                                  <CustomButton
                                                                        buttonIcon={<HiEye size={24} />}
                                                                        buttonText={"Ver Perfil"}
                                                                        buttonStyle={"black-button"}
                                                                        buttonType={"button"}
                                                                        buttonFunction={() =>
                                                                              router.push(
                                                                                    `/moradores/perfil/${resident.residentId?._id}`
                                                                              )
                                                                        }
                                                                  />
                                                            </span>
                                                      </td>
                                                </tr>
                                          ))
                                    ) : (
                                          <DataNotFoundMessage />
                                    )}
                              </tbody>
                        </table>
                  </section>
            </section >
      );
}

export default CondoUnitResidentsList;