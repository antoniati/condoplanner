import LoginPage from "@/components/Login/LoginPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.replace("/painel");
        }
    }, [session]);

    if (!session) {
        return <LoginPage />;
    }

    return null;
}
