// Importação da função `signIn` do pacote "next-auth/react" para autenticação.
import { signIn } from "next-auth/react";

// Importação do ícone do Google do pacote "react-icons/fc".
import { FcGoogle } from "react-icons/fc";

// Importação do módulo de estilos do componente.
import style from "@/styles/GoogleButton.module.css";

/**
 * Componente funcional para o botão de login com o Google.
 *
 * @returns {JSX.Element} Componente do botão de login com o Google.
 */
const GoogleButton = () => {
    // Renderização do componente
    return (
        <button
            type="button"
            className={style.googleButton}
            onClick={() => signIn("google")}
        >
            {/* Ícone do Google */}
            <FcGoogle size={24} />
            {/* Texto "Google" */}
            <span> Google </span>
        </button>
    );
};

// Exporta o componente do botão de login com o Google.
export default GoogleButton;
