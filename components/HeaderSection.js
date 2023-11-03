const HeaderSection = ({
    headerIcon,
    headerTitle,
    children
}) => {
    return (
        <section className="w-full h-auto gap-4 sm:h-24 p-4 flex justify-center items-center sm:justify-between flex-col sm:flex-row bg-slate-50 border-2 border-slate-300 shadow-sm">
            <div className="flex flex-col text-center sm:flex-row items-center gap-2 text-2xl font-medium">
                <span className="text-3xl">
                    {headerIcon}
                </span>
                <h1> {headerTitle} </h1>
            </div>
            <div> {children} </div>
        </section>
    );
}

export default HeaderSection;