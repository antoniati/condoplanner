// Importação dos componentes 
import Logo from "@/components/Logo"; // logo do condoplanner.
import GoogleButton from "@/components/GoogleButton"; //  botão do Google para cadastro.
import UserRegisterForm from "@/components/UserForm/UserRegisterForm"; // formulário de cadastro de usuário.

// Importação do módulo de estilos da página de cadastro de usuário.
import style from "@/styles/UserRegisterPage.module.css";

/**
 * Componente funcional para a página de cadastro de usuários.
 * Esta página exibe um formulário de cadastro de usuários com opções de cadastro
 * utilizando uma conta do Google ou através de email e senha.
 *
 * @returns {JSX.Element} Componente da página de cadastro de usuários.
 */
export default function UserRegisterPage() {
    s
    return (
        // Elemento principal da página de cadastro de usuários.
        <main className={style.userRegisterPage}>
            {/* Sessão de apresentação da página de Cadastro de usuários */}
            <section className={style.userRegisterPresentation}>
                {/* Componente de logo do condoplanner*/}
                <Logo />
                <p>
                    Cadastre-se! Entre na plataforma e comece a gerenciar
                    condomínios de forma eficiente e segura.
                </p>
            </section>

            {/* Formulário de Cadastro de usuários*/}
            <section className={style.userRegisterFormContainer}>
                {/* Título do formulário de cadastro */}
                <h1> Formulário de Cadastro </h1>

                {/* Sessão de Cadastro com Google */}
                <div className={style.userRegisterFormContent}>
                    {/* Título da sessão de cadastro com Google */}
                    <h2>Cadastre-se com sua conta</h2>
                    {/* Componente de botão do Google para cadastro */}
                    <GoogleButton />
                </div>

                {/* Sessão de Cadastro com Email e Senha */}
                <div className={style.userRegisterFormContent}>
                    {/* Descrição da sessão de cadastro com email e senha */}
                    <p className="text-whit-lines">
                        <span></span>
                        ou email e senha
                        <span></span>
                    </p>
                    {/* Componente de formulário de cadastro de usuário */}
                    <UserRegisterForm />
                </div>
            </section>
        </main>
    );
};
