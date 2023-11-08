import CustomButton from "@/components/CustomButton";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import style from "@/styles/ResidentDeletePage.module.css";

const DeleteResidentPage = () => {
    const router = useRouter();

    function handleGoBackPage() {
        router.push("/moradores/perfil");
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
                        <span>
                            <b>Default Value Of Database &nbsp;-&nbsp;</b>
                            <span>
                                <b>RG:&nbsp;</b>Default Value Of Database
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
        </Layout>
    );
};

export default DeleteResidentPage;