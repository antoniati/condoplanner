import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiCheckBadge, HiOutlineExclamationTriangle } from "react-icons/hi2";

import CustomButton from "@/components/Buttons/CustomButton";
import Layout from "@/components/Layout";
import CustomModal from "@/components/CustomModal";

import { fetchResidentDataById } from "@/utils/fetchData/fetchResidentById";

import style from "@/styles/ResidentDeletePage.module.css";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";

export default function DeleteResidentPage() {
    const [residentData, setResidentData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const handleFetchResidentData = async () => {
            const residentData = await fetchResidentDataById(id);
            setResidentData(residentData);
        };

        if (id) {
            handleFetchResidentData();
        }
    }, [id]);

    const handleGoBackPage = () => router.push(
        `/moradores/perfil/${id}`
    );

    async function handleDeleteResident() {
        try {

            const response = await axios.delete(
                `/api/delete/deleteResident/${id}`
            );

            if (response.status === 200) {
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error(
                `${defaultErrorMessage.internalServerError}`,
                error.message
            );
        }
    }

    return (
        <Layout>
            <section className={"mainWrapper"}>
                <div className={style.residentDeletePageContent}>
                    <h1>
                        <HiOutlineExclamationTriangle size={36} />
                        <span>Atenção</span>
                    </h1>
                    <h2>
                        Você deseja Deletar o Morador?
                        <span>
                            <b>
                                {residentData.residentFullName}
                                &nbsp;-&nbsp;
                            </b>
                            <span>
                                <b>RG:&nbsp;</b>
                                {residentData.residentRgNumber}
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

            {isModalOpen && (
                <CustomModal
                    modalTitle="Excluído com Sucesso!"
                    modalDescription="O Morador foi excluído com sucesso."
                    functionToCloseModal={() =>
                        router.push("/moradores/listademoradores")
                    }
                    modalIcon={
                        <HiCheckBadge
                            color="#23C366"
                            size={56}
                        />
                    }
                />
            )}
        </Layout>
    );
};
