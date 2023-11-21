// Biblioteca para fazer requisições HTTP
import axios from "axios";

// Hooks do React para efeitos colaterais e gerenciamento de estado
import { useEffect, useState } from "react";

// Hook do Next.js para obtenção do objeto de roteamento
import { useRouter } from "next/router";

import CustomButton from "@/components/CustomButton"; // Componente de botão personalizado
import Layout from "@/components/Layout"; // Componente de layout principal
import CustomModal from "@/components/CustomModal"; // Componente de modal personalizado

// Ícones da biblioteca "react-icons/hi2"
import { HiCheckBadge, HiOutlineExclamationTriangle } from "react-icons/hi2";

// Estilos específicos da página
import style from "@/styles/ResidentDeletePage.module.css";

// Página para deletar uma unidade do condomínio
const DeleteCondoUnitPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a abertura do modal
    const router = useRouter(); // Objeto de roteamento do Next.js
    const { id } = router.query; // Obtém o parâmetro de rota "id"

    const [condoUnitData, setCondoUnitData] = useState({}); // Estado para armazenar os dados da unidade

    // Função para buscar os dados da unidade
    const fetchCondoUnitData = async () => {
        try {
            const response = await axios.get(`/api/condoUnitDetails/${id}`);
            if (response.status === 200) {
                setCondoUnitData(response.data.data);
            } else {
                console.error("Erro ao buscar dados da unidade");
            }
        } catch (error) {
            console.error("Erro interno do servidor", error);
        }
    };

    // Efeito colateral para buscar dados da unidade quando o "id" muda
    useEffect(() => {
        if (id) {
            fetchCondoUnitData();
        }
    }, [id]);

    // Função para voltar à página de detalhes da unidade
    function handleGoBackPage() {
        router.push(`/unidades/detalhes/${id}`);
    }

    // Função para lidar com a exclusão da unidade
    async function handleDeleteCondoUnit() {
        try {
            // Faz uma requisição DELETE para o endpoint da API
            const response = await axios.delete(`/api/condoUnitDelete/${id}`);

            if (response.status === 200) {
                // Se a exclusão for bem-sucedida, abre o modal de confirmação
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
                    functionToCloseModal={() => router.push("/unidades")}
                />
            )}
        </Layout>
    );
};

export default DeleteCondoUnitPage;
