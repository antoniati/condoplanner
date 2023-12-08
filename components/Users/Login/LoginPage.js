import Link from "next/link";
import Logo from "@/components/Logo";
import GoogleButton from "@/components/Buttons/GoogleButton";
import LoginForm from "@/components/Users/Login/LoginForm";
import style from "@/styles/LoginPage.module.css";

const LoginPage = () => {
    return (
        <main className={style.loginPage}>
            <section className={style.loginPageContent}>
                <Logo />

                <div className={style.loginPageGoogle}>
                    <h2>Faça Login com sua conta</h2>
                    <GoogleButton />
                </div>

                <div className={style.loginPageEmail}>
                    <p className={style.textWithLines}>
                        <span></span>
                        ou email e senha
                        <span></span>
                    </p>
                    <LoginForm />
                </div>

                <div className={style.loginPageSignUp}>
                    <h2>Não têm uma Conta ?</h2>
                    <Link href={"/usuarios/cadastrodeusuarios"} >
                        <span> Cadastre-se </span>
                    </Link>
                </div>
            </section>

            <section className={style.loginPagePresentation}>
                <h1> Software para Gestão de Condomínios </h1>
                <p>
                    Tecnologia que traz Inovação e eficiência para<br></br>
                    a administração de condomínios
                </p>
            </section>
        </main>
    );
};

export default LoginPage;
