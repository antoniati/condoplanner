// Importação de bibliotecas externas
import axios from "axios"; // Biblioteca para fazer requisições HTTP
import { useEffect, useState } from "react"; // Hooks do React para efeitos colaterais e gerenciamento de estado
import { useRouter } from "next/router"; // Hook do Next.js para obtenção do objeto de roteamento

// Importação de componentes personalizados
import CustomButton from "@/components/CustomButton"; // Botão personalizado
import Layout from "@/components/Layout"; // Layout principal da aplicação
import CustomModal from "@/components/CustomModal"; // Modal personalizado

// Importação de ícones da biblioteca "react-icons/hi"
import { HiCheckBadge, HiOutlineExclamationTriangle } from "react-icons/hi2";

// Importação do módulo de estilos da página
import style from "@/styles/ResidentDeletePage.module.css";

/**
 * Página de exclusão de morador.
 *
 * @returns {JSX.Element} Componente da página de exclusão de morador.
 */
const DeleteResidentPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar a abertura do modal
    const router = useRouter(); // Objeto de roteamento do Next.js
    const { id } = router.query; // Obtém o parâmetro de rota "id"

    const [residentData, setResidentData] = useState({}); // Estado para armazenar dados do morador

    // Função para buscar os dados do morador
    const fetchResidentData = async () => {
        try {
            const response = await axios.get(`/api/residentPerfil/${id}`);
            if (response.status === 200) {
                setResidentData(response.data.data);
            } else {
                console.error("Erro ao buscar dados do morador");
            }
        } catch (error) {
            console.error("Erro interno do servidor", error);
        }
    };

    // Efeito colateral para buscar dados do morador quando o "id" muda
    useEffect(() => {
        if (id) {
            fetchResidentData();
        }
    }, [id]);

    // Função para navegar de volta à página de perfil do morador
    function handleGoBackPage() {
        router.push(`/moradores/perfil/${id}`);
    }

    // Função para lidar com a exclusão do morador
    async function handleDeleteResident() {
        try {
            // Faz uma requisição DELETE para o endpoint da API
            const response = await axios.delete(`/api/delete/resident/${id}`);

            if (response.status === 200) {
                setIsModalOpen(true); // Abre o modal de confirmação
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
                        <span className="text-center flex items-center justify-center sm:justify-start">
                            <b>{residentData.residentFullName} &nbsp;-&nbsp;</b>
                            <span>
                                <b>RG:&nbsp;</b>{residentData.residentRgNumber}
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
            {/* Modal de confirmação de exclusão */}
            {isModalOpen && (
                <CustomModal
                    modalIcon={<HiCheckBadge color="#23C366" size={56} />}
                    modalTitle="Excluído com Sucesso!"
                    modalDescription="O Morador foi excluído com sucesso."
                    functionToCloseModal={() => router.push("/unidades")}
                />
            )}
        </Layout>
    );
};

export default DeleteResidentPage;
