// Importação do pacote "axios" para realizar requisições HTTP.
import axios from "axios";

/* Importação dos hooks `useEffect` e `useState` do pacote "react"
para armazenar os dados do residente titular responsável pela unidade .*/
import { useEffect, useState } from "react";

// Importação dos componentes personalizados
import HeaderSection from "@/components/HeaderSection"; // Cabeçalho da página
import InputForm from "@/components/InputForm"; // Input padrão dos formulários
import CustomButton from "@/components/CustomButton";   // Botão personalizado

// Importação dos utilitários
import { condoUnitInputFields } from "@/utils/inputFields"; // Objeto com os atributos dos campos de entrada das unidades
import { applyCPFMask } from "@/utils/inputFieldsMask"; // Função para aplicar máscara ao campo de entrada de CPF.
import sanitizedAndParInt from "@/utils/sanitizedAndParInt"; // Função para formatar os dados do CPF.
import { checkCondoUnitExisting } from "@/utils/checking/checkCondoUnitExisting"; // Função para verificar os dados da unidade

// Importação de ícone de condomínio do pacote "react-icons/hi2".
import { HiBuildingOffice2, HiMagnifyingGlass } from "react-icons/hi2";

// Importação de módulos de estilos.
import style from "@/styles/BasicForm.module.css";
import styles from "@/styles/BasicTable.module.css";

/**
 * Componente funcional para o formulário de cadastro de dados do titular da unidade.
 * Este componente exibe um formulário para inserir o CPF do titular da unidade,
 * permite pesquisar e adicionar o residente como titular responsável da unidade que será cadastrada.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {Function} props.onSubmit - Função chamada ao enviar o formulário.
 * @param {Object} props.prevData - Dados prévios para preenchimento do formulário.
 * @returns {JSX.Element} Componente do formulário de cadastro do titular da unidade.
 */
