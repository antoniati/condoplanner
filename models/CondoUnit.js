import { Schema, model, models } from "mongoose";

const CondoUnitSchema = new Schema(
    {
        condoUnitNumber: { type: String, required: true },
        condoUnitBlock: { type: String, required: true },
        typeOfCondoUnit: {
            type: String,
            required: true,
            enum: [
                "proprietário",
                "mensal",
                "temporada",
                "emprestada",
                "reformando",
            ],
        },

        condoUnitImages: [{ type: String }],

        residents: [
            {
                residentId: {
                    type: Schema.Types.ObjectId,
                    ref: "Resident"
                },
                isHolder: {
                    type: Boolean,
                    default: false
                },
            }
        ],

        accessLogs: [{
            type: Schema.Types.ObjectId,
            ref: "AccessLog"
        }],

    }, { timestamps: true }
);

export const CondoUnit = models.CondoUnit || model('CondoUnit', CondoUnitSchema);
