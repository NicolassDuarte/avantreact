const { getItensDisponiveisByUsuario } = require("../models/trocaModel");

const getItensParaTrocaHandler = async (req, res) => {
    try {
        const userId = req.userId; // Do middleware de autenticação
        const itens = await getItensDisponiveisByUsuario(userId);
        res.status(200).json(itens);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar itens para troca." });
    }
};

module.exports = {
    getItensParaTrocaHandler
};