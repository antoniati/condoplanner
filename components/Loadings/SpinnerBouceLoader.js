// Importação do componente de spinner SpinnerBouceLoader.
import { BounceLoader } from "react-spinners";

/**
 * Componente funcional para exibir SpinnerBouceLoader spinner de carregamento animado.
 * Este componente utiliza o  do pacote "react-spinners".
 *
 * @returns {JSX.Element} Componente do spinner.
 */
const SpinnerBouceLoader = () => {
    return (
        // Elemento SpinnerBouceLoader para exibir a animação de carregamento.
        <BounceLoader color={"#3f3cbb"} speedMultiplier={2} size={40} />
    );
}

// Exporta o componente de spinnerBouceLoader.
export default SpinnerBouceLoader;