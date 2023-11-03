import { useState } from "react";
import Logo from "@/components/Logo";
import NavAside from "@/components/NavAside";
import { HiMenu } from "react-icons/hi";
import HeaderSection from "./HeaderSection";

const Layout = ({ children }) => {
    const [showNav, setShowNav] = useState(false);
    
    const handleShowNav = () => {
        if(showNav === false) {
            setShowNav(true);
        } else {
            setShowNav(false);
        };
    };

    return (
        <main className="flex flex-col lg:flex-row">
            <header className="w-full flex justify-between p-5 bg-dark-blue text-white lg:hidden z-10">
                <Logo />
                <button onClick={handleShowNav}>
                    <HiMenu size={36} />
                </button>
            </header>
            <NavAside show={showNav} />
            <section className="w-full min-h-screen">
                {children}
            </section>
        </main>
    );
};

export default Layout;