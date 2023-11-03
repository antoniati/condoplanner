import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Layout from "@/components/Layout";
import HeaderSection from "@/components/HeaderSection";
import AuthenticatedRoute from "@/components/AuthenticatedRoute";
import { HiSquares2X2 } from "react-icons/hi2";

export default function DashboardPage() {
    const { data: session } = useSession()
    const router = useRouter();

    if (session) {

        return (
            <AuthenticatedRoute>
                <Layout>
                    <HeaderSection
                        headerIcon={<HiSquares2X2 size={36} />}
                        headerTitle={"Painel"}
                    />
                    <section className="p-10">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium rem quo atque architecto a delectus doloribus est, dolor vel sapiente quisquam quia sequi cumque maxime beatae labore. In, impedit quas.
                    </section>
                </Layout>
            </AuthenticatedRoute>
        );
    }
}