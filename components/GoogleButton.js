import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
    return (
        <button
            type="button"
            onClick={() => {}}
            className="
            w-72 sm:w-full flex items-center justify-center gap-2 
            bg-slate-50 p-3 border-2 border-slate-300 rounded 
            font-bold text-black tracking-wider text-xl 
            shadow-md hover:shadow-xl hover:border-luminous-blue 
            hover:tracking-widest transition-all duration-300"
        >
            <FcGoogle size={24} />
            <span> Google </span>
        </button>
    );
};

export default GoogleButton;

