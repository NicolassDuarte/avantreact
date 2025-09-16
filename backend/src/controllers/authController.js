const { getUsuarioByEmail, addUsuario } = require('../models/usuarioModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRegister = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        const userExists = await getUsuarioByEmail(email);
        if (userExists) {
            return res.status(400).json({ error: "E-mail já cadastrado" });
        }

        const newUser = await addUsuario(nome, email, senha);

        // Não retornar a senha na resposta
        const { senha: _, ...userWithoutPassword } = newUser;

        res.status(201).json({
            message: "Usuário cadastrado com sucesso",
            user: userWithoutPassword
        });
    } catch (error) {
        console.error("Erro no registro:", error);
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const user = await getUsuarioByEmail(email);
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        const validPassword = await bcrypt.compare(senha, user.senha);
        if (!validPassword) {
            return res.status(401).json({ error: "Senha inválida" });
        }

        const token = jwt.sign(
            {
                id_usuario: user.id_usuario,
                email: user.email,
                nome: user.nome
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Não retornar a senha na resposta
        const { senha: _, ...userWithoutPassword } = user;

        res.json({
            message: "Login realizado com sucesso",
            token,
            user: userWithoutPassword
        });
    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    userRegister,
    userLogin
}