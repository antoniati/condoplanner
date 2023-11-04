import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    userEmail: { type: String, required: true },
    userPassword: { type: String, required: true },
}, {
    timestamps: true,
});

export const User = models.User || model('User', UserSchema);