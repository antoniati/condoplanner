// Importação do componente de spinner BounceLoader.
import { BounceLoader } from "react-spinners";

/**
 * Componente funcional para exibir um spinner de carregamento animado.
 * Este componente utiliza o BounceLoader do pacote "react-spinners".
 *
 * @returns {JSX.Element} Componente do spinner.
 */
const SpinnerBouceLoader = () => {
    return (
        // Elemento BounceLoader para exibir a animação de carregamento.
        <BounceLoader color={"#3f3cbb"} speedMultiplier={2} size={40} />
    );
}

// Exporta o componente de spinnerBouceLoader.
export default SpinnerBouceLoader;
