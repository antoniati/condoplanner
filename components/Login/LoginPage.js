import Logo from "../Logo";

const LoginPage = () => {
    return (
        <main className="flex">
            <section className="w-full sm:w-auto min-h-screen p-10 bg-dark-blue text-white">
                <Logo />
            </section>
            <section className="hidden sm:flex w-full min-h-screen p-10">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit quibusdam esse eligendi est molestias alias tempore sit nulla atque pariatur possimus ad maxime iste qui nemo, facere, consectetur ut aliquid.
            </section>
        </main>
    );
};

export default LoginPage;