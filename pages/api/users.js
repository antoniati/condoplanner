import { User } from "@/models/User";
import connectionWithMongoDB from "@/config/mongoose";
import bcrypt from "bcrypt"

export default async function handle(req, res) {
    const { method } = req;

    await connectionWithMongoDB();

    if (method == "GET") {
        if (req.query?.id) {
            res.json(await User.findOne({ _id: req.query.id }))
        } else {
            res.json(await User.find());
        }
    }

    if (method == "POST") {
        const { userEmail, userPassword, confirmPassword } = req.body;

        try {
            // Verifica se o email já existe no banco de dados
            const existingUser = await User.findOne({ userEmail });
            if (existingUser) {
                return res.status(400).json({
                    error: "E-mail já está cadastrado."
                });
            }

            // Verifica se as senhas inseridas são iguais
            if (userPassword !== confirmPassword) {
                return res.status(400).json({
                    errorMessage: "As senhas devem ser iguais."
                });
            }

            // Faz o hash da senha do usuário.
            const hashedPassword = await bcrypt.hash(userPassword, 10);
            // Cria um novo usuário no banco de dados.
            await User.create({ userEmail, userPassword: hashedPassword, });
            // Retorna uma mensagem de sucesso caso cadastro seja bem-sucedido
            return res.status(201).json({
                message: 'Usuário cadastrado com sucesso.'
            });
        } catch (error) {
            return res.status(500).json({
                error: 'Erro no servidor.'
            });
        }
    }

    if (method == "PUT") {
        const { userEmail, userPassword, _id } = req.body;
        await User.updateOne({ _id }, { userEmail, userPassword });
        res.json(true);
    }

    if (method == "DELETE") {
        if (req.query?.id) {
            await User.deleteOne({ _id: req.query.id });
            res.json(true)
        }
    }
}