const CondoUnitHolderData = ({ onSubmit, prevData }) => {
    // Estado inicial do formulário
    const initialData = { residentCpfNumber: "", }

    // Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({ ...prevData, ...initialData });

    // Estado para armazenar mensagens de erro
    const [errorMessages, setErrorMessages] = useState({});

    // Estado para armazenar os dados do residente titular
    const [residentData, setResidentData] = useState([])


    // Função para buscar os dados do residente titular
    const fetchResidentData = async () => {
        // Validação dos campos de entradas obrigatórios
        if (!validateRequiredFields()) {
            return;
        }

        try {
            // Obtenção do CPF do residente após aplicar a máscara
            const sanitizedResidentCpfNumber = sanitizedAndParInt(formData.residentCpfNumber);

            // Validação do CPF do residente
            if (!sanitizedResidentCpfNumber || isNaN(sanitizedResidentCpfNumber)) {
                setErrorMessages("CPF do residente inválido");
                return;
            }

            // Verifica se o CPF tem exatamente 14 caracteres
            if (formData.residentCpfNumber.length !== 14) {
                setErrorMessages({ residentCpfNumber: "CPF inválido. Insira todos os dígitos" });
                return;
            }

            // Busca os dados do residente
            const residentResponse = await axios.get(`/api/residents/${sanitizedResidentCpfNumber}`);
            const resident = residentResponse.data.data;

            // Atualiza o estado com os dados do residente encontrado
            setResidentData([resident]);

        } catch (error) {
            // Caso de erro em que os dados não foram encontrados
            if (error.response && error.response.status === 404) {
                setErrorMessages({ residentCpfNumber: "Este CPF não esta cadastrado" });
            } else {
                console.error("Erro na solicitação:", error.message);
            }
        }
    };

    // Efeito para atualizar os dados do formulário com os dados prévios
    useEffect(() => {
        // Atualiza os dados do formulário apenas se houver dados prévios
        prevData && setFormData(prevData);
    }, [prevData]);

    // Função para lidar com as mudanças nos campos de entrada
    const handleChangesInputFields = async (e) => {
        // Obtém o nome e valor do campo de entrada
        const { name, value } = e.target;

        // Aplica a máscara de CPF ao valor do campo
        let maskedValue = applyCPFMask(value);

        // Atualiza os dados do formulário, mantendo outros dados inalterados
        setFormData({ ...initialData, [name]: maskedValue });

        // Limpa a mensagem de erro para o campo específico
        cleanErrorMessage(name);
    };

    // Função para lidar com as teclas pressionadas no campo de entrada
    const handleKeyDown = (e) => {
        // Se a tecla pressionada for "Enter"
        if (e.key === 'Enter') {
            // Impede o comportamento padrão do formulário
            e.preventDefault();
            // Aciona a função de pesquisa
            fetchResidentData();
        }
    };

    // Função para limpar mensagens de erro
    const cleanErrorMessage = (fieldName) => {
        setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    // Função para validar campos de entrada obrigatórios
    const validateRequiredFields = () => {
        // Definição dos campos de entrada que são obrigatórios
        const requiredFields = [
            'residentCpfNumber',
        ];

        // Inicialização do valor dos campos de entrada como válidos (verdadeiros)
        let isValidField = true;

        // Verificação de campos vazios
        for (const field of requiredFields) {
            // Se os campos de entrada estiverem vazios
            if (!formData[field]) {
                // Atribuição de erro ao objeto de mensagens de erro,
                // mantendo as mensagens de erro anteriores se existirem
                setErrorMessages((prevErrors) => ({
                    ...prevErrors,
                    [field]: `O CPF é obrigatório.`,
                }));
                // Definição do valor dos campos de entrada como inválidos (falsos)
                isValidField = false;
            }
        }

        // Retorno do valor dos campos de entrada se forem válidos (verdadeiros)
        return isValidField;
    };

    // Função para lidar com o envio do formulário
    const handleFormSubmit = async (e) => {
        // Prevenção do comportamento padrão de envio de formulários
        e.preventDefault();

        // Validação dos campos de entradas obrigatórios
        if (!validateRequiredFields()) {
            return;
        }

        // Verifica se o CPF tem exatamente 14 caracteres
        if (formData.residentCpfNumber.length !== 14) {
            setErrorMessages({ residentCpfNumber: "CPF inválido. Insira todos os dígitos" });
            return;
        }

        // Envio do formulário
        onSubmit(formData);
    };

    // Definição do primeiro campo de entrada do formulário
    const condoUnitInputHolder = condoUnitInputFields[0];

    // Renderização do componente
    return (
        <>
            {/* Seção de cabeçalho */}
            <HeaderSection
                headerIcon={<HiBuildingOffice2 size={36} />}
                headerTitle={"Formulário de Cadastro de Unidade"}
            >
                {/* Descrição da seção de cabeçalho */}
                <p>
                    Preencha o campo do formulário abaixo com o
                    CPF do Títular da Unidade
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
                        Dados do Títular da Unidade
                    </h2>
                    {/* Seção de entrada e botão de pesquisa */}
                    <section className="flex mt-5 p-2">
                        {/* Campo de entrada */}
                        <InputForm
                            inputLabelText={condoUnitInputHolder.label}
                            inputType={condoUnitInputHolder.type}
                            inputName={condoUnitInputHolder.name}
                            inputValue={formData[condoUnitInputHolder.name]}
                            inputPlaceholder={condoUnitInputHolder.placeholder}
                            inputOnChange={handleChangesInputFields}
                            errorMessage={errorMessages[condoUnitInputHolder.name]}
                            inputMaxLength={condoUnitInputHolder.maxLength}
                            inputKeyDown={handleKeyDown}
                        />
                        {/* Botão de pesquisa */}
                        <span className="h-16 mt-8">
                            <CustomButton
                                buttonType={"button"}
                                buttonStyle={"blue-button"}
                                buttonFunction={fetchResidentData}
                                buttonIcon={<HiMagnifyingGlass size={27} />}
                            />
                        </span>
                    </section>

                    {/* Exibição dos dados do residente titular */}
                    {residentData.length > 0 && (
                        <section className="overflow-auto">
                            <div className={styles.tableContainer}>
                                {/* Tabela de residentes */}
                                <table className={styles.tableContent}>
                                    {/* Cabeçalho da tabela */}
                                    <thead className={styles.tableHeader}>
                                        {/* Linha de cabeçalho da tabela */}
                                        <tr className={styles.tableHeaderRow}>
                                            <th>Foto</th>
                                            <th>Nome do residente</th>
                                            <th>Tipo</th>
                                            <th>E-mail</th>
                                            <th>Contato</th>
                                        </tr>
                                    </thead>
                                    {/* Corpo da tabela */}
                                    <tbody className={styles.tableBody}>
                                        {/* Linha do corpo da tabela */}
                                        {residentData.map((resident) => (
                                            <tr key={resident._id} className={styles.tableBodyRow}>
                                                <td>
                                                    {/* Coluna com a foto de perfil do residente */}
                                                    <img
                                                        src={resident.residentImage || "/images/perfil-img.png"}
                                                        alt="Imagem de Perfil do residente"
                                                    />
                                                </td>
                                                <td>{resident.residentFullName}</td>
                                                <td>{resident.typeOfResident}</td>
                                                <td>{resident.residentEmail || "N/A"}</td>
                                                <td>{resident.residentContactPhone || "N/A"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className={style.buttonsForm}>
                                {/* Botão de submissão que avança para a próxima etapa 
                                com os dados de CPF do residente titular*/}
                                <CustomButton
                                    buttonType={"submit"}
                                    buttonStyle={"black-button"}
                                    buttonText={"Próxima Etapa"}
                                />
                            </div>
                        </section>
                    )}
                </form>
            </section>
        </>
    );
};

// Exporta o componente principal da página.
export default CondoUnitHolderData;
