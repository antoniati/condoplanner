import { FaBuilding } from "react-icons/fa6";
import Layout from "@/components/Layout";
import HeaderSection from "@/components/HeaderSection";
import CondoUnitEditForm from "@/components/CondoUnits/CondoUnitForm/CondoUnitEditForm";
import { useState } from "react";
import CustomButton from "@/components/Buttons/CustomButton";
import { BsBuildingFillGear } from "react-icons/bs";
import { HiOutlineExclamationCircle, HiOutlineUserPlus } from "react-icons/hi2";
import CondoUnitResidentsEditForm from "@/components/CondoUnits/CondoUnitForm/CondoUnitResidentsEditForm";

export default function EditCondoUnitPage() {
    const [showForm, setShowForm] = useState(1);
    
    return (
        <Layout>
            <HeaderSection
                headerIcon={<FaBuilding />}
                headerTitle={"Editar Unidade"}
            >   <CustomButton
                    buttonIcon={<BsBuildingFillGear size={24} />}
                    buttonStyle={"blue-button"}
                    buttonText={"Dados da Unidade"}
                    buttonFunction={() => setShowForm(2)}
                />
                <CustomButton
                    buttonIcon={<HiOutlineUserPlus size={24} />}
                    buttonStyle={"black-button"}
                    buttonText={"Adicionar Residentes"}
                    buttonFunction={() => setShowForm(3)}
                />
            </HeaderSection>
            <section className="mainWrapper">
                {showForm === 1 && (
                    <section className="sectionContainer">
                        <div className="defaultTitle">
                            <span></span>
                            <div className="flex  text-dark-gray flex-col gap-5 sm:flex-row sm:gap-2 items-center">
                                <HiOutlineExclamationCircle size={26} />
                                <p>
                                    Escolha uma das opções acima para Editar
                                </p>
                            </div>
                        </div>
                    </section>
                )}
                {showForm === 2 && (
                    <CondoUnitEditForm />
                )}
                {showForm === 3 && (
                    <CondoUnitResidentsEditForm />
                )}
            </section>
        </Layout >
    );
};
