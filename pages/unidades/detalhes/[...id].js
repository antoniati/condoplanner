// Importação de bibliotecas externas
import axios from "axios"; // Biblioteca para fazer requisições HTTP
import { useRouter } from "next/router"; // Hook do Next.js para obtenção do objeto de roteamento
import { useEffect, useState } from "react"; // Hooks do React para efeitos colaterais e gerenciamento de estado

// Importação de componentes personalizados
import Layout from "@/components/Layout"; // Layout principal da aplicação
import HeaderSection from "@/components/HeaderSection"; // Componente de cabeçalho personalizado
import CustomButton from "@/components/CustomButton"; // Componente de botão personalizado

// Função utilitária para formatar datas
import formatDate from "@/utils/formatDate";

// Importação de ícones da biblioteca "react-icons/hi2"
import { HiEye, HiPencilSquare, HiTrash, HiUser } from "react-icons/hi2";

// Importação de estilos
import style from "@/styles/ResidentInfoCard.module.css"; // Estilos específicos para o componente ResidentInfoCard
import styles from "@/styles/BasicTable.module.css"; // Estilos básicos para tabelas

/**
 * Página de perfil de unidade de condomínio.
 *
 * @returns {JSX.Element} Componente da página de perfil de unidade de condomínio.
 */
export default function CondoUnitDetailsPage() {
    const router = useRouter(); // Objeto de roteamento do Next.js
    const { id } = router.query; // Obtém o parâmetro de rota "id"

    const [condoUnitData, setcondoUnitData] = useState({}); // Estado para armazenar os dados da unidade

    // Função para buscar os dados da unidade
    const fetchcondoUnitData = async () => {
        try {
            const response = await axios.get(`/api/condoUnitDetails/${id}`);
            if (response.status === 200) {
                setcondoUnitData(response.data.data);
            } else {
                console.error("Erro ao buscar dados da unidade");
            }
        } catch (error) {
            console.error("Erro interno do servidor", error);
        }
    };

    // Efeito colateral para buscar dados da unidade pelo ID quando o componente montar
    useEffect(() => {
        if (id) {
            fetchcondoUnitData();
        }
    }, [id]);

    return (
        <Layout>
            <HeaderSection headerIcon={<HiUser size={36} />} headerTitle={"Detalhes da Unidade"}>
                {/* Botões de ação para editar e excluir a unidade */}
                <span className="flex flex-col sm:flex-row gap-5 w-full">
                    <CustomButton
                        buttonType={"button"}
                        buttonIcon={<HiPencilSquare size={24} color="#FFF" />}
                        buttonText={"Editar Unidade"}
                        buttonFunction={() => router.push(`/unidades/editar/${id}`)}
                        buttonStyle={"blue-button"}
                    />
                    <CustomButton
                        buttonType={"button"}
                        buttonIcon={<HiTrash size={24} color="#FFF" />}
                        buttonText={"Excluir"}
                        buttonFunction={() => router.push(`/unidades/deletar/${id}`)}
                        buttonStyle={"red-button"}
                    />
                </span>
            </HeaderSection>

            {/* Seção de informações da unidade */}
            <div className={style.infoCardWrapper}>
                <section className={style.infoCard}>
                    <div className={style.titleInfoCard}>
                        <h2>Dados da Unidade</h2>
                        <p>
                            <b>Atualizado em:</b> {formatDate(condoUnitData.updatedAt)}
                        </p>
                    </div>

                    {/* Tabela de informações da unidade */}
                    <div className={styles.tableWrapper}>
                        <table className={styles.tableContainer}>
                            <thead className={styles.tableHeader}>
                                <tr className={styles.tableHeaderRow}>
                                    <th>Número da Unidade</th>
                                    <th>Bloco</th>
                                    <th>Status</th>
                                    <th>Moradores</th>
                                </tr>
                            </thead>
                            <tbody className={styles.tableBody}>
                                <tr className={styles.tableBodyRow}>
                                    <td>{condoUnitData.condoUnitNumber}</td>
                                    <td>{condoUnitData.condoUnitBlock}</td>
                                    <td>{condoUnitData.condoUnitStatus}</td>
                                    <td>{condoUnitData.residentHolderId ? 1 : 0}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Seção de fotos da unidade */}
                    <div className="border-4 border-slate-300 mx-5">
                        <p className="text-lg py-2 px-5 font-semibold bg-slate-200 w-auto border-b-2 border-slate-300">
                            Fotos
                        </p>
                        <div className="w-full flex gap-2 p-2 mt-2">
                            {condoUnitData.condoUnitImages?.map((imageURL, index) => (
                                <img key={index} src={imageURL} alt={`Foto da Unidade ${index + 1}`} className="rounded-md object-cover w-20 h-20" />
                            ))}
                        </div>
                    </div>

                    <span className="text-xs sm:hidden">Arraste para o lado para mais informações</span>
                </section>

                {/* Seção de lista de moradores */}
                <section className={style.infoCard}>
                    <h2 className={style.titleInfoCard}>Lista de Moradores</h2>

                    {/* Tabela de moradores */}
                    <div className={styles.tableWrapper}>
                        <table className={styles.tableContainer}>
                            <thead className={styles.tableHeader}>
                                <tr className={styles.tableHeaderRow}>
                                    <th>Foto</th>
                                    <th>Nome do Titular</th>
                                    <th>Tipo</th>
                                    <th>Parentesco</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className={styles.tableBody}>
                                <tr className={styles.tableBodyRow}>
                                    <td>
                                        <img
                                            src={condoUnitData.residentHolderId?.residentImage || "/images/perfil-img.png"}
                                            alt="Imagem de perfil"
                                        />
                                    </td>
                                    <td>{condoUnitData.residentHolderId ? condoUnitData.residentHolderId.residentFullName : "N/A"}</td>
                                    <td>{condoUnitData.residentHolderId ? condoUnitData.residentHolderId.typeOfResident : "N/A"}</td>
                                    <td>{condoUnitData.residentHolderId ? condoUnitData.residentHolderId.kinshipResident : "N/A"}</td>
                                    <td>
                                        {/* Botão para ver o perfil do morador */}
                                        <button
                                            onClick={() => router.push(`/moradores/perfil/${condoUnitData.residentHolderId?._id}`)}
                                            className="w-full flex items-center justify-center gap-2 p-4 bg-black text-white rounded-md font-semibold border-2 border-black hover:border-light-blue shadow-md"
                                        >
                                            <HiEye size={24} />
                                            Ver Perfil
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <span>Arraste para o lado para mais informações</span>
                </section>
            </div>
        </Layout>
    );
}
