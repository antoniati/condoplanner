import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";
import Logo from "@/components/Logo";
import { navItems } from "@/utils/constantsData/navigationData";
import style from '@/styles/NavAside.module.css';

const NavAside = ({ show }) => {
    const router = useRouter();

    const isPathActive = (navLink) => {
        return router.pathname === navLink
            ? style.navActiveLink
            : style.navInactiveLink;
    };

    return (
        <aside
            className={`
                ${style.navAside} 
                ${show ? style.visibleNav : ""}
            `}>
            <Link href={navItems[0].navLink}>
                <Logo logoInCol={"col"} />
            </Link>
            <nav className={style.navContent}>
                <ul>
                    {navItems && navItems.map(navItem => (
                        <li key={navItem.navLink}>
                            <Link
                                href={navItem.navLink}
                                className={`
                                    ${isPathActive(navItem.navLink)} 
                                    ${style.navLink}
                                `}
                            >
                                {navItem.navIcon}
                                <span>
                                    {navItem.navText}
                                </span>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <button
                            type="button"
                            onClick={() => signOut()}
                            className={
                                `${isPathActive("/logout")} 
                                ${style.navLink}`
                            }
                        >
                            <HiOutlineArrowLeftOnRectangle size={24} />
                            <span> Sair </span>
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default NavAside;