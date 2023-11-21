// Importa as classes do Mongoose para definir modelos MongoDB
import { Schema, model, models } from "mongoose";

// Definição do modelo da Unidade no MongoDB
const CondoUnitSchema = new Schema(
    {
        // Número de CPF do morador associado à unidade
        residentCpfNumber: { type: Number, required: true },

        // ID do residente responsável pela unidade
        residentHolderId: { type: Schema.Types.ObjectId, ref: "Resident" },

        // Número da unidade no condomínio
        condoUnitNumber: { type: Number, required: true },

        // Bloco da unidade no condomínio
        condoUnitBlock: { type: String },

        // Status da unidade no condomínio
        condoUnitStatus: {
            type: String,
            enum: [
                "morando",
                "mensal",
                "temporada",
                "emprestada",
                "reformando",
                "vazia",
            ],
            required: true,
        },

        // Imagens associadas à unidade no condomínio
        condoUnitImages: [{ type: String }],
    },
    {
        timestamps: true,
    }
);

// Exporta o modelo CondoUnit, garantindo que não seja redefinido se já existir
export const CondoUnit = models.CondoUnit || model('CondoUnit', CondoUnitSchema);
