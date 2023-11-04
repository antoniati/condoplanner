import { User } from "@/models/User";
import connectionWithMongoDB from "@/config/mongoose";
import bcrypt from "bcrypt";

export default async function handle(req, res) {
    const { method } = req;

    await connectionWithMongoDB();

    if (method === "POST") {
        const { userEmail, userPassword } = req.body;

        try {
            const existingUser = await User.findOne({ userEmail });

            if (!existingUser) {
                return res.status(401).json({
                    error: "E-mail ou Senha inválidos."
                });
            }

            const isPasswordValid = await bcrypt.compare(userPassword, existingUser.userPassword);

            if (!isPasswordValid) {
                return res.status(401).json({
                    error: "E-mail ou Senha inválidos."
                });
            }

            return res.status(200).json({
                sucess: "Logado com sucesso!"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Erro no servidor.'
            });
        }
    }
}
