import Logo from "@/components/Logo";
import GoogleButton from "@/components/GoogleButton";
import UserRegisterForm from "@/components/UserRegisterForm";
import style from "@/styles/UserRegisterPage.module.css";

export default function UserRegisterPage() {
    return (
        <main className={style.userRegisterPage}>
            {/* Sessão de apresentação da página de Cadastro de usuários */}
            <section className={style.userRegisterPresentation}>
                <Logo />
                <p>
                    Cadastre-se! Entre na plataforma e comece gerenciar 
                    condomínios de um jeito eficiente e seguro.
                </p>
            </section>

            {/* Formulário de Cadastro de usuários*/}
            <section className={style.userRegisterFormContainer}>
                <h1> Formulário de Cadastro </h1>

                {/* Sessão de Cadastro com Google */}
                <div className={style.userRegisterFormContent}>
                    <h2>Cadastre-se com sua conta</h2>
                    <GoogleButton />
                </div>

                {/* Sessão de Cadastro com Email e Senha */}
                <div className={style.userRegisterFormContent}>
                    <p className="text-whit-lines">
                        <span></span>
                        ou email e senha
                        <span></span>
                    </p>
                    <UserRegisterForm />
                </div>
            </section>
        </main>
    );
};
