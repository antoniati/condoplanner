import { Schema, model, models } from "mongoose";

const CondoUnitSchema = new Schema(
    {
        condoUnitNumber: { type: String, required: true },
        condoUnitBlock: { type: String, required: true },
        condoUnitStatus: {
            type: String,
            required: true,
            enum: ["morando", "mensal", "temporada", "emprestada", "reformando", "vazia"],
        },
        condoUnitImages: [{ type: String }],

        // Modificação: Lista de moradores
        residents: [
            {
                residentId: { type: Schema.Types.ObjectId, ref: "Resident" },
                isTitular: { type: Boolean, default: false },
            }
        ],
    },
    { timestamps: true }
);

export const CondoUnit = models.CondoUnit || model('CondoUnit', CondoUnitSchema);
