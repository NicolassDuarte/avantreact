const { getAllTrocas, getTrocaById, addTroca, updateTroca, deleteTroca } = require("../models/trocaModel");

const getAllTrocasHandler = async (req, res) => {
  try {
    const trocas = await getAllTrocas();
    res.status(200).json(trocas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar trocas." });
  }
};

const getTrocaByIdHandler = async (req, res) => {
  const id_troca = Number(req.params.id_troca);
  try {
    const troca = await getTrocaById(id_troca);
    if (!troca) {
      return res.status(404).json({ error: "Troca não encontrada." });
    }
    return res.status(200).json(troca);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar troca." });
  }
};

const addTrocaHandler = async (req, res) => {
  const { itemOferecidoId, itemDesejadoId, ofertanteId, receptorId } = req.body;
  try {
    const novaTroca = await addTroca(itemOferecidoId, itemDesejadoId, ofertanteId, receptorId);
    return res.status(201).json(novaTroca);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao criar troca." });
  }
};

const updateTrocaHandler = async (req, res) => {
  const id_troca = Number(req.params.id_troca);
  const { status } = req.body;
  try {
    const trocaAtualizada = await updateTroca(id_troca, status);
    return res.status(200).json(trocaAtualizada);
  } catch (error) {
    console.error(error);
    if (error.message === "Troca não encontrada") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erro ao atualizar troca." });
  }
};

const deleteTrocaHandler = async (req, res) => {
  const id_troca = Number(req.params.id_troca);
  try {
    await deleteTroca(id_troca);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.message === "Troca não encontrada") {
      return res.status(404).json({ error: "Troca não encontrada." });
    }
    return res.status(500).json({ error: "Erro ao deletar troca." });
  }
};

module.exports = {
  getAllTrocasHandler,
  getTrocaByIdHandler,
  addTrocaHandler,
  updateTrocaHandler,
  deleteTrocaHandler,
};
