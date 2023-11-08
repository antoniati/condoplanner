import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import style from "@/styles/GoogleButton.module.css";


const GoogleButton = () => {
    return (
        <button
            type="button"
            className={style.googleButton}
            onClick={() => signIn("google")}
        >
            <FcGoogle size={24} />
            <span> Google </span>
        </button>
    );
};

export default GoogleButton;

