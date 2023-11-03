import Layout from "@/components/Layout";
import HeaderSection from "@/components/HeaderSection";
import { HiSquares2X2 } from "react-icons/hi2";

export default function DashboardPage() {
    return (
        <Layout>
            <HeaderSection
                headerIcon={<HiSquares2X2 size={36} />}
                headerTitle={"Painel"}
            />
            <section className="p-10">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laudantium rem quo atque architecto a delectus doloribus est, dolor vel sapiente quisquam quia sequi cumque maxime beatae labore. In, impedit quas.
            </section>
        </Layout>
    );
}