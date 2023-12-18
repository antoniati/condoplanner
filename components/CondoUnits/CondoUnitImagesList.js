import { HiOutlinePhoto } from "react-icons/hi2";

const CondoUnitImagesList = ({ imagesData }) => {
      return (
            <section className="sectionContainer">
                  <section className="listOfPhotos">
                        <h2 className="defaultTitle">
                              Fotos da Unidade
                        </h2>
                        {imagesData.condoUnitImages?.length > 0 ? (
                              <ul>
                                    {imagesData?.condoUnitImages?.map(
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
}

export default CondoUnitImagesList;