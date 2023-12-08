import { useEffect, useState } from "react";
import { HiBuildingOffice2, HiMagnifyingGlass } from "react-icons/hi2";

import HeaderSection from "@/components/HeaderSection";
import InputForm from "@/components/InputForm";
import CustomButton from "@/components/CustomButton";
import SpinnerSyncLoader from "@/components/Loadings/SpinnerSyncLoader";

import { applyCPFMask } from "@/utils/inputFields/inputFieldsMask";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import { fetchResidentDataByCpf } from "@/utils/fetchData/fetchResidentByCpf";
import { removeNonNumericCharacters } from "@/utils/formatData/removeNonNumericCharacters";
import { residentPersonalDataInputFields } from "@/utils/inputFields/residentInputFields";

import stylesForm from "@/styles/BasicForm.module.css";
import stylesTable from "@/styles/BasicTable.module.css";

const CondoUnitHolderDataForm = ({ onSubmit, prevData }) => {
    const initialFormData = {
        condoUnitNumber: "",
        condoUnitBlock: "",
        condoUnitStatus: "",
    };

    const [formData, setFormData] = useState({ ...prevData, ...initialFormData });
    const [residentData, setResidentData] = useState([]);
    const [selectedResidents, setSelectedResidents] = useState([]);
    const [titularResident, setTitularResident] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [showTable, setShowTable] = useState(false);
    const [isShowResidentList, setIsShowResidentList] = useState(false);

    const handleAddResidentToList = (resident) => {
        setSelectedResidents([...selectedResidents, resident]);
        if (!titularResident) {
            setTitularResident(resident);
        }

        setShowTable(false);
        setIsShowResidentList(true);

        setFormData((prevData) => ({
            ...prevData,
            residentCpfNumber: "",
        }));
    };

    const handleRemoveResidentFromList = (index) => {
        const updatedResidents = [...selectedResidents];
        const removedResident = updatedResidents.splice(index, 1)[0];

        if (removedResident === titularResident) {
            setTitularResident(null);
        }

        setSelectedResidents(updatedResidents);
    };

    const handleSetTitularResident = (resident) => {
        setTitularResident(resident);
    };

    useEffect(() => {
        prevData && setFormData(prevData);
    }, [prevData]);

    const handleChangesInputFields = async (e) => {
        const { name, value } = e.target;

        let maskedValue = applyCPFMask(value);

        setFormData((prevData) => ({
            ...prevData,
            [name]: maskedValue
        }));

        setErrorMessage({});
        setShowTable(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleFetchResidentData();
        };
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const residentsData = selectedResidents.map((resident) => ({
                residentId: resident._id,
                isTitular: resident === titularResident,
            }));

            onSubmit({ residents: residentsData, });

        } catch (error) {
            throw new Error({ message: defaultErrorMessage.internalServerError });
        };
    };

    const handleFetchResidentData = async () => {
        const { residentCpfNumber } = formData;

        const sanitizedResidentCpfNumber = removeNonNumericCharacters(residentCpfNumber);

        setIsUploading(true);

        const resident = await fetchResidentDataByCpf(
            sanitizedResidentCpfNumber,
            (error) => {
                setErrorMessage({
                    residentCpfNumber: error
                });
            });

        if (resident) {
            setResidentData([resident])
            setShowTable(true);
        } else {
            setShowTable(false);
        }


        setIsUploading(false);
    };

    const inputField = residentPersonalDataInputFields[2];

    return (
        <>
            <HeaderSection
                headerIcon={<HiBuildingOffice2 size={36} />}
                headerTitle={"Formulário de Cadastro de Unidade"}
            >
                <p> Preencha o campo do formulário abaixo com o CPF do Títular da Unidade </p>
            </HeaderSection>

            <section className="mainWrapper">
                <form onSubmit={handleFormSubmit} className={stylesForm.formContent} >
                    <h2 className={stylesForm.titleForm}>
                        Dados do Títular da Unidade
                        <span> Etapa: 1/2 </span>
                    </h2>

                    <section className={stylesForm.inputWithButton}>
                        <InputForm
                            inputLabelText={inputField.label}
                            inputType={inputField.type}
                            inputName={inputField.name}
                            inputValue={formData[inputField.name]}
                            inputPlaceholder={inputField.placeholder}
                            inputMaxLength={inputField.maxLength}
                            errorMessage={errorMessage[inputField.name]}
                            inputOnChange={handleChangesInputFields}
                            inputKeyDown={handleKeyDown}
                        >
                            <CustomButton
                                buttonType={"button"}
                                buttonStyle={"blue-button"}
                                buttonIcon={<HiMagnifyingGlass size={27} />}
                                buttonFunction={handleFetchResidentData}
                            />
                        </InputForm>
                    </section>

                    {isUploading && <SpinnerSyncLoader />}

                    {!errorMessage.residentCpfNumber && showTable && (
                        <section className={stylesForm.formSectionTable}>
                            <div className={stylesTable.tableWrapper}>
                                <table className={stylesTable.tableContainer}>
                                    <thead className={stylesTable.tableHeader}>
                                        <tr className={stylesTable.tableHeaderRow}>
                                            <th>Foto</th>
                                            <th>Nome do Morador</th>
                                            <th>Tipo</th>
                                            <th>Parentesco</th>
                                            <th></th>
                                        </tr>
                                    </thead>

                                    <tbody className={stylesTable.tableBody}>
                                        {residentData.map((resident) => (
                                            <tr
                                                className={stylesTable.tableBodyRow}
                                                key={resident?._id}
                                            >
                                                <td>
                                                    <img
                                                        alt="Foto do residente"
                                                        src={
                                                            resident?.residentImage
                                                            || "/images/perfil-img.png"
                                                        }
                                                    />
                                                </td>
                                                <td>{resident?.residentFullName}</td>
                                                <td>{resident?.typeOfResident}</td>
                                                <td>{resident?.kinshipResident}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleAddResidentToList(resident)}
                                                        className="bg-dark-blue hover:bg-light-blue text-white font-bold py-2 px-4 rounded"
                                                    >
                                                        Adicionar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}
                    {isShowResidentList && selectedResidents.length > 0 && (
                        <section>
                            <h2 className="flex items-center gap-5">
                                Lista de moradores
                                <span>{selectedResidents.length}</span>
                            </h2>
                            <div className={stylesTable.tableWrapper}>
                                <table className={stylesTable.tableContainer}>
                                    <thead className={stylesTable.tableHeader}>
                                        <tr className={stylesTable.tableHeaderRow}>
                                            <th>Títular</th>
                                            <th>Foto</th>
                                            <th>Nome do Morador</th>
                                            <th>Tipo</th>
                                            <th>Parentesco</th>
                                            <td></td>
                                        </tr>
                                    </thead>

                                    <tbody className={stylesTable.tableBody}>
                                        {selectedResidents.map((resident, index) => (
                                            <tr key={resident?._id} className={stylesTable.tableBodyRow}>
                                                <td>
                                                    <input
                                                        type="checkbox"
                                                        checked={resident === titularResident}
                                                        onChange={() => handleSetTitularResident(resident)}
                                                    />
                                                </td>
                                                <td>
                                                    <img
                                                        alt="Foto do residente"
                                                        src={
                                                            resident?.residentImage
                                                            || "/images/perfil-img.png"
                                                        }
                                                    />
                                                </td>
                                                <td>{resident?.residentFullName}</td>
                                                <td>{resident?.typeOfResident}</td>
                                                <td>{resident?.kinshipResident}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveResidentFromList(index)}
                                                        className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                                                    >
                                                        Remover
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <span>
                                <CustomButton
                                    buttonType={"submit"}
                                    buttonStyle={"black-button"}
                                    buttonText={"Próxima Etapa"}
                                />
                            </span>
                        </section>
                    )}
                </form>
            </section>
        </>
    );
};

export default CondoUnitHolderDataForm;
