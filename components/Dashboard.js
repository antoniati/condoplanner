import { HiSquares2X2 } from "react-icons/hi2";
import NavCard from "@/components/Navigation/NavCard";
import Layout from "@/components/Layout";
import HeaderSection from "@/components/HeaderSection";
import { navItems } from "@/utils/constantsData/navigationData";
import style from "@/styles/Dashboard.module.css";
import { useState } from "react";
import PageLoading from "./Loadings/PageLoading";

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleIsLoading = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsLoading(!isLoading)
    };

    const mappedNavItems = navItems && navItems.length > 1 ? navItems.slice(1) : [];

    if (isLoading) {
        return <PageLoading />
    } else {
        return (
            <Layout>
                <HeaderSection
                    headerTitle={"Painel"}
                    headerIcon={<HiSquares2X2 size={36} />}
                />
                <section className={style.dashboard}>
                    <ul>
                        {mappedNavItems.map(navItem => (
                            <li key={navItem.navLink}>
                                <button onClick={handleIsLoading}>
                                    <NavCard
                                        navLink={navItem.navLink}
                                        cardTitle={navItem.navText}
                                        navIcon={navItem.navIcon}
                                        cardDesription={0}
                                    />
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </Layout>
        );
    }
};

export default Dashboard;
