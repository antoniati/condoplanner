import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

import CustomButton from "@/components/CustomButton";
import Layout from "@/components/Layout";
import CustomModal from "@/components/CustomModal";

import { HiCheckBadge, HiOutlineExclamationTriangle } from "react-icons/hi2";

import style from "@/styles/ResidentDeletePage.module.css";

const DeleteResidentPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const { id } = router.query;


    function handleGoBackPage() {
        router.push(`/moradores/perfil/${id}`);
    }

    async function handleDeleteResident() {
        try {
            // Make a DELETE request to your API endpoint
            const response = await axios.delete(`/api/delete/resident/${id}`);

            if (response.status === 200) {
                setIsModalOpen(true);
            } else {
                console.error('Erro ao deletar o morador:', response.data.error);
            }
        } catch (error) {
            console.error('Erro ao deletar o morador:', error.message);
        }
    }

    return (
        <Layout>
            <section className={style.residentDeletePage}>
                <div className={style.residentDeletePageContent}>
                    <h1>
                        <HiOutlineExclamationTriangle size={36} />
                        <span>Atenção</span>
                    </h1>
                    <h2>
                        Você deseja Deletar o Morador?
                        <span>
                            <b>Default Value Of Database &nbsp;-&nbsp;</b>
                            <span>
                                <b>RG:&nbsp;</b>Default Value Of Database
                            </span>
                        </span>
                    </h2>
                    <p>
                        Todas as <b>Informações do Morador serão Excluídas</b> do banco de dados, incluindo os <b>registros de acessos</b>, <b>Veículos Cadastrados</b> e <b>Unidades Relacionadas</b>. Após a exclusão não será possível recuperar essas informações!
                    </p>
                    <div className={style.residentDeletePageButtons}>
                        <CustomButton
                            buttonType="submit"
                            buttonText={"Sim, Deletar"}
                            buttonStyle="red-button"
                            buttonFunction={handleDeleteResident}

                        />
                        <CustomButton
                            buttonType="button"
                            buttonText={"Cancelar"}
                            buttonStyle="black-button"
                            buttonFunction={handleGoBackPage}
                        />
                    </div>
                </div>
            </section>
            {/* modal de confirmação de exclusão */}
            {isModalOpen && (
                <CustomModal
                    modalIcon={<HiCheckBadge color="#23C366" size={56} />}
                    modalTitle="Excluido com Sucesso!"
                    modalDescription="O Morador foi excluido com sucesso."
                    functionToCloseModal={() => router.push("/moradores")}
                />
            )}
        </Layout>
    );
};

export default DeleteResidentPage;
