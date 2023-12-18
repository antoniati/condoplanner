import { FaBuilding } from "react-icons/fa6";
import {    
    HiClipboardDocumentList,
    HiSquares2X2,
    HiUserGroup
} from "react-icons/hi2";

export const navItems = [
    {
        navLink: "/",
        navIcon: <HiSquares2X2 size={24} />,
        navText: "Painel"
    },
    {
        navLink: "/acessos/listadeacessos",
        navIcon: <HiClipboardDocumentList size={24} />,
        navText: "Acessos"
    },
    {
        navLink: "/moradores/listademoradores",
        navIcon: <HiUserGroup size={24} />,
        navText: "Moradores"
    },
    {
        navLink: "/unidades/listadeunidades",
        navIcon: <FaBuilding size={24} />,
        navText: "Unidades"
    },
];
