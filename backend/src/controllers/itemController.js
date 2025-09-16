const {
  getAllItens,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
  getItensByUsuario,
} = require("../models/itemModel");

const getAllItensHandler = async (req, res) => {
  try {
    const itens = await getAllItens();
    res.status(200).json(itens);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar itens." });
  }
};

const getItemByIdHandler = async (req, res) => {
  const id_item = Number(req.params.id_item);
  try {
    const item = await getItemById(id_item);
    if (!item) {
      return res.status(404).json({ error: "Item não encontrado." });
    }
    return res.status(200).json(item);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar item." });
  }
};

const addItemHandler = async (req, res) => {
  const {
    titulo,
    descricao,
    cidade,
    bairro,
    endereco,
    imagemUrl,
    donoId,
    categoriaId,
  } = req.body;
  try {
    const novoItem = await addItem(
      titulo,
      descricao,
      cidade,
      bairro,
      endereco,
      imagemUrl,
      donoId,
      categoriaId
    );
    return res.status(201).json(novoItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao adicionar item." });
  }
};

const updateItemHandler = async (req, res) => {
  const id_item = Number(req.params.id_item);
  const { titulo, descricao, cidade, bairro, endereco, imagemUrl, status } =
    req.body;
  try {
    const itemAtualizado = await updateItem(
      id_item,
      titulo,
      descricao,
      cidade,
      bairro,
      endereco,
      imagemUrl,
      status
    );
    return res.status(200).json(itemAtualizado);
  } catch (error) {
    console.error(error);
    if (error.message === "Item não encontrado") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erro ao atualizar item." });
  }
};

const deleteItemHandler = async (req, res) => {
  const id_item = Number(req.params.id_item);
  try {
    await deleteItem(id_item);
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    if (error.message === "Item não encontrado") {
      return res.status(404).json({ error: "Item não encontrado." });
    }
    return res.status(500).json({ error: "Erro ao deletar item." });
  }
};

const getItensByUsuarioHandler = async (req, res) => {
  try {
    const { userId } = req.query; // vai vir da URL ?userId=123
    if (!userId) {
      return res.status(400).json({ error: "ID do usuário não informado." });
    }

    const itens = await getItensByUsuario(Number(userId));
    return res.status(200).json(itens);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar itens do usuário." });
  }
};

const addItemHandler = async (req, res) => {
  const {
    titulo,
    descricao,
    cidade,
    bairro,
    endereco,
    donoId,
    categoriaId,
  } = req.body;

  try {
    // Se o usuário enviou imagem, o Multer vai colocar em req.file
    let imagemUrl = null;
    if (req.file) {
      imagemUrl = `/uploads/itens/${req.file.filename}`; // caminho relativo
    }

    const novoItem = await addItem(
      titulo,
      descricao,
      cidade,
      bairro,
      endereco,
      imagemUrl,
      donoId,
      categoriaId
    );

    return res.status(201).json(novoItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao adicionar item." });
  }
};


module.exports = {
  getAllItensHandler,
  getItemByIdHandler,
  addItemHandler,
  updateItemHandler,
  deleteItemHandler,
  getItensByUsuarioHandler,
  addItemHandler
};
