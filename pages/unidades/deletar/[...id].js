import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiCheckBadge, HiOutlineExclamationTriangle } from "react-icons/hi2";

import CustomButton from "@/components/Buttons/CustomButton";
import Layout from "@/components/Layout";
import CustomModal from "@/components/CustomModal";

import { fetchCondoUnitDataById } from "@/utils/fetchData/fetchCondoUnitDataById";

import style from "@/styles/ResidentDeletePage.module.css";

const DeleteCondoUnitPage = () => {
    const [condoUnitData, setCondoUnitData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const handleFetchCondoUnitData = async () => {
            const condoUnit = await fetchCondoUnitDataById(id);
            setCondoUnitData(condoUnit);
        };

        if (id) {
            handleFetchCondoUnitData();
        }
    }, [id]);

    function handleGoBackPage() {
        router.push(`/unidades/detalhes/${id}`);
    }

    async function handleDeleteCondoUnit() {
        try {

            const response = await axios.delete(`/api/delete/deleteCondoUnit/${id}`);

            if (response.status === 200) {
                setIsModalOpen(true);

            } else {
                console.error('Erro ao deletar a unidade:', response.data.error);
            }
        } catch (error) {
            console.error('Erro ao deletar a unidade:', error.message);
        }
    }

    return (
        <Layout>
            {/* Seção de confirmação de exclusão */}
            <section className={style.residentDeletePage}>
                <div className={style.residentDeletePageContent}>
                    <h1>
                        <HiOutlineExclamationTriangle size={36} />
                        <span>Atenção</span>
                    </h1>
                    <h2>
                        Você deseja Deletar a unidade?
                        <span className="text-center flex items-center justify-center sm:justify-start">
                            <b>Número:&nbsp;</b>{condoUnitData.condoUnitNumber} &nbsp;-&nbsp;
                            <span>
                                <b>Bloco:&nbsp;</b>{condoUnitData.condoUnitBlock}
                            </span>
                        </span>
                    </h2>
                    <p>
                        Todas as <b>Informações da unidade serão Excluídas</b> do banco de dados, incluindo os <b>registros de acessos</b>, <b>Veículos Cadastrados</b>. Após a exclusão não será possível recuperar essas informações!
                    </p>
                    <div className={style.residentDeletePageButtons}>
                        {/* Botão para confirmar a exclusão */}
                        <CustomButton
                            buttonType="submit"
                            buttonText={"Sim, Deletar"}
                            buttonStyle="red-button"
                            buttonFunction={handleDeleteCondoUnit}
                        />
                        {/* Botão para cancelar a exclusão e voltar à página anterior */}
                        <CustomButton
                            buttonType="button"
                            buttonText={"Cancelar"}
                            buttonStyle="black-button"
                            buttonFunction={handleGoBackPage}
                        />
                    </div>
                </div>
            </section>
            {/* Modal de confirmação de exclusão */}
            {isModalOpen && (
                <CustomModal
                    modalIcon={<HiCheckBadge color="#23C366" size={56} />}
                    modalTitle="Excluído com Sucesso!"
                    modalDescription="A unidade foi excluída com sucesso."
                    functionToCloseModal={() => router.push("/unidades/listadeunidades")}
                />
            )}
        </Layout>
    );
};

export default DeleteCondoUnitPage;
