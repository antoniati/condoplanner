import Logo from "@/components/Logo";
import GoogleButton from "@/components/GoogleButton";
import LoginForm from "./LoginForm";

const LoginPage = () => {
    return (
        <main className="flex">
            <section className="w-full sm:w-auto min-h-screen p-10 bg-dark-blue text-white flex flex-col items-center gap-10">
                <Logo />
                <div className="w-80 flex flex-col items-center gap-5">
                    <h2>Faça Login com sua conta</h2>
                    <GoogleButton />
                </div>

                {/* Login com Email e Senha */}
                <div className="w-72 sm:w-80 flex flex-col gap-5">
                    <p className="text-whit-lines">
                        <span></span>
                        ou email e senha
                        <span></span>
                    </p>
                    <LoginForm />
                </div>
            </section>
            <section className="hidden sm:flex w-full min-h-screen p-10">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit quibusdam esse eligendi est molestias alias tempore sit nulla atque pariatur possimus ad maxime iste qui nemo, facere, consectetur ut aliquid.
            </section>
        </main>
    );
};

export default LoginPage;