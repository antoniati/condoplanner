import axios from "axios";
import { useEffect, useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { HiTrash } from "react-icons/hi2";
import CustomButton from "@/components/Buttons/CustomButton";
import InputForm from "@/components/InputForm";
import SpinnerBouceLoader from "@/components/Loadings/SpinnerBouceLoader";
import { defaultErrorMessage } from "@/utils/constantsData/defaultErrorMessages";
import { condoUnitDataInputFields, condoUnitFormInitialData, filterOptionsCondoUnits } from "@/utils/inputFields/condoUnitInputFields";

const CondoUnitForm = ({ onSubmit, prevData }) => {
	const [formData, setFormData] = useState({ ...condoUnitFormInitialData });
	const [errorMessage, setErrorMessages] = useState({});
	const [condoUnitImages, setCondoUnitImages] = useState([]);
	const [isUploadingImage, setIsUploadingImage] = useState(false);

	useEffect(() => {
		prevData && setFormData(prevData);
	}, [prevData]);

	const handleChangesInputFields = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});

		setErrorMessages((prevErrors) => ({
			...prevErrors,
			[name]: "",
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
			console.log(
				`${defaultErrorMessage.internalServerError}`,
				error.message
			);
		};
	};

	const handleUploadCondoUnitImages = async (e) => {
		const files = e.target?.files;

		if (files.length + condoUnitImages.length > 3) {
			setErrorMessages({
				images: "Só é possível enviar até 3 imagens. Atualize para o plano Plus"
			});

			setTimeout(() =>
				setErrorMessages({ images: "" }),
				5000
			);

			return;
		};

		if (files.length > 0) {
			setIsUploadingImage(true);

			const data = new FormData();

			for (const file of files) {
				data.append('file', file);
			}

			try {
				const response = await axios.post("/api/uploadImages", data);

				setCondoUnitImages((prevCondoUnitImages) => [
					...prevCondoUnitImages,
					...response.data.links,
				]);

				setIsUploadingImage(false);
			} catch (error) {
				setIsUploadingImage(false);
				console.error(
					`${defaultErrorMessage.internalServerError}`,
					error.message
				);
			}
		}
	};

	const handleRemoveImage = (index) => {
		const updatedImages = [...condoUnitImages];
		updatedImages.splice(index, 1);
		setCondoUnitImages(updatedImages);
	};

	return (
		<section className={"sectionContainer"}>
			<form
				onSubmit={handleFormSubmit}
				className={"basicForm"}
			>
				<h2 className={"defaultTitle"}>
					Dados da Unidade
					<span> Etapa: 1/2 </span>
				</h2>

				<section>
					{condoUnitDataInputFields.map((field, index) => (
						<InputForm
							key={index}
							inputLabelText={field.label}
							inputType={field.type}
							inputName={field.name}
							inputValue={formData[field.name]}
							inputPlaceholder={field.placeholder}
							inputOnChange={handleChangesInputFields}
							errorMessage={errorMessage[field.name]}
							inputMaxLength={field.maxLength}
						/>
					))}

					<div className={"formOption"}>
						<label>Tipo</label>
						<select
							name="typeOfCondoUnit"
							value={formData.typeOfCondoUnit}
							onChange={handleChangesInputFields}
							className={errorMessage && "error-input" || ""}
						>
							<option value="">
								Selecione um Tipo
							</option>
							{filterOptionsCondoUnits.map((option) => (
								<option
									key={option.value}
									value={option.value}
								>
									{option.label}
								</option>
							))}
						</select>

						{errorMessage.typeOfCondoUnit && (
							<p className="error-message">
								{errorMessage.typeOfCondoUnit}
							</p>
						)}
					</div>
				</section>

				<section className={"formUploadImages"}>
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
							condoUnitImages.map(
								(link, index) => (
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
					{errorMessage.images && (
						<p className="error-message">
							{errorMessage.images}
						</p>
					)}
				</section>
				<div>
					<CustomButton
						buttonType={"submit"}
						buttonStyle={"black-button"}
						buttonText={"Próxima Etapa"}
					/>
				</div>
			</form>
		</section>
	);
};

export default CondoUnitForm;
