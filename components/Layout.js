import { useSession } from 'next-auth/react';
import { useState } from "react";
import Navbar from "./Navigation/NavBar";
import NavAside from "@/components/Navigation/NavAside";
import style from "@/styles/Layout.module.css";
import PageLoading from './Loadings/PageLoading';

const Layout = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleIsLoading = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsLoading(!isLoading)
    };

    const [showNav, setShowNav] = useState(false);
    const { data: session } = useSession();

    if (!session) {
        return null;
    }

    const handleShowNav = () => setShowNav(!showNav);

    if (isLoading) {
        return <PageLoading />
    } else {
        return (
            <main className={style.layout}>
                <Navbar
                    show={showNav}
                    onClickButton={handleShowNav}
                />

                <NavAside show={showNav} isLoading={handleIsLoading} />

                <section className={style.contentPage} >
                    {children}
                </section>
            </main>
        );
    };
};

export default Layout;
