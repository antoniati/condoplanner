// Biblioteca para fazer requisições HTTP
import axios from "axios";

// Hook do Next.js para obtenção do objeto de roteamento
import { useRouter } from "next/router";

// Hooks do React para efeitos colaterais e gerenciamento de estado
import { useEffect, useState } from "react";

import Layout from "@/components/Layout"; // Layout principal da aplicação
import HeaderSection from "@/components/HeaderSection"; // Componente de cabeçalho personalizado
import InputForm from "@/components/InputForm"; // Componente de formulário de entrada personalizado
import CustomButton from "@/components/CustomButton"; // Componente de botão personalizado

// Campos de entrada e opções de filtro para unidades de condomínio
import { condoUnitInputFields, filterOptionsCondoUnits } from "@/utils/inputFields";

// Ícone de edifício de escritórios da biblioteca "react-icons/hi"
import { HiBuildingOffice2 } from "react-icons/hi2";

// Módulo de estilos para o formulário básico
import style from "@/styles/BasicForm.module.css";

/**
 * Página de edição de unidade de condomínio.
 *
 * @returns {JSX.Element} Componente da página de edição de unidade de condomínio.
 */
const EditCondoUnitPage = () => {
    const [formData, setFormData] = useState({}); // Estado para armazenar os dados do formulário
    const [errorMessage, setErrorMessage] = useState({}); // Estado para armazenar mensagens de erro
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a abertura do modal

    const router = useRouter(); // Objeto de roteamento do Next.js
    const { id } = router.query; // Obtém o parâmetro de rota "id"

    // Efeito colateral para buscar dados da unidade pelo ID quando o componente montar
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const response = await axios.get(`/api/condoUnitDetails/${id}`);
                    const condoUnitData = response.data.data;

                    setFormData(condoUnitData);
                }
            } catch (error) {
                console.error('Erro ao buscar dados da unidade:', error);
            }
        };

        fetchData();
    }, [id]);

    // Função para lidar com as mudanças nos campos de entrada
    const handleChangesInputFields = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        cleanErrorMessage(name);
    };

    // Função para limpar mensagens de erro
    const cleanErrorMessage = (fieldName) => {
        setErrorMessage((prevErrors) => ({
            ...prevErrors,
            [fieldName]: "",
        }));
    };

    // Função para lidar com a atualização da unidade
    const handleUpdateResident = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/update/condoUnit/${id}`, formData);

            if (response.data.success) {
                setIsModalOpen(true);
            } else {
                console.error('Erro ao atualizar unidade:', response.data.error);
            }
        } catch (error) {
            console.error('Erro ao enviar requisição de atualização:', error);
        }
    };

    // Função para navegar de volta à página de detalhes da unidade
    const handleGoBackPage = () => {
        router.push(`/unidades/detalhes/${id}`);
    };

    return (
        <Layout>
            <HeaderSection
                headerIcon={<HiBuildingOffice2 size={36} />}
                headerTitle={"Formulário de Edição de Unidade"}
            >
                <p>
                    Preencha os campos do formulário abaixo para
                    editar as informações da unidade.
                </p>
            </HeaderSection>
            <section className={style.formContainer}>
                <form className={style.formContent} onSubmit={handleUpdateResident}>
                    <h2 className={style.titleForm}>
                        Dados da Unidade
                    </h2>
                    <div className="flex gap-5 py-5 flex-wrap">
                        {condoUnitInputFields.map((field, index) => (
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
                    </div>
                    <div className={style.formOption}>
                        <label>Status</label>
                        <select
                            value={formData.condoUnitStatus}
                            onChange={handleChangesInputFields}
                            className={errorMessage && "error-input" || ""}
                        >
                            <option value="">Selecione um Status</option>
                            {filterOptionsCondoUnits.map((option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    <section className={`${style.buttonsForm} mt-5`}>
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
        </Layout>
    );
};

export default EditCondoUnitPage;
