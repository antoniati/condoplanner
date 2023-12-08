import axios from "axios";
import InputForm from "@/components/InputForm";
import InputImage from "@/components/InputImage";
import { residentAdressInputFields, residentPersonalDataInputFields } from "@/utils/inputFields/residentInputFields";


const ResidentUptadeDataForm = () => {
      const [formData, setFormData] = useState({});
      const [currentImage, setCurrentImage] = useState(null);
      const [errorMessage, setErrorMessage] = useState({});

      const router = useRouter();
      const { id } = router.query;

      useEffect(() => {
            if (id) {
                  handleFetchResidentData();
            }
      }, [id]);

      const handleFetchResidentData = async () => {
            const residentData = await fetchResidentDataById(id);
            setFormData(residentData);
            setCurrentImage(residentData.residentImage);
      };

      const handleChangesInputFields = (e) => {
            const { name, value } = e.target;
            let maskedValue = value;

            if (name === "residentCpfNumber") {
                  maskedValue = applyCPFMask(value);
            } else if (name === "residentRgNumber") {
                  maskedValue = applyRGMask(value);
            } else if (name === "residentContactPhone") {
                  maskedValue = applyPhoneMask(value);
            };

            setFormData({ ...formData, [name]: maskedValue });

            cleanErrorMessage(name);
      };

      const cleanErrorMessage = (fieldName) => {
            setErrorMessage((prevErrors) => ({
                  ...prevErrors,
                  [fieldName]: "",
            }));
      };

      const handleUpdateResident = async (e) => {
            e.preventDefault();

            try {
                  const response = await axios.put(`/api/update/updateResident/${id}`, formData);

                  if (response.data.success) {
                        setIsModalOpen(true);

                        if (!formData.residentImage) {
                              setFormData({
                                    ...formData,
                                    residentImage: currentImage
                              });
                        };
                  };
            } catch (error) {
                  if (error.response?.status === 404) {
                        console.log(
                              `${defaultErrorMessage.dataNotFound}`,
                              error.response.status
                        );
                  } else if (error.response?.status === 405) {
                        console.log(
                              `${defaultErrorMessage.methodNotAllowed}`,
                              error.response.status
                        );
                  } else {
                        console.log(
                              `${defaultErrorMessage.internalServerError}`,
                              error.response.status
                        );
                  };
            };
      };

      const handleGoBackPage = () => {
            return router.push(`/moradores/perfil/${id}`);
      }

      return (
            <section className={"mainWrapper"}>
                  <form className={"basicForm"} >
                        <h2 className={"defaultTitle"}>
                              Dados Pessoais
                        </h2>
                        <InputImage
                              onImageSelect={(image) =>
                                    setFormData({
                                          ...formData,
                                          residentImage: image
                                    })
                              }
                        />
                        <section>
                              {residentPersonalDataInputFields.map(
                                    (field, index) => (
                                          <InputForm
                                                key={index}
                                                inputLabelText={field.label}
                                                inputType={field.type}
                                                inputName={field.name}
                                                inputValue={formData[field.name]}
                                                inputMaxLength={field.maxLength}
                                                inputOnChange={handleChangesInputFields}
                                                errorMessage={errorMessage[field.name]}
                                          />
                                    ))}
                              <div className={"formOption"}>
                                    <label>Tipo</label>
                                    <select
                                          name={residentFieldsNames[9]}
                                          value={formData.typeOfResident}
                                          onChange={handleChangesInputFields}
                                    >
                                          <option value="">
                                                Selecione um Tipo
                                          </option>
                                          {filterOptionsResidents.map((option) => (
                                                <option
                                                      key={option.value}
                                                      value={option.value}
                                                >
                                                      {option.label}
                                                </option>
                                          ))}
                                    </select>
                              </div>
                        </section>

                        <h2 className={"defaultTitle"}>
                              Endereço
                        </h2>
                        <section>
                              {residentAdressInputFields.map(
                                    (field, index) => (
                                          <InputForm
                                                key={index}
                                                inputLabelText={field.label}
                                                inputType={field.type}
                                                inputName={field.name}
                                                inputValue={formData[field.name]}
                                                inputOnChange={handleChangesInputFields}
                                          />
                                    ))}
                        </section>

                        <section>
                              <CustomButton
                                    buttonType="submit"
                                    buttonText={"Salvar Edição"}
                                    buttonStyle="blue-button"
                                    buttonFunction={handleUpdateResident}
                              />
                              <CustomButton
                                    buttonType="button"
                                    buttonText={"Cancelar"}
                                    buttonStyle="black-button"
                                    buttonFunction={handleGoBackPage}
                              />
                        </section>
                  </form>
            </section>
      );
}

export default ResidentUptadeDataForm;