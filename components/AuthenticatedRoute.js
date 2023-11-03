import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function AuthenticatedRoute({ children }) {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.replace("/");
        }
    }, [session, router]);

    if (!session) {
        return null;
    }

    return children; // Renderiza o conteúdo das páginas autenticadas
}
