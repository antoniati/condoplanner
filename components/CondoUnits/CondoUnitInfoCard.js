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
                                          <th>Status</th>
                                          <th>Moradores</th>
                                          <th>Títular</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    <tr className="condoUnitTable">
                                          <td>{condoUnitData?.condoUnitNumber}</td>
                                          <td>{condoUnitData?.condoUnitBlock}</td>
                                          <td>{condoUnitData?.condoUnitStatus}</td>
                                          <td>{condoUnitData?.residents.length}</td>
                                          <td>
                                                {condoUnitData?.residents.map(resident => {
                                                      if (resident.isTitular === true) {
                                                            return resident.residentId.residentFullName
                                                      }
                                                })}
                                          </td>
                                    </tr>
                              </tbody>
                        </table>
                  </section>

                  <section className="listOfPhotos">
                        <h2 className="defaultTitle">
                              Fotos da Unidade
                        </h2>
                        {condoUnitData?.condoUnitImages.length > 0 ? (
                              <ul>
                                    {condoUnitData?.condoUnitImages?.map(
                                          (imageURL, index) =>
                                                <li key={index} >
                                                      <img src={imageURL} />
                                                </li>
                                    )}
                              </ul>
                        ) : (
                              <p>
                                    <HiOutlinePhoto size={30} />
                                    Nenhuma foto adicionada
                              </p>
                        )}
                  </section>
            </section>
      );
};

export default CondoUnitInfoCard;
