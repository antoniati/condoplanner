import Logo from "@/components/Logo";
import GoogleButton from "@/components/GoogleButton";
import LoginForm from "./LoginForm";

const LoginPage = () => {
    return (
        <main className="flex">
            <section className="w-full sm:w-auto min-h-screen p-10 bg-dark-blue text-white flex flex-col items-center gap-10">
                <Logo />

                {/* Sessão de Login com Google */}
                <div className="w-80 flex flex-col items-center gap-5">
                    <h2>Faça Login com sua conta</h2>
                    <GoogleButton />
                </div>

                {/* Sessão de Login com Email e Senha */}
                <div className="w-72 sm:w-80 flex flex-col gap-5">
                    <p className="text-whit-lines">
                        <span></span>
                        ou email e senha
                        <span></span>
                    </p>
                    <LoginForm />
                </div>
            </section>

            {/* Sessão de apresentação da página de Login */}
            <section className="hidden sm:flex flex-col gap-5 w-full p-10 min-h-screen bg-none sm:bg-[url('/images/bkg-login.png')] bg-no-repeat bg-right-bottom bg-[length:470px_450px] xl:bg-[length:530px_500px] transition-all duration-300">
                <h1 className="text-3xl text-dark-blue">
                    Software para Gestão de Condomínios
                </h1>
                <p className="text-xl">
                    Tecnologia que traz Inovação e eficiência para<br></br>
                    a administração de condomínios
                </p>
            </section>
        </main>
    );
};

export default LoginPage;