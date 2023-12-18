import CustomButton from "@/components/Buttons/CustomButton"; 
import style from "@/styles/CustomModal.module.css"; 

const CustomModal = ({
    modalIcon,
    modalTitle,
    modalDescription,
    functionToCloseModal,
    children
}) => {    
    return (
        <div className={style.modalWrapper}>
            <section className={style.modalContainer}>                
                {modalIcon}
                <div>                    
                    <h1>{modalTitle}</h1>
                    <p>{modalDescription}</p>
                </div>
                                
                <div className={style.modalButton}>
                    {children}
                    <CustomButton
                        buttonType={"button"}
                        buttonStyle={"black-button"}
                        buttonText={"Fechar"}
                        buttonFunction={functionToCloseModal}
                    />
                </div>
            </section>
        </div>
    );
};



export default CustomModal;
