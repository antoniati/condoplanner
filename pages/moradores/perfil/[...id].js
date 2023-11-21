// Importação de bibliotecas externas
import axios from "axios"; // Biblioteca para fazer requisições HTTP
import { useEffect, useState } from "react"; // Hooks do React para efeitos colaterais e gerenciamento de estado
import { useRouter } from "next/router"; // Hook do Next.js para obtenção do objeto de roteamento

// Importação de componentes personalizados
import Layout from "@/components/Layout"; // Layout principal da aplicação
import HeaderSection from "@/components/HeaderSection"; // Componente de cabeçalho personalizado
import CustomButton from "@/components/CustomButton"; // Botão personalizado

// Importação de utilitários
import formatDate from "@/utils/formatDate"; // Função para formatar data

// Importação de ícones da biblioteca "react-icons/hi2"
import { HiPencilSquare, HiTrash, HiUser } from "react-icons/hi2";

// Importação de estilos
import style from "@/styles/ResidentInfoCard.module.css";

/**
 * Página de perfil do morador.
 *
 * @returns {JSX.Element} Componente da página de perfil do morador.
 */
export default function PerfilPage() {
    const router = useRouter(); // Objeto de roteamento do Next.js
    const { id } = router.query; // Obtém o parâmetro de rota "id"

    const [residentData, setResidentData] = useState({}); // Estado para armazenar os dados do morador

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

    return (
        <Layout>
            <HeaderSection headerIcon={<HiUser size={36} />} headerTitle={"Perfil do Morador"}>
                {/* Botões de ação */}
                <span className="flex flex-col sm:flex-row gap-5 w-full">
                    <CustomButton
                        buttonType={"button"}
                        buttonIcon={<HiPencilSquare size={24} color="#FFF" />}
                        buttonText={"Editar Morador"}
                        buttonFunction={() => router.push(`/moradores/editar/${id}`)}
                        buttonStyle={"blue-button"}
                    />
                    <CustomButton
                        buttonType={"button"}
                        buttonIcon={<HiTrash size={24} color="#FFF" />}
                        buttonText={"Excluir"}
                        buttonFunction={() => router.push(`/moradores/deletar/${id}`)}
                        buttonStyle={"red-button"}
                    />
                </span>
            </HeaderSection>
            {/* Informações do morador */}
            <div className={style.infoCardWrapper}>
                {/* Seção de dados pessoais */}
                <section className={style.infoCard}>
                    <div className={style.titleInfoCard}>
                        <h2> Dados Pessoais </h2>
                        <p>
                            <b>Atualizado em:</b> {formatDate(residentData.updatedAt)}
                        </p>
                    </div>
                    <div className={style.infoCardContent}>
                        <ul className={style.infoCardList}>
                            {/* Seção de imagens e informações pessoais */}
                            <section>
                                <img
                                    src={residentData.residentImage || "/images/perfil-img.png"}
                                    alt="Imagem de Perfil do Morador"
                                    className="rounded-xl"
                                />
                                <div>
                                    {/* Lista de informações pessoais */}
                                    <li><b>Nome:</b> {residentData?.residentFullName}</li>
                                    <li><b>RG:</b> {residentData.residentRgNumber}</li>
                                    <li><b>CPF:</b> {residentData.residentCpfNumber}</li>
                                    <li><b>Data de Nasc:</b> {residentData.dateOfBirthOfResident}</li>
                                </div>
                                <div>
                                    {/* Mais informações pessoais */}
                                    <li><b>Parentesco:</b> {residentData.kinshipResident}</li>
                                    <li><b>Ocupação:</b> {residentData.residentOcupation}</li>
                                    <li><b>Email:</b> {residentData.residentEmail}</li>
                                    <li><b>Nº Contato:</b> {residentData.residentContactPhone}</li>
                                </div>
                                <div>
                                    {/* Informações adicionais */}
                                    <li><b>Tipo:</b> {residentData.typeOfResident}</li>
                                    <li><b>Número:</b> Default Value</li>
                                    <li><b>Bloco:</b> Default Value</li>
                                    <li><b>Status:</b> Default Value</li>
                                </div>
                            </section>
                        </ul>
                    </div>
                    <span>Arraste para o lado para mais informações</span>
                </section>

                {/* Seção de endereço */}
                <section className={style.infoCard}>
                    <h2 className={style.titleInfoCard}>Endereço</h2>
                    <div className={style.infoCardContent}>
                        <ul className={style.infoCardList}>
                            <div>
                                {/* Informações do endereço */}
                                <li><b>Endereço:</b> {residentData.residentStreet}</li>
                                <li><b>Complemento:</b> {residentData.streetComplement}</li>
                                <li><b>Bairro:</b> {residentData.residentNeighborhood}</li>
                            </div>
                            <div>
                                {/* Mais informações do endereço */}
                                <li><b>Cidade:</b> {residentData.residentCity}</li>
                                <li><b>Estado:</b> {residentData.residentState}</li>
                                <li><b>CEP:</b> {residentData.residentZipCode}</li>
                            </div>
                        </ul>
                    </div>
                    <span>Arraste para o lado para mais informações</span>
                </section>
            </div>
        </Layout>
    );
}
