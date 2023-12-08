import { HiMenu } from "react-icons/hi";
import Logo from "@/components/Logo";
import style from "@/styles/Navbar.module.css";

const Navbar = ({ show, onClickButton }) => {
      return (
            <header className={`${show ? "fixed" : ""} ${style.navbar}`} >
                  <Logo />
                  <button onClick={onClickButton}>
                        <HiMenu size={36} />
                  </button>
            </header>
      );
};

export default Navbar;