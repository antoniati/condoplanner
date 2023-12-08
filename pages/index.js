import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import LoginPage from "@/components/Users/Login/LoginPage";
import PageLoading from "@/components/Loadings/PageLoading";
import Dashboard from "@/components/Dashboard";

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const { data: session } = useSession();

    useEffect(() => {
        checkSession();
    }, [session]);

    const checkSession = async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));

        if (session) {
            <Dashboard />
        } else {
            setIsLoading(false);
        };
    };

    const displayContentBasedOnSession = () => {
        if (isLoading) {
            return <PageLoading />;
        } else if (!session) {
            return <LoginPage />;
        } else {
            return <Dashboard />;
        }
    };

    return displayContentBasedOnSession();
};
