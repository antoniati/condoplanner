import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiEye, HiPencilSquare, HiTrash, HiUser } from "react-icons/hi2";
import Layout from "@/components/Layout";
import HeaderSection from "@/components/HeaderSection";
import CustomButton from "@/components/Buttons/CustomButton";
import LoadingDataMessage from "@/components/Loadings/LoadingDataMessage";
import DataNotFoundMessage from "@/components/Loadings/DataNotFoundMessage";
import { fetchResidentDataById } from "@/utils/fetchData/fetchResidentById";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import { applyCPFMask, applyRGMask, formatDate, formatDateTime } from "@/utils/inputFields/inputFieldsMask";
import style from "@/styles/ResidentInfoCard.module.css";
import styleTable from "@/styles/BasicTable.module.css";

export default function PerfilPage() {
    const [residentData, setResidentData] = useState({});
    const [isLoadingData, setIsLoadingData] = useState(true);

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        setIsLoadingData(true);

        if (id) {
            handleFetchResidentData();
        }

    }, [id]);

    const handleFetchResidentData = async () => {
        try {
            const residentData = await fetchResidentDataById(id);
            setResidentData(residentData);

        } catch (error) {
            console.error(defaultErrorMessage.internalServerError, error.message);
        } finally {
            setIsLoadingData(false);
        }
    };

    return (
        <Layout>
            <HeaderSection
                headerIcon={<HiUser size={36} />}
                headerTitle={"Perfil do Morador"}
            >
                <CustomButton
                    buttonIcon={
                        <HiPencilSquare
                            size={24}
                            color="#FFF" />
                    }
                    buttonText={"Editar Morador"}
                    buttonStyle={"blue-button"}
                    buttonType={"button"}
                    buttonFunction={() =>
                        router.push(`/moradores/editar/${id}`)
                    }
                />
                <CustomButton
                    buttonIcon={
                        <HiTrash
                            size={24}
                            color="#FFF" />
                    }
                    buttonText={"Excluir"}
                    buttonStyle={"red-button"}
                    buttonType={"button"}
                    buttonFunction={() =>
                        router.push(`/moradores/deletar/${id}`)
                    }
                />
            </HeaderSection>
            {isLoadingData ? (
                <div className="mainWrapper">
                    <LoadingDataMessage />
                </div>
            ) : (
                <div className={style.infoCardWrapper}>
                    <section className={style.infoCard}>
                        <div className={style.titleInfoCard}>
                            <h2>
                                Dados Pessoais
                            </h2>
                            <p>
                                <b>Atualizado em:</b>
                                {
                                    residentData?.updatedAt &&
                                    formatDateTime(residentData?.updatedAt)
                                }
                            </p>
                        </div>

                        <div className={style.infoCardContent}>
                            <ul className={style.infoCardList}>
                                <section>
                                    <img
                                        alt="Foto do Morador"
                                        src={
                                            residentData?.residentImage
                                            || "/images/perfil-img.png"
                                        }
                                    />
                                    <div>
                                        <li>
                                            <b>Nome:</b>
                                            {residentData?.residentFullName}
                                        </li>
                                        <li>
                                            <b>RG:</b>
                                            {
                                                residentData?.residentRgNumber &&
                                                applyRGMask(residentData?.residentRgNumber)
                                                || "N/A"
                                            }
                                        </li>
                                        <li>
                                            <b>CPF:</b>
                                            {
                                                residentData?.residentCpfNumber &&
                                                applyCPFMask(residentData?.residentCpfNumber)
                                                || "N/A"
                                            }
                                        </li>
                                        <li>
                                            <b>Data de N

                                                asc:</b> {residentData?.residentCpfNumber &&
                                                    formatDate(residentData?.dateOfBirthOfResident)
                                                    || "N/A"
                                            }
                                        </li>
                                    </div>
                                    <div>
                                        <li>
                                            <b>Tipo:</b>
                                            {residentData?.typeOfResident}
                                        </li>
                                        <li>
                                            <b>Parentesco:</b>
                                            {residentData?.kinshipResident}
                                        </li>
                                        <li>
                                            <b>Email:</b>
                                            {residentData?.residentEmail}
                                        </li>
                                        <li>
                                            <b>Nº Contato:</b>
                                            {residentData?.residentContactPhone}
                                        </li>
                                    </div>
                                </section>
                            </ul>
                        </div>
                    </section>

                    <section className={style.infoCard}>
                        <h2 className={style.titleInfoCard}>
                            Unidades
                        </h2>
                        <div className={style.infoCardContent}>

                            {residentData.condoUnitIds?.length > 0 ? (
                                <div className={styleTable.tableWrapper}>
                                    <table className={styleTable.tableContent}>
                                        <thead className={styleTable.tableHeader}>
                                            <tr className={styleTable.tableHeaderRow}>
                                                <th>Número da Unidade</th>
                                                <th>Bloco</th>
                                                <th>Status</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody className={styleTable.tableBody}>
                                            {residentData.condoUnitIds.map((condoUnit) => (
                                                <tr
                                                    key={condoUnit._id}
                                                    className={styleTable.tableBodyRowUnit}
                                                >
                                                    <td>{condoUnit.condoUnitNumber || 'N/A'}</td>
                                                    <td>{condoUnit.condoUnitBlock || 'N/A'}</td>
                                                    <td>{condoUnit.condoUnitStatus || 'N/A'}</td>
                                                    <td>
                                                        <CustomButton
                                                            buttonIcon={
                                                                <HiEye
                                                                    size={24}
                                                                    color="#FFF" />
                                                            }
                                                            buttonText={"Ver Unidade"}
                                                            buttonStyle={"black-button"}
                                                            buttonType={"button"}
                                                            buttonFunction={() =>
                                                                router.push(`/unidades/detalhes/${condoUnit._id}`)
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>) : (
                                <div className="w-full">
                                    <DataNotFoundMessage />
                                </div>
                            )}
                        </div>
                    </section>

                    <section className={style.infoCard}>
                        <h2 className={style.titleInfoCard}>Endereço</h2>
                        <div className={style.infoCardContent}>
                            <ul className={style.infoCardList}>
                                <div>
                                    <li>
                                        <b>Endereço:</b>
                                        {residentData?.residentStreet}
                                    </li>
                                    <li>
                                        <b>Cidade:</b>
                                        {residentData?.residentCity}
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <b>Complemento:</b>
                                        {residentData?.streetComplement}
                                    </li>
                                    <li>
                                        <b>Estado:</b>
                                        {residentData?.residentState}
                                    </li>
                                </div>
                                <div>
                                    <li>
                                        <b>Bairro:</b>
                                        {residentData?.residentNeighborhood}
                                    </li>
                                    <li>
                                        <b>CEP:</b>
                                        {residentData?.residentZipCode}
                                    </li>
                                </div>
                            </ul>
                        </div>
                    </section>
                </div>
            )}
        </Layout>
    );
};
