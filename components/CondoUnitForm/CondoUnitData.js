// Importa a biblioteca axios para realizar requisições HTTP
import axios from "axios";

/* Importação do hook `useState` do pacote "react"
para armazenar os dados da unidade inseridos no formulário.*/
import { useState } from "react";

// Importação dos componentes personalizados.
import HeaderSection from "@/components/HeaderSection"; // Cabeçalho da página
import CustomButton from "@/components/CustomButton";   // Botão personalizado
import InputForm from "@/components/InputForm";         // Componente de formulário de entrada
import SpinnerBouceLoader from "@/components/Loadings/SpinnerBouceLoader";

// Importação das opções dos campos entrada e opções para o status das unidades.
import { condoUnitInputFields, filterOptionsCondoUnits } from "@/utils/inputFields";
import { checkCondoUnitExisting } from "@/utils/checking/checkCondoUnitExisting"

// Importação de ícone de condomínio do pacote "react-icons/hi2".
import { HiBuildingOffice2 } from "react-icons/hi2";
// Importação de ícone de upload do pacote "react-icons/hi".
import { HiOutlineUpload } from "react-icons/hi";

// Importação do módulo de estilos.
import style from "@/styles/BasicForm.module.css";

/**
 * Componente funcional para o formulário de cadastro de dados da unidade.
 * Este componente exibe um formulário para inserir dados da unidade e 
 * fornece opções para salvar ou voltar.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {Function} props.onSubmit - Função chamada ao enviar o formulário.
 * @param {Function} props.onBack - Função chamada ao clicar no botão "Voltar".
 * @param {Object} props.prevData - Dados prévios para preenchimento do formulário.
 * @returns {JSX.Element} Componente do formulário de cadastro da unidade.
 */
