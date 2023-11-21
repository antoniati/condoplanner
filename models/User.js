// Importa as classes do Mongoose para definir modelos MongoDB
import { Schema, model, models } from "mongoose";

// Definição do modelo do User no MongoDB
const UserSchema = new Schema(
    {
        userEmail: { type: String, required: true },
        userPassword: { type: String, required: true },
    },
    {
        timestamps: true, // Adiciona campos de data de criação e modificação automaticamente
    }
);

// Exporta o modelo User do MongoDB 
// (ou utiliza um modelo existente, se já estiver definido)
export const User = models.User || model('User', UserSchema);
