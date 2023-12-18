import { useState } from "react";
import { HiMapPin, HiOutlineExclamationCircle } from "react-icons/hi2";
import { FaRegAddressCard, FaUserPen } from "react-icons/fa6";
import Layout from "@/components/Layout";
import HeaderSection from "@/components/HeaderSection";
import CustomButton from "@/components/Buttons/CustomButton";
import ResidentPersonalDataEditForm from "@/components/Residents/ResidentForm/ResidentPersonalDataEditForm";
import ResidentAddressDataEditForm from "@/components/Residents/ResidentForm/ResidentAddressDataForm";

export default function EditResidentPage() {
    const [showForm, setShowForm] = useState(1);

    return (
        <Layout>
            <HeaderSection
                headerIcon={<FaUserPen />}
                headerTitle={"Edição de Morador"}
            >
                <CustomButton
                    buttonIcon={<FaRegAddressCard size={24} />}
                    buttonStyle={"blue-button"}
                    buttonText={"Dados Pessoais"}
                    buttonFunction={() => setShowForm(2)}
                />
                <CustomButton
                    buttonIcon={<HiMapPin size={24} />}
                    buttonStyle={"black-button"}
                    buttonText={"Endereço"}
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
                    <ResidentPersonalDataEditForm />
                )}
                {showForm === 3 && (
                    <ResidentAddressDataEditForm />
                )}
            </section>
        </Layout >
    );
};