const CondoUnitData = ({ onSubmit, onBack, prevData, }) => {

    const [condoUnitImages, setCondoUnitImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    // Estado inicial do formulário.
    const initialData = {
        condoUnitNumber: "",
        condoUnitBlock: "",
        condoUnitStatus: "",
    }

    // Estado para armazenar os dados do formulário.
    const [formData, setFormData] = useState({
        ...prevData,
        ...initialData,
    });

    // Estado para armazenar mensagens de erro.
    const [errorMessage, setErrorMessage] = useState("");

    // Função para lidar com as mudanças nos campos de entrada do formulário.
    const handleChangesInputFields = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        cleanErrorMessage(name);
    };

    // Função para limpar mensagens de erro de um campo específico.
    const cleanErrorMessage = (fieldName) => {
        setErrorMessage((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    // Função para validar campos de entrada obrigatórios
    const validateRequiredFields = () => {
        // Definição dos campos de entrada que são obrigatórios
        const requiredFields = [
            'condoUnitNumber',
            'condoUnitBlock',
            'condoUnitStatus',
        ];

        // Inicialização do valor dos campos de entrada como válidos (verdadeiros)
        let isValidField = true;

        // Verificação de campos vazios
        for (const field of requiredFields) {
            // Se os campos de entrada estiverem vazios
            if (!formData[field]) {
                // Atribuição de erro ao objeto de mensagens de erro,
                // mantendo as mensagens de erro anteriores se existirem
                setErrorMessage((prevErrors) => ({
                    ...prevErrors,
                    [field]: `Este campo é obrigatório.`,
                }));
                // Definição do valor dos campos de entrada como inválidos (falsos)
                isValidField = false;
            }
        }

        // Retorno do valor dos campos de entrada se forem válidos (verdadeiros)
        return isValidField;
    };

    // Função chamada ao enviar o formulário.
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Validação dos campos de entradas obrigatórios
        if (!validateRequiredFields()) {
            return;
        }

        // Verifica se a unidade já existe no banco de dados
        checkCondoUnitExisting(formData.condoUnitNumber, formData.condoUnitBlock, (errorMessage) => {
            if (errorMessage) {
                // Se existir, exibe a mensagem de erro
                setErrorMessage({ condoUnitNumber: errorMessage });
            } else {
                // Se não existir atribui os dados da unidade junto as imagens
                const finalData =  {...formData, condoUnitImages} 
                // Envia o formulário
                onSubmit(finalData);
            }
        });
    };

    // Mapeamento dos campos de entrada da unidade, excluindo o primeiro campo.
    const mappedCondoUnitInputFields = condoUnitInputFields && condoUnitInputFields.length > 1 ? condoUnitInputFields.slice(1) : [];


    const handleUploadCondoUnitImages = async (e) => {
        const files = e.target?.files;
        if (files.length > 0) {
            setIsUploading(true);
            const data = new FormData();
            for (const file of files) {
                data.append('file', file);
            }
            const res = await axios.post("/api/uploadImages", data)
            setCondoUnitImages(oldcondoUnitImages => {
                return [...oldcondoUnitImages, ...res.data.links];
            })
            setIsUploading(false);
        };
    }

    // Renderização do componente.
    return (
        <>
            {/* Seção de cabeçalho */}
            <HeaderSection
                headerIcon={<HiBuildingOffice2 size={36} />}
                headerTitle={"Formulário de Cadastro de Unidade"}
            >
                {/* Descrição da seção de cabeçalho */}
                <p>
                    Preencha os campos do formulário abaixo com os
                    dados da unidade para cadastrar.
                </p>
            </HeaderSection>
            {/* Seção principal do formulário */}
            <section className={style.formContainer}>
                {/* Formulário */}
                <form
                    className={style.formContent}
                    onSubmit={handleFormSubmit}
                >
                    {/* Título do formulário */}
                    <h2 className={style.titleForm}>
                        Dados da Unidade
                    </h2>
                    {/* Seção de campos de entrada */}
                    <section className={`${style.formSection} mt-2`}>
                        {/* Mapeamento dos campos de entrada da unidade */}
                        {mappedCondoUnitInputFields.map((field, index) => (
                            <InputForm
                                key={index}
                                inputLabelText={field.label}
                                inputType={field.type}
                                inputName={field.name}
                                inputValue={formData[field.name] || ""}
                                inputPlaceholder={field.placeholder}
                                inputOnChange={handleChangesInputFields}
                                errorMessage={errorMessage[field.name]}
                                inputMaxLength={field.maxLength}
                            />
                        ))}
                        {/* Seletor do Status da Unidade */}
                        <div className={style.formOption}>
                            <label> Status </label>
                            <select
                                name="condoUnitStatus"
                                value={formData.condoUnitStatus}
                                onChange={handleChangesInputFields}
                                className={errorMessage && "error-input" || ""}
                            >
                                <option value=""> Selecione um Status </option>
                                {/* Mapeamento das opções de filtro para o status da unidade */}
                                {filterOptionsCondoUnits.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            {/* Exibição de mensagem de erro para o status da unidade */}
                            {errorMessage.condoUnitStatus &&
                                <p className="error-message">
                                    {errorMessage.condoUnitStatus}
                                </p>
                            }
                        </div>
                    </section>
                    <section className="flex flex-col gap-1 mt-2">
                        <label htmlFor="">Imagens da Unidade </label>
                        {!condoUnitImages?.length && (
                            <span className="text-xs mb-2">
                                Clique no botão upload para adicionar fotos da unidade
                            </span>
                        )}
                        <div className="mb-2 flex items-center flex-wrap gap-2">
                            <label
                                className="w-24 h-24 border rounded-md cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-gray-500 bg-slate-50"
                            >
                                <HiOutlineUpload size={20} />
                                <div>
                                    Upload
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleUploadCondoUnitImages}
                                />
                            </label>
                            {!!condoUnitImages?.length && condoUnitImages.map(link => (
                                <div key={link} className="w-24 h-24">
                                    <img src={link} alt="Imagem da unidade" className="rounded-md w-24 h-24 object-cover" />
                                </div>
                            ))}
                            {isUploading && (
                                <div className="h-24 flex items-center">
                                    <SpinnerBouceLoader />
                                </div>
                            )}
                        </div>
                    </section>
                    {/* Botões do formulário */}
                    <div className={`${style.buttonsForm} mt-5`}>
                        {/* Botão para salvar o cadastro da unidade */}
                        <CustomButton
                            type={"submit"}
                            buttonStyle={"blue-button"}
                            buttonText={"Salvar Cadastro"}
                        />
                        {/* Botão para voltar à etapa anterior */}
                        <CustomButton
                            type={"button"}
                            buttonStyle={"black-button"}
                            buttonText={"Voltar"}
                            buttonFunction={onBack}
                        />
                    </div>
                </form>
            </section>
        </>
    );
};

// Exporta o componente principal da página.
export default CondoUnitData;
