import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import HeaderSection from "@/components/HeaderSection";
import CustomButton from "@/components/CustomButton";
import { HiPencilSquare, HiTrash, HiUser } from "react-icons/hi2";
import style from "@/styles/ResidentInfoCard.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import formatDate from "@/utils/formatDate";

export default function PerfilPage() {
    const router = useRouter();
    const { id } = router.query;

    const [residentData, setResidentData] = useState({});

    // Função para buscar os dados do morador
    const fetchResidentData = async () => {
        try {
            const response = await axios.get(`/api/residents/${id}`);
            if (response.status === 200) {
                setResidentData(response.data.data);
            } else {
                console.error("Erro ao buscar dados do morador");
            }
        } catch (error) {
            new Error("Erro interno do servidor", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchResidentData();
        }
    }, [id]);

    return (
        <Layout>
            <HeaderSection headerIcon={<HiUser size={36} />} headerTitle={"Perfil do Morador"}>
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
            <div className={style.infoCardWrapper}>
                <section className={style.infoCard}>
                    <div className={style.titleInfoCard}>
                        <h2> Dados Pessoais </h2>
                        <p>
                            <b>Atualizado em:</b>
                            {formatDate(residentData.updatedAt)}
                        </p>
                    </div>
                    <div className={style.infoCardContent}>
                        <ul className={style.infoCardList}>
                            <section>
                                <img
                                    src={"/images/perfil-img.png"}
                                    alt="Imagem de Perfil do Morador"
                                />
                                <div>
                                    <li>
                                        <b>Nome:</b> {residentData?.residentFullName}
                                    </li>
                                    <li>
                                        <b>RG:</b> {residentData.residentRgNumber}
                                    </li>
                                    <li>
                                        <b>CPF:</b> {residentData.residentCpfNumber}
                                    </li>
                                    <li>
                                        <b>Data de Nasc:</b> {residentData.dateOfBirthOfResident}
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <b>Parentesco:</b> {residentData.kinshipResident}
                                    </li>
                                    <li>
                                        <b>Ocupação:</b> {residentData.residentOcupation}
                                    </li>
                                    <li>
                                        <b>Email:</b> {residentData.residentEmail}
                                    </li>
                                    <li>
                                        <b>Nº Contato:</b> {residentData.residentContactPhone}
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <b>Tipo:</b> {residentData.typeOfResident}
                                    </li>
                                    <li>
                                        <b>Número:</b> Default Value
                                    </li>
                                    <li>
                                        <b>Bloco:</b> Default Value
                                    </li>
                                    <li>
                                        <b>Status:</b> Default Value
                                    </li>
                                </div>
                            </section>
                        </ul>
                    </div>
                    <span>Arraste para o lado para mais informações</span>
                </section>

                <section className={style.infoCard}>
                    <h2 className={style.titleInfoCard}>Endereço</h2>
                    <div className={style.infoCardContent}>
                        <ul className={style.infoCardList}>
                            <div>

                                <li><b>Endereço:</b> {residentData.residentStreet}</li>
                                <li><b>Complemento:</b> {residentData.streetComplement}</li>
                                <li><b>Bairro:</b> {residentData.residentNeighborhood}</li>
                            </div>
                            <div>
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
