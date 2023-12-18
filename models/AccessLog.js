import { Schema, model, models } from "mongoose";

const AccessLogSchema = new Schema(
  {
    condoUnitId: { type: Schema.Types.ObjectId, ref: "CondoUnit", required: true },
    residents: [
      {
        residentId: { type: Schema.Types.ObjectId, ref: "Resident" },
        isResponsible: { type: Boolean, default: false },
      }
    ],
    checkIn: { type: Date },
    checkOut: { type: Date },
    statusAccessLog: {
      type: String,
      enum: [
        "pendente",
        "ativo",
        "finalizado"
      ],
      default: "pendente"
    },
  },
  { timestamps: true }
);

export const AccessLog = models.AccessLog || model('AccessLog', AccessLogSchema);
