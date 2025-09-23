// const { getAllTrocas, getTrocaById, addTroca, updateTroca, deleteTroca } = require("../models/trocaModel");

// const getAllTrocasHandler = async (req, res) => {
//   try {
//     const trocas = await getAllTrocas();
//     res.status(200).json(trocas);
//   } catch (error) {
//     res.status(500).json({ error: "Erro ao buscar trocas." });
//   }
// };

// const getTrocaByIdHandler = async (req, res) => {
//   const id_troca = Number(req.params.id_troca);
//   try {
//     const troca = await getTrocaById(id_troca);
//     if (!troca) {
//       return res.status(404).json({ error: "Troca não encontrada." });
//     }
//     return res.status(200).json(troca);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Erro ao buscar troca." });
//   }
// };

// const addTrocaHandler = async (req, res) => {
//   const { itemOferecidoId, itemDesejadoId, ofertanteId, receptorId } = req.body;
//   try {
//     const novaTroca = await addTroca(itemOferecidoId, itemDesejadoId, ofertanteId, receptorId);
//     return res.status(201).json(novaTroca);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Erro ao criar troca." });
//   }
// };

// const updateTrocaHandler = async (req, res) => {
//   const id_troca = Number(req.params.id_troca);
//   const { status } = req.body;
//   try {
//     const trocaAtualizada = await updateTroca(id_troca, status);
//     return res.status(200).json(trocaAtualizada);
//   } catch (error) {
//     console.error(error);
//     if (error.message === "Troca não encontrada") {
//       return res.status(404).json({ error: error.message });
//     }
//     return res.status(500).json({ error: "Erro ao atualizar troca." });
//   }
// };

// const deleteTrocaHandler = async (req, res) => {
//   const id_troca = Number(req.params.id_troca);
//   try {
//     await deleteTroca(id_troca);
//     return res.status(204).send();
//   } catch (error) {
//     console.error(error);
//     if (error.message === "Troca não encontrada") {
//       return res.status(404).json({ error: "Troca não encontrada." });
//     }
//     return res.status(500).json({ error: "Erro ao deletar troca." });
//   }
// };

// module.exports = {
//   getAllTrocasHandler,
//   getTrocaByIdHandler,
//   addTrocaHandler,
//   updateTrocaHandler,
//   deleteTrocaHandler,
// };

// trocaController.js - Versão melhorada
const {
  getAllTrocas,
  getTrocaById,
  getTrocasByOfertante,
  getTrocasByReceptor,
  addTroca,
  updateTroca,
  deleteTroca
} = require("../models/trocaModel");

// Importar o modelo de item para validações
const { getItemById } = require("../models/itemModel");

const getAllTrocasHandler = async (req, res) => {
  try {
    const trocas = await getAllTrocas();
    res.status(200).json(trocas);
  } catch (error) {
    console.error("Erro ao buscar trocas:", error);
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
    console.error("Erro ao buscar troca:", error);
    return res.status(500).json({ error: "Erro ao buscar troca." });
  }
};

const getTrocasByOfertanteHandler = async (req, res) => {
  const ofertanteId = Number(req.params.ofertanteId);
  try {
    const trocas = await getTrocasByOfertante(ofertanteId);
    res.status(200).json(trocas);
  } catch (error) {
    console.error("Erro ao buscar trocas do ofertante:", error);
    res.status(500).json({ error: "Erro ao buscar trocas do ofertante." });
  }
};

const getTrocasByReceptorHandler = async (req, res) => {
  const receptorId = Number(req.params.receptorId);
  try {
    const trocas = await getTrocasByReceptor(receptorId);
    res.status(200).json(trocas);
  } catch (error) {
    console.error("Erro ao buscar trocas do receptor:", error);
    res.status(500).json({ error: "Erro ao buscar trocas do receptor." });
  }
};

const addTrocaHandler = async (req, res) => {
  const { itemOferecidoId, itemDesejadoId, ofertanteId, receptorId } = req.body;

  try {
    // Verificar se os itens existem
    const itemOferecido = await getItemById(itemOferecidoId);
    const itemDesejado = await getItemById(itemDesejadoId);

    if (!itemOferecido || !itemDesejado) {
      return res.status(404).json({ error: "Item não encontrado." });
    }

    // Verificar se o ofertante é o dono do item oferecido
    if (itemOferecido.donoId !== ofertanteId) {
      return res.status(403).json({ error: "Você não é o dono do item oferecido." });
    }

    // Verificar se o receptor é o dono do item desejado
    if (itemDesejado.donoId !== receptorId) {
      return res.status(403).json({ error: "O receptor não é o dono do item desejado." });
    }

    // Verificar se não está tentando trocar com ele mesmo
    if (ofertanteId === receptorId) {
      return res.status(400).json({ error: "Não é possível trocar com você mesmo." });
    }

    const novaTroca = await addTroca(itemOferecidoId, itemDesejadoId, ofertanteId, receptorId);
    return res.status(201).json(novaTroca);
  } catch (error) {
    console.error("Erro ao criar troca:", error);

    // Verificar se é um erro de chave estrangeira
    if (error.code === 'P2003') {
      return res.status(400).json({
        error: "Dados inválidos. Verifique se os IDs dos itens e usuários existem."
      });
    }

    return res.status(500).json({ error: "Erro ao criar troca." });
  }
};

const updateTrocaHandler = async (req, res) => {
  const id_troca = Number(req.params.id_troca);
  const { status } = req.body;

  try {
    const troca = await getTrocaById(id_troca);
    if (!troca) {
      return res.status(404).json({ error: "Troca não encontrada." });
    }

    const trocaAtualizada = await updateTroca(id_troca, status);
    return res.status(200).json(trocaAtualizada);
  } catch (error) {
    console.error("Erro ao atualizar troca:", error);
    return res.status(500).json({ error: "Erro ao atualizar troca." });
  }
};

const deleteTrocaHandler = async (req, res) => {
  const id_troca = Number(req.params.id_troca);
  try {
    await deleteTroca(id_troca);
    return res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar troca:", error);
    if (error.message === "Troca não encontrada") {
      return res.status(404).json({ error: "Troca não encontrada." });
    }
    return res.status(500).json({ error: "Erro ao deletar troca." });
  }
};

module.exports = {
  getAllTrocasHandler,
  getTrocaByIdHandler,
  getTrocasByOfertanteHandler,
  getTrocasByReceptorHandler,
  addTrocaHandler,
  updateTrocaHandler,
  deleteTrocaHandler,
};