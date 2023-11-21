// Importação dos hooks `useEffect` e `useState` do pacote "react".
import { useEffect, useState } from "react";

// Importação do hook `useRouter` do pacote "next/router".
import { useRouter } from "next/router";

// Importação do hook `useSession` do pacote "next-auth/react".
import { useSession } from "next-auth/react";

// Importação dos componentes personalizados
import LoginPage from "@/components/Login/LoginPage";   // Página de login
import PageLoading from "@/components/Loadings/PageLoading"; // Componente de loading

// Definição do componente funcional da página inicial.
export default function HomePage() {
    // Estado para controlar o estado de carregamento da página.
    const [isLoading, setIsLoading] = useState(true);

    // Obtenção da sessão atual do usuário.
    const { data: session } = useSession();

    // Objeto para manipular as rotas no Next.js.
    const router = useRouter();

    // Efeito para verificar a sessão do usuário ao carregar a página.
    useEffect(() => {
        // Função para verificar a sessão do usuário.
        const checkSession = async () => {
            // Simulação de um atraso de 500 milissegundos (0.5 segundos).
            await new Promise((resolve) => setTimeout(resolve, 500));

            // Verifica se há uma sessão ativa.
            if (session) {
                // Redireciona para a área do painel se a sessão estiver ativa.
                router.replace("/painel");
            } else {
                // Desativa o estado de carregamento se não houver sessão.
                setIsLoading(false);
            };
        };

        // Chama a função de verificação de sessão.
        checkSession();
    }, [session, router]);

    // Função para exibir conteúdo com base no estado de carregamento e na sessão do usuário.
    const displayContentBasedOnSession = () => {
        if (isLoading) {
            // Exibe o componente de loading enquanto a página está carregando.
            return <PageLoading />;
        } else if (!session) {
            // Exibe a página de login se não houver uma sessão ativa.
            return <LoginPage />;
        } else {
            // Pode adicionar lógica adicional para o caso de ter uma sessão ativa.
            return <PageLoading />;
        }
    };

    // Retorna o conteúdo com base na sessão do usuário.
    return displayContentBasedOnSession();
};
