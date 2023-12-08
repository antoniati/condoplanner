import { HiSquares2X2 } from "react-icons/hi2";
import NavCard from "@/components/Navigation/NavCard"; 
import Layout from "@/components/Layout";
import HeaderSection from "@/components/HeaderSection";
import { navItems } from "@/utils/constantsData/navigationData";
import style from "@/styles/Dashboard.module.css";

const Dashboard = () => {
    const mappedNavItems = navItems && navItems.length > 1 ? navItems.slice(1) : [];
    
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
                            <NavCard
                                navLink={navItem.navLink} 
                                cardTitle={navItem.navText} 
                                navIcon={navItem.navIcon}   
                                cardDesription={0}           
                            />
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
};

export default Dashboard;
