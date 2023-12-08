import axios from "axios";
import { useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { HiBuildingOffice2, HiTrash } from "react-icons/hi2";

import HeaderSection from "@/components/HeaderSection";
import CustomButton from "@/components/CustomButton";
import InputForm from "@/components/InputForm";
import SpinnerBouceLoader from "@/components/Loadings/SpinnerBouceLoader";

import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import { condoUnitDataInputFields, condoUnitFormInitialData, filterOptionsCondoUnits } from "@/utils/inputFields/condoUnitInputFields";

import style from "@/styles/BasicForm.module.css";

const CondoUnitData = ({ onSubmit, onBack, prevData, }) => {
	const [formData, setFormData] = useState({ ...prevData, ...condoUnitFormInitialData, });
	const [errorMessage, setErrorMessage] = useState({});
	const [condoUnitImages, setCondoUnitImages] = useState([]);
	const [isUploadingImage, setIsUploadingImage] = useState(false);



	const handleChangesInputFields = (e) => {
		const { name, value } = e.target;
		let isValueToUpperCase = value

		if (name === "condoUnitBlock" || name === "condoUnitNumber") {
			isValueToUpperCase = value.toUpperCase();
		}

		setFormData({
			...formData,
			[name]: isValueToUpperCase
		});

		setErrorMessage((prevErrors) => ({
			...prevErrors, [name]: "",
		}));
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		try {
			onSubmit({
				...formData,
				condoUnitImages
			});

		} catch (error) {
			console.log(defaultErrorMessage.internalServerError);
			setErrorMessage({
				condoUnitNumber: defaultErrorMessage.internalServerError,
			});
		}
	};

	const handleUploadCondoUnitImages = async (e) => {
		const files = e.target?.files;

		if (files.length + condoUnitImages.length > 3) {
			setErrorMessage({ images: "Só é possível enviar até 3 imagens." });
			setTimeout(() => cleanErrorMessage("images"), 5000);
			return;
		}

		setErrorMessage({ images: "" });

		if (files.length > 0) {
			setIsUploadingImage(true);

			const data = new FormData();

			for (const file of files) {
				data.append('file', file);
			}

			try {
				const res = await axios.post("/api/uploadImages", data);

				setCondoUnitImages((oldCondoUnitImages) => [
					...oldCondoUnitImages,
					...res.data.links,
				]);

				setIsUploadingImage(false);
			} catch (error) {
				console.error("Erro na solicitação de upload:", error);
				setIsUploadingImage(false);
			}
		}
	};

	const handleRemoveImage = (index) => {
		const updatedImages = [...condoUnitImages];
		updatedImages.splice(index, 1);
		setCondoUnitImages(updatedImages);
	};

	return (
		<>
			{/* Seção de cabeçalho */}
			<HeaderSection
				headerIcon={<HiBuildingOffice2 size={36} />}
				headerTitle={"Cadastro de Unidades"}
			>
				{/* Descrição da seção de cabeçalho */}
				<p>
					Preencha os campos do formulário abaixo com os
					dados da unidade para cadastra-la.
				</p>
			</HeaderSection>

			{/* Seção principal do formulário */}
			<section className={"mainWrapper"}>
				{/* Formulário */}
				<form onSubmit={handleFormSubmit} className={style.formContent}>
					{/* Título do formulário */}
					<h2 className={style.titleForm}>
						Dados da Unidade
						<span> Etapa: 2/2 </span>
					</h2>

					{/* Seção de campos de entrada */}
					<section className={style.formSection}>
						{/* Mapeamento dos campos de entrada da unidade */}
						{condoUnitDataInputFields.map((field, index) => (
							<InputForm
								key={index}
								inputLabelText={field.label}
								inputType={field.type}
								inputName={field.name}
								inputValue={formData[field.name] || ""}
								inputPlaceholder={field.placeholder}
								inputOnChange={handleChangesInputFields}
								errorMessage={errorMessage[field.name]}
								inputMaxLength={field.maxLength}
							/>
						))}

						{/* Seletor do Status da Unidade */}
						<div className={style.formOption}>
							<label> Status</label>
							<select
								name="condoUnitStatus"
								value={formData.condoUnitStatus}
								onChange={handleChangesInputFields}
								className={errorMessage && "error-input" || ""}
							>
								<option value="">
									Selecione um Status
								</option>
								{/* Mapeamento das opções de filtro para o status da unidade */}
								{filterOptionsCondoUnits.map((option) => (
									<option key={option.value} value={option.value} >
										{option.label}
									</option>
								))}
							</select>

							{/* Exibição de mensagem de erro para o status da unidade */}
							{errorMessage.condoUnitStatus && (
								<p className="error-message">
									{errorMessage.condoUnitStatus}
								</p>
							)}
						</div>
					</section>

					{/* Seção de upload de imagens */}
					<section className={style.formUploadImages}>
						<label>
							Imagens da Unidade
							{!condoUnitImages?.length && (
								<span>
									Clique no botão upload para adicionar fotos da unidade
								</span>
							)}
						</label>
						<div>
							<label>
								<HiOutlineUpload size={26} />
								<h3> Upload </h3>
								<input
									type="file"
									className="hidden"
									onChange={handleUploadCondoUnitImages}
								/>
							</label>
							{!!condoUnitImages?.length &&
								condoUnitImages.map((link, index) => (
									<div
										key={index}
										className="flex bg-slate-200 relative"
									>
										<img
											src={link}
											alt={`Imagem ${index + 1}`}
											className="w-24 h-24 rounded-md object-cover"
										/>
										<button
											type="button"
											onClick={() => handleRemoveImage(index)}
											className="bg-red-400 hover:bg-red-500 p-2 rounded-full absolute -top-2 -right-3 shadow-sm transition-all duration-300"
										>
											<HiTrash size={20} color="#FFF" />
										</button>
									</div>
								))}

							{isUploadingImage && <SpinnerBouceLoader />}
						</div>

						{errorMessage.condoUnitStatus && (
							<span> <p> {errorMessage.condoUnitStatus}</p> </span>
						)}
					</section>

					{/* Botões do formulário */}
					<div className={`${style.buttonsForm} mt-5`}>
						{/* Botão para salvar o cadastro da unidade */}
						<CustomButton
							type={"submit"}
							buttonStyle={"blue-button"}
							buttonText={"Salvar Cadastro"}
						/>
						{/* Botão para voltar à etapa anterior */}
						<CustomButton
							type={"button"}
							buttonStyle={"black-button"}
							buttonText={"Voltar"}
							buttonFunction={onBack}
						/>
					</div>
				</form>
			</section>
		</>
	);
};

export default CondoUnitData;
