import Logo from "@/components/Logo"; 
import GoogleButton from "@/components/Buttons/GoogleButton"; 
import UserRegisterForm from "@/components/Users/UserForm/UserRegisterForm"; 
import style from "@/styles/UserRegisterPage.module.css";

export default function UserRegisterPage() {    
    return (
        <main className={style.userRegisterPage}>            
            <section className={style.userRegisterPresentation}>                
                <Logo />
                <p>
                    Cadastre-se! Entre na plataforma e comece a gerenciar
                    condomínios de forma eficiente e segura.
                </p>
            </section>
            
            <section className={style.userRegisterFormContainer}>                
                <h1> Formulário de Cadastro </h1>
                
                <div className={style.userRegisterFormContent}>                    
                    <h2>Cadastre-se com sua conta</h2>                    
                    <GoogleButton />
                </div>
                
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
