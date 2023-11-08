import Logo from "@/components/Logo";
import GoogleButton from "@/components/GoogleButton";
import LoginForm from "./LoginForm";
import Link from "next/link";

import style from "@/styles/LoginPage.module.css";

const LoginPage = () => {
    return (
        <main className={style.loginPage}>
            <section className={style.loginPageContainer}>
                <Logo />

                {/* Sessão de Login com Google */}
                <div className={style.loginPageGoogle}>
                    <h2>Faça Login com sua conta</h2>
                    <GoogleButton />
                </div>

                {/* Sessão de Login com Email e Senha */}
                <div className={style.loginPageEmail}>
                    <p className="text-whit-lines">
                        <span></span>
                        ou email e senha
                        <span></span>
                    </p>
                    <LoginForm />
                </div>

                {/* Link para página de Cadastro de usuários */}
                <div className={style.loginPageSignUp}>
                    <h2>Não têm uma Conta ?</h2>
                    <Link href={"/cadastro"} >
                        <span> Cadastre-se </span>
                    </Link>
                </div>
            </section>

            {/* Sessão de apresentação da página de Login */}
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