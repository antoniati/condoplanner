import { useSession } from 'next-auth/react';
import { useState } from "react";
import Navbar from "./Navigation/NavBar";
import NavAside from "@/components/Navigation/NavAside";
import style from "@/styles/Layout.module.css";

const Layout = ({ children }) => {
    const [showNav, setShowNav] = useState(false);
    const { data: session } = useSession();

    if (!session) {
        return null;
    }

    const handleShowNav = () => setShowNav(!showNav);

    return (
        <main className={style.layout}>
            <Navbar
                show={showNav}
                onClickButton={handleShowNav}
            />

            <NavAside show={showNav} />

            <section className={style.contentPage} >
                {children}
            </section>
        </main>
    );
};

export default Layout;
