import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import HeaderSection from "@/components/HeaderSection";
import CustomButton from "@/components/CustomButton";

import { HiPencilSquare, HiTrash, HiUser } from "react-icons/hi2";
import { apartmentsTestData, residentTestData } from "@/utils/testsData";

import style from "@/styles/ResidentInfoCard.module.css";

export default function PerfilPage() {
    const router = useRouter();

    return (
        <Layout>
            <HeaderSection
                headerIcon={<HiUser size={36} />}
                headerTitle={"Perfil do Morador"}
            >
                <span className="flex flex-col sm:flex-row gap-5 w-full">
                    <CustomButton
                        buttonType={"button"}
                        buttonIcon={<HiPencilSquare size={24} color="#FFF" />}
                        buttonText={"Editar Morador"}
                        buttonFunction={() => router.push("/moradores/editar")}
                        buttonStyle={"blue-button"}
                    />
                    <CustomButton
                        buttonType={"button"}
                        buttonIcon={<HiTrash size={24} color="#FFF" />}
                        buttonText={"Excluir"}
                        buttonFunction={() => router.push("/moradores/deletar")}
                        buttonStyle={"red-button"}
                    />
                </span>
            </HeaderSection>
            <div className={style.infoCardWrapper}>
                <section className={style.infoCard}>
                    <div className={style.titleInfoCard}>
                        <h2> Dados Pessoais </h2>
                        <p>
                            <b>Atualizado

                                em
                                :</b>
                            00/00/0000 às 00:00am
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
                                        <b>Nome</b>
                                        {residentTestData.residentFullName}
                                    </li>
                                    <li>
                                        <b>RG</b>
                                        {residentTestData.residentRgNumber}
                                    </li>
                                    <li>
                                        <b>CPF</b>
                                        {residentTestData.residentCpfNumber}
                                    </li>
                                    <li>
                                        <b>Data de Nasc.</b>
                                        {residentTestData.dateOfBirthOfResident}
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <b>Parentesco</b>
                                        {residentTestData.kinshipResident}
                                    </li>
                                    <li>
                                        <b>Ocupação</b>
                                        {residentTestData.residentOcupation}
                                    </li>
                                    <li>
                                        <b>Nome</b>
                                        {residentTestData.residentEmail}
                                    </li>
                                    <li>
                                        <b>Telefone de Contato</b>
                                        {residentTestData.residentContactPhone}
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <b>Tipo</b>
                                        {residentTestData.typeOfResident}
                                    </li>
                                    <li>
                                        <b>Número</b>
                                        {apartmentsTestData.apartmentNumber}
                                    </li>
                                    <li>
                                        <b>Bloco</b>
                                        {apartmentsTestData.apartmentBlock}
                                    </li>
                                    <li>
                                        <b>Status</b>
                                        {apartmentsTestData.apartmentStatus}
                                    </li>
                                </div>
                            </section>
                        </ul>
                    </div>
                    <span>
                        Arraste para o lado para mais informações
                    </span>
                </section>

                <section className={style.infoCard}>
                    <h2 className={style.titleInfoCard}>
                        Endereço
                    </h2>
                    <div className={style.infoCardContent}>
                        <ul className={style.infoCardList}>
                            <li> Default Value </li>
                            <li> Default Value </li>
                            <li> Default Value </li>
                            <li> Default Value </li>
                            <li> Default Value </li>
                            <li> Default Value </li>
                        </ul>
                    </div>
                    <span>
                        Arraste para o lado para mais informações
                    </span>
                </section>
            </div>
        </Layout>
    );
};