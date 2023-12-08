import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import styles from "@/styles/DataNotFoundMessage.module.css";

const DataNotFoundMessage = () => {
      return (
            <div className={styles.infoContent}>
                  <span> <HiOutlineExclamationCircle className="opacity-70" size={30} /> </span>
                  <p> {defaultErrorMessage.dataNotFound} </p>
            </div>
      )
}

export default DataNotFoundMessage;