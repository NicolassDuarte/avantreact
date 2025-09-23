// src/controllers/itemController.js
const {
  getAllItens,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
  getItensByUsuario,
} = require('../models/itemModel');

// GET /items
const getAllItensHandler = async (_req, res) => {
  try {
    const itens = await getAllItens();
    return res.status(200).json(itens);
  } catch (error) {
    console.error('getAllItensHandler error:', error);
    return res.status(500).json({ error: 'Erro ao buscar itens.' });
  }
};

// GET /items/:id_item
const getItemByIdHandler = async (req, res) => {
  try {
    const id_item = Number(req.params.id_item);
    const item = await getItemById(id_item);
    if (!item) return res.status(404).json({ error: 'Item não encontrado.' });
    return res.status(200).json(item);
  } catch (error) {
    console.error('getItemByIdHandler error:', error);
    return res.status(500).json({ error: 'Erro ao buscar item.' });
  }
};

// POST /items  (JSON/base64; se usar multer em OUTRAS rotas, aqui não use .single/.array)
const addItemHandler = async (req, res) => {
  // Logs úteis para depuração
  console.log('content-type:', req.headers['content-type']);
  console.log('keys body:', Object.keys(req.body));

  try {
    let {
      titulo,
      descricao,
      cidade,
      bairro,
      endereco,
      donoId,
      categoriaId,
      imagemUrl, // string | string[]
    } = req.body;

    // Validação essencial (evite 400 genérico)
    const errs = [];
    if (!titulo) errs.push('titulo é obrigatório');
    if (!donoId) errs.push('donoId é obrigatório');
    if (!categoriaId) errs.push('categoriaId é obrigatório');
    if (errs.length) return res.status(422).json({ errors: errs });

    // IDs
    const donoIdNum = Number(donoId);
    const categoriaIdNum = Number(categoriaId);
    if (!Number.isInteger(donoIdNum) || donoIdNum <= 0) {
      return res.status(422).json({ error: 'donoId inválido' });
    }
    if (!Number.isInteger(categoriaIdNum) || categoriaIdNum <= 0) {
      return res.status(422).json({ error: 'categoriaId inválido' });
    }

    // imagemUrl pode chegar como string (quando front usa FormData + JSON.stringify)
    if (typeof imagemUrl === 'string') {
      try { imagemUrl = JSON.parse(imagemUrl); } catch (e) {
        console.log('imagemUrl chegou string não-JSON; mantendo como string');
      }
    }

    // Normaliza para SEMPRE ser array
    let imagens = [];
    if (Array.isArray(imagemUrl)) {
      imagens = imagemUrl.filter(Boolean);
    } else if (typeof imagemUrl === 'string' && imagemUrl.trim() !== '') {
      imagens = [imagemUrl];
    }

    // (Opcional, mas recomendado) Exigir ao menos 1 imagem
    if (imagens.length === 0) {
      return res.status(422).json({ error: 'Envie ao menos 1 imagem em imagemUrl.' });
    }

    // Strings vazias -> null (se Prisma tiver campos opcionais: String?)
    const toNull = (s) => (typeof s === 'string' && s.trim() === '' ? null : s);
    descricao = toNull(descricao);
    cidade = toNull(cidade);
    bairro = toNull(bairro);
    endereco = toNull(endereco);

    // Chama a model (mantenho sua assinatura)
    const novoItem = await addItem(
      titulo,
      descricao,
      cidade,
      bairro,
      endereco,
      imagens,        // <- imagemUrl como array
      donoIdNum,
      categoriaIdNum
    );

    return res.status(201).json(novoItem);
  } catch (error) {
    console.error('addItemHandler error:', error);

    // FK inválida
    if (error.code === 'P2003') {
      return res.status(400).json({
        error: 'Violação de chave estrangeira: verifique se donoId e categoriaId existem.',
      });
    }

    return res.status(500).json({ error: error.message || 'Erro ao adicionar item.' });
  }
};

// PUT /items/:id_item  (substitui a galeria inteira se imagemUrl vier)
const updateItemHandler = async (req, res) => {
  try {
    const id_item = Number(req.params.id_item);

    let {
      titulo,
      descricao,
      cidade,
      bairro,
      endereco,
      imagemUrl, // String | String[] | undefined
      status,    // opcional (enum)
    } = req.body;

    // Normaliza opcionalmente imagemUrl para array (ou undefined para não mexer)
    if (typeof imagemUrl === 'string') {
      try { imagemUrl = JSON.parse(imagemUrl); } catch {/* mantém string */ }
    }
    let imagens = undefined;
    if (Array.isArray(imagemUrl)) {
      imagens = imagemUrl.filter(Boolean);
    } else if (typeof imagemUrl === 'string' && imagemUrl.trim() !== '') {
      imagens = [imagemUrl];
    }

    const toNull = (s) => (typeof s === 'string' && s.trim() === '' ? null : s);

    const itemAtualizado = await updateItem(
      id_item,
      titulo ?? undefined,
      toNull(descricao),
      toNull(cidade),
      toNull(bairro),
      toNull(endereco),
      imagens,     // se undefined, model decide não tocar no campo
      status ?? undefined
    );

    return res.status(200).json(itemAtualizado);
  } catch (error) {
    console.error('updateItemHandler error:', error);

    if (error.message === 'Item não encontrado') {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: error.message || 'Erro ao atualizar item.' });
  }
};

// DELETE /items/:id_item
const deleteItemHandler = async (req, res) => {
  try {
    const id_item = Number(req.params.id_item);
    await deleteItem(id_item);
    return res.status(204).send();
  } catch (error) {
    console.error('deleteItemHandler error:', error);
    if (error.message === 'Item não encontrado') {
      return res.status(404).json({ error: 'Item não encontrado.' });
    }
    return res.status(500).json({ error: 'Erro ao deletar item.' });
  }
};

// GET /items/by-user?userId=123
const getItensByUsuarioHandler = async (req, res) => {
  try {
    const { userId } = req.query;
    const id = Number(userId);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(422).json({ error: 'ID do usuário inválido.' });
    }

    const itens = await getItensByUsuario(id);
    return res.status(200).json(itens);
  } catch (error) {
    console.error('getItensByUsuarioHandler error:', error);
    return res.status(500).json({ error: 'Erro ao buscar itens do usuário.' });
  }
};

module.exports = {
  getAllItensHandler,
  getItemByIdHandler,
  addItemHandler,
  updateItemHandler,
  deleteItemHandler,
  getItensByUsuarioHandler
};