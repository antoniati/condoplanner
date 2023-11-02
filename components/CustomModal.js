import CustomButton from "@/components/CustomButton";

const CustomModal = ({
    isOpen,
    modalIcon,
    modalTitle,
    modalDescription,
    functionToCloseModal,
}) => {
    return (
        <div className={`${isOpen ? "" : "hidden"} fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75`} >
            <section className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center gap-2 text-center font-medium">
                {modalIcon}
                <div>
                    <h1>{modalTitle}</h1>
                    <p className="text-xl">{modalDescription}</p>
                </div>
                <div className="w-40 mt-5">
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