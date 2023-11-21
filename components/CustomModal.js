// Importação de módulos e componentes necessários
import CustomButton from "@/components/CustomButton"; // Componente de botão personalizado
import style from "@/styles/CustomModal.module.css"; // Estilos do modal

/**
 * Componente funcional para um modal personalizado.
 *
 * @param {Object} props - Propriedades do componente.
 * @param {JSX.Element} props.modalIcon - Ícone a ser exibido no modal.
 * @param {string} props.modalTitle - Título do modal.
 * @param {string} props.modalDescription - Descrição do modal.
 * @param {Function} props.functionToCloseModal - Função para fechar o modal.
 * @returns {JSX.Element} Componente do modal personalizado.
 */
const CustomModal = ({
    modalIcon,
    modalTitle,
    modalDescription,
    functionToCloseModal,
}) => {
    // Renderização do componente
    return (
        <div className={style.modalWrapper}>
            <section className={style.modalContainer}>
                {/* Ícone do modal */}
                {modalIcon}
                <div>
                    {/* Título e descrição do modal */}
                    <h1>{modalTitle}</h1>
                    <p>{modalDescription}</p>
                </div>
                {/* Botão para fechar o modal */}
                <div className={style.modalButton}>
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


// Exporta o componente
export default CustomModal;
