const Logo = () => {
    return(
        <div className="flex items-center justify-center gap-5">
            <img 
                className="w-10"
                src="/logo.svg" 
                alt="Logo Condoplanner" 
            />
            <h1 className="lowercase">
                Condoplanner
            </h1>
        </div>
    );
}

export default Logo;