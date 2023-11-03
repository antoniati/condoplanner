import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import LoginPage from "@/components/Login/LoginPage"
import { navItems } from "@/utils/navigationData";

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace("/");
    }
  }, [session, router]);

  if (!session) {
    return <LoginPage />
  } else {
    router.replace(navItems[0].navLink);
    return null;
  }
}