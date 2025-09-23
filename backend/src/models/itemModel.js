const prisma = require('../prisma');
/**
 * Lista todos os itens com dono e categoria
 */
const getAllItens = async () => {
  return prisma.item.findMany({
    include: { dono: true, categoria: true },
    orderBy: { criadoEm: 'desc' },
  });
};

/**
 * Lista itens por usuário (dono)
 */
const getItensByUsuario = async (donoId) => {
  return prisma.item.findMany({
    where: { donoId: Number(donoId) },
    include: { dono: true, categoria: true },
    orderBy: { criadoEm: 'desc' },
  });
};

/**
 * Busca item por ID
 */
const getItemById = async (id_item) => {
  return prisma.item.findUnique({
    where: { id_item: Number(id_item) },
    include: { dono: true, categoria: true },
  });
};

/**
 * Cria item (usa connect para FK)
 */
const addItem = async (
  titulo,
  descricao,
  cidade,
  bairro,
  endereco,
  imagemUrlArray,
  donoId,
  categoriaId
) => {
  // validações de ID
  if (!Number.isInteger(donoId) || donoId <= 0) {
    throw new Error('donoId inválido.');
  }
  if (!Number.isInteger(categoriaId) || categoriaId <= 0) {
    throw new Error('categoriaId inválido.');
  }

  // checar existência de usuário e categoria
  const [userExists, catExists] = await Promise.all([
    prisma.usuario.findUnique({ where: { id_usuario: donoId } }),
    prisma.categoria.findUnique({ where: { id_categoria: categoriaId } }),
  ]);
  if (!userExists) throw new Error(`Usuário (id=${donoId}) não encontrado.`);
  if (!catExists) throw new Error(`Categoria (id=${categoriaId}) não encontrada.`);

  // normalizar imagens
  const imagens =
    Array.isArray(imagemUrlArray)
      ? imagemUrlArray.filter(Boolean)
      : typeof imagemUrlArray === 'string' && imagemUrlArray.trim() !== ''
        ? [imagemUrlArray]
        : [];

  return prisma.item.create({
    data: {
      titulo,
      descricao,
      cidade,
      bairro,
      endereco,
      imagemUrl: imagens,
      dono: { connect: { id_usuario: donoId } },
      categoria: { connect: { id_categoria: categoriaId } },
    },
    include: { dono: true, categoria: true },
  });
};

/**
 * Atualiza item (campos opcionais)
 */
const updateItem = async (
  id_item,
  titulo,
  descricao,
  cidade,
  bairro,
  endereco,
  imagemUrl, // pode ser String | String[]
  status // opcional (enum)
) => {
  const idNum = Number(id_item);
  const item = await getItemById(idNum);
  if (!item) throw new Error('Item não encontrado');

  // normalizar imagens (se vier)
  let imagensUpdate;
  if (typeof imagemUrl !== 'undefined') {
    imagensUpdate = Array.isArray(imagemUrl)
      ? imagemUrl.filter(Boolean)
      : typeof imagemUrl === 'string' && imagemUrl.trim() !== ''
        ? [imagemUrl]
        : [];
  }

  // montar objeto de updates somente com campos presentes
  const data = {};
  if (typeof titulo === 'string') data.titulo = titulo;
  if (typeof descricao === 'string') data.descricao = descricao;
  if (typeof cidade === 'string') data.cidade = cidade;
  if (typeof bairro === 'string') data.bairro = bairro;
  if (typeof endereco === 'string') data.endereco = endereco;
  if (typeof imagensUpdate !== 'undefined') data.imagemUrl = imagensUpdate;
  if (typeof status === 'string') data.status = status; // Prisma validará o enum

  return prisma.item.update({
    where: { id_item: idNum },
    data,
    include: { dono: true, categoria: true },
  });
};

/**
 * Deleta item por ID
 */
const deleteItem = async (id_item) => {
  const idNum = Number(id_item);
  const item = await getItemById(idNum);
  if (!item) throw new Error('Item não encontrado');

  return prisma.item.delete({ where: { id_item: idNum } });
};

module.exports = {
  getAllItens,
  getItensByUsuario,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
  prisma, // exporta se precisar usar em seeds/outros
};