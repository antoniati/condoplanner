import Logo from "@/components/Logo";
import GoogleButton from "@/components/GoogleButton";
import UserRegisterForm from "@/components/UserRegisterForm";

export default function UserRegisterPage() {
    return (
        <main className="flex flex-col md:flex-row">
            {/* Sessão de apresentação da página de Cadastro de usuários */}
            <section className="w-full md:w-auto md:min-h-screen md:p-10 p-5 bg-dark-blue text-white flex flex-col items-start gap-10">
                <Logo />
                <p className="w-64 hidden md:flex">
                    Cadastre-se! Entre na plataforma e comece gerenciar condomínios de um jeito eficiente e seguro.
                </p>
            </section>

            {/* Formulário de Cadastro de usuários*/}
            <section className=" flex flex-col md:items-start items-center gap-5 w-full p-10 min-h-screen bg-none lg:bg-[url('/images/bkg-register.png')] bg-no-repeat bg-right-bottom bg-[length:300px_300px] xl:bg-[length:400px_420px] transition-all duration-300">
                <h1 className="w-72 sm:w-80 text-center text-dark-blue">
                    Formulário de Cadastro
                </h1>

                {/* Sessão de Cadastro com Google */}
                <div className="w-72 sm:w-80 flex flex-col items-center gap-5">
                    <h2>Cadastre-se com sua conta</h2>
                    <GoogleButton />
                </div>

                {/* Sessão de Cadastro com Email e Senha */}
                <div className="w-72 sm:w-80 flex flex-col gap-5">
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
