import Link from "next/link";
import Logo from "@/components/Logo";
import { navItems } from "@/utils/navigationData";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react"

export default function NavAside({ show }) {
    const inactiveLink = 'flex items-center gap-2 p-4 text-white tracking-wider hover:font-bold transition-all duration-300';
    const activeLink = inactiveLink + ' bg-light-blue rounded font-bold';

    const router = useRouter();
    const { pathname } = router;

    return (
        <aside className={(show ? "left-0 w-full sm:w-96" : "-left-full") + ' fixed lg:static top-0 -left-full lg:left-0 lg:w-96 min-h-screen p-10 text-white bg-dark-blue overflow-auto h-96 transition-all duration-300'}>
            <Link href={navItems[0].navLink}>
                <Logo flexStyle={"flex-row lg:flex-col"}/>
            </Link>
            <nav className="flex flex-col gap-2 text-lg tracking-wider mt-10">
                <ul>
                    {navItems && navItems.map(navItem => (
                        <li key={navItem.navLink}>
                            <Link
                                href={navItem.navLink}
                                className={
                                    pathname === navItem.navLink
                                    ? activeLink :
                                    inactiveLink
                                }
                            >
                                {navItem.navIcon}
                                <span className="text-xl">
                                    {navItem.navText}
                                </span>
                            </Link>
                        </li>
                    ))}
                    <li>
                        <button
                            type="button"
                            className={inactiveLink}
                            onClick={(() => signOut())}
                        >
                            <HiOutlineArrowLeftOnRectangle size={24} />
                            <span className="text-xl">
                                Sair
                            </span>
                        </button>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};