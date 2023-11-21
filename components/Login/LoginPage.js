// Importação do componente de link do Next.js.
import Link from "next/link";

// Importação dos componentes personalizados
import Logo from "@/components/Logo"; // Logo do condoplanner.
import GoogleButton from "@/components/GoogleButton"; // botão de login do Google.
import LoginForm from "./LoginForm"; // formulário de login.

// Importação do módulo de estilos específico para a página de login.
import style from "@/styles/LoginPage.module.css";

/**
 * Componente funcional para a página de login.
 * Este componente exibe elementos para login com Google, formulário de login,
 * e um link para a página de cadastro de usuários.
 *
 * @returns {JSX.Element} Componente da página de login.
 */
const LoginPage = () => {
    return (
        // Elemento principal da página de login.
        <main className={style.loginPage}>
            {/* Container principal da página de login. */}
            <section className={style.loginPageContainer}>
                {/* Componente de logo do condoplanner. */}
                <Logo />

                {/* Sessão de login com Google. */}
                <div className={style.loginPageGoogle}>
                    <h2>Faça Login com sua conta</h2>
                    {/* Componente de botão de login do Google. */}
                    <GoogleButton />
                </div>

                {/* Sessão de login com email e senha. */}
                <div className={style.loginPageEmail}>
                    <p className="text-whit-lines">
                        <span></span>
                        ou email e senha
                        <span></span>
                    </p>
                    {/* Componente de formulário de login. */}
                    <LoginForm />
                </div>

                {/* Link para a página de cadastro de usuários. */}
                <div className={style.loginPageSignUp}>
                    <h2>Não têm uma Conta ?</h2>
                    {/* Componente de link do Next.js para a página de cadastro. */}
                    <Link href={"/cadastro"} >
                        <span> Cadastre-se </span>
                    </Link>
                </div>
            </section>

            {/* Sessão de apresentação da página de login. */}
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

// Exporta o componente da página de login.
export default LoginPage;
