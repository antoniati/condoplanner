// Importa as classes do Mongoose para definir modelos MongoDB
import { Schema, model, models } from "mongoose";

// Definição do modelo do Resident no MongoDB
const ResidentSchema = new Schema(
    {
    // Dados Pessoais
    residentFullName: { type: String, required: true },
    residentCpfNumber: { type: Number },
    residentRgNumber: { type: Number, required: true },
    dateOfBirthOfResident: { type: String },
    residentEmail: { type: String },
    residentContactPhone: { type: Schema.Types.Mixed },
    residentOcupation: { type: String },
    kinshipResident: { type: String },
    typeOfResident: { type: String, required: true, enum: ["proprietario", "mensal", "temporada", "ocupante"] },

    // Endereço
    residentZipCode: { type: Number },
    residentStreet: { type: String },
    streetComplement: { type: String },
    residentNeighborhood: { type: String },
    residentCity: { type: String },
    residentState: { type: String },

    // ID de relacionamento com o banco de dados das unidades do condomínio
    CondoUnit: { type: Schema.Types.ObjectId, ref: "CondoUnit" },
}, {
    timestamps: true, // Adiciona campos de data de criação e modificação automaticamente
});

// Exporta o modelo Resident do MongoDB 
// (ou utiliza um modelo existente, se já estiver definido)
export const Resident = models.Resident || model('Resident', ResidentSchema);