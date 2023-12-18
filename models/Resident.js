import { Schema, model, models } from "mongoose";

const ResidentSchema = new Schema(
    {
        residentImage: { type: String },
        residentFullName: { type: String, required: true },
        residentRgNumber: { type: String, required: true },
        residentCpfNumber: { type: String },
        dateOfBirthOfResident: { type: String },
        residentEmail: { type: String },
        residentContactPhone: { type: String },
        residentOcupation: { type: String },
        kinshipResident: { type: String },
        
        typeOfResident: {
            type: String,
            required: true,
            enum: [
                "proprietario",
                "mensal",
                "temporada",
                "ocupante"
            ]
        },
        
        residentZipCode: { type: String },
        residentStreet: { type: String },
        streetComplement: { type: String },
        residentNeighborhood: { type: String },
        residentCity: { type: String },
        residentState: { type: String },

        condoUnitIds: [{
            type: Schema.Types.ObjectId,
            ref: 'CondoUnit',
        }],

        accessLogs: [{
            type: Schema.Types.ObjectId,
            ref: "AccessLog"
        }],

    }, { timestamps: true });

export const Resident = models.Resident || model('Resident', ResidentSchema);
