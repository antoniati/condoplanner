import SpinnerBouceLoader from "../Loadings/SpinnerBouceLoader";
import styles from "@/styles/LoadingDataMessage.module.css";

const LoadingDataMessage = () => {
      return (
            <div className={styles.infoContent}>
                  <SpinnerBouceLoader />
                  <p> Carregando Informações...</p>
            </div>

      )
}

export default LoadingDataMessage;