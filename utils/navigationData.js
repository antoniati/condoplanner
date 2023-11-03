import { HiBuildingOffice2, HiClipboardDocumentList, HiSquares2X2, HiUserGroup } from "react-icons/hi2";

export const navItems = [
    {
        navLink: "/painel",
        navIcon: <HiSquares2X2 size={24} />,
        navText: "Painel"
    },
    {
        navLink: "/acessos",
        navIcon: <HiClipboardDocumentList size={24} />,
        navText: "Acessos"
    },
    {
        navLink: "/moradores",
        navIcon: <HiUserGroup size={24} />,
        navText: "Moradores"
    },
    {
        navLink: "/unidades",
        navIcon: <HiBuildingOffice2 size={24} />,
        navText: "Unidades"
    },
];
