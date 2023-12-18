import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiCheckBadge, HiOutlineExclamationTriangle } from "react-icons/hi2";

import CustomButton from "@/components/Buttons/CustomButton";
import Layout from "@/components/Layout";
import CustomModal from "@/components/CustomModal";

import { fetchAccessLogDataById } from "@/utils/fetchData/fetchAccessLogDataById";

import style from "@/styles/ResidentDeletePage.module.css";

const DeleteAccessLogPage = () => {
      const [accessLogData, setAccessLogData] = useState({});
      const [isModalOpen, setIsModalOpen] = useState(false);

      const router = useRouter();
      const { id } = router.query;

      useEffect(() => {
            const handleFetchAccessLogData = async () => {
                  const AccessLog = await fetchAccessLogDataById(id);
                  setAccessLogData(AccessLog);
            };

            if (id) {
                  handleFetchAccessLogData();
            }
      }, [id]);

      function handleGoBackPage() {
            router.push(`/unidades/detalhes/${id}`);
      }

      async function handleDeleteAccessLog() {
            try {
                  const response = await axios.delete(`/api/delete/deleteAccessLog/${id}`);

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
                  <section className={style.residentDeletePage}>
                        <div className={style.residentDeletePageContent}>
                              <h1>
                                    <HiOutlineExclamationTriangle size={36} />
                                    <span>Atenção</span>
                              </h1>
                              <h2>
                                    Você deseja Deletar o a Acesso à Unidade?
                                    <span className="text-center flex items-center justify-center sm:justify-start">
                                          <b>Número:&nbsp;</b>
                                          {accessLogData.condoUnitData?.condoUnitNumber} &nbsp;-&nbsp;
                                          <span>
                                                <b>Bloco:&nbsp;</b>
                                                {accessLogData.condoUnitData?.condoUnitBlock}
                                          </span>
                                    </span>
                              </h2>
                              <p>
                                    Todas as <b>informações do acesso serão excluídas</b> do banco de dados, incluindo os <b>residentes do acessos</b>, <b>veículos cadastrados</b>. Após a exclusão não será possível recuperar essas informações!
                              </p>
                              <div className={style.residentDeletePageButtons}>
                                    <CustomButton
                                          buttonType="submit"
                                          buttonText={"Sim, Deletar"}
                                          buttonStyle="red-button"
                                          buttonFunction={handleDeleteAccessLog}
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
                              modalIcon={<HiCheckBadge color="#23C366" size={56} />}
                              modalTitle="Excluído com Sucesso!"
                              modalDescription="O Acesso foi excluído com sucesso."
                              functionToCloseModal={() => router.push("/acessos/listadeacessos")}
                        />
                  )}
            </Layout>
      );
};

export default DeleteAccessLogPage;
