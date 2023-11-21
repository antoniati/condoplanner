import { HiBuildingOffice2, HiClipboardDocumentList, HiSquares2X2, HiUserGroup } from "react-icons/hi2";

/**
 * Array contendo itens de navegação para serem exibidos;
 * Cada item possui um link, um ícone e um texto associado.
 */
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
