const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

const getAllItens = async () => {
  return prisma.item.findMany({
    include: {
      dono: true,       // inclui o usuário que é dono
      categoria: true,  // inclui a categoria
    },
    orderBy: {
      criadoEm: "desc",
    },
  });
};

const getItensByUsuario = async (donoId) => {
  return await prisma.item.findMany({
    where: {
      donoId: Number(donoId),
    },
    orderBy: {
      criadoEm: "desc",
    },
  });
};

const getItemById = async (id_item) => {
  return await prisma.item.findUnique({
    where: {
      id_item: Number(id_item),
    },
    include: {
      dono: true,       // pega os dados do usuário dono
      categoria: true,  // pega os dados da categoria
    },
  });
};

const addItem = async (
  titulo,
  descricao,
  cidade,
  bairro,
  endereco,
  imagemUrl,
  donoId,
  categoriaId
) => {
  return await prisma.item.create({
    data: {
      titulo: titulo,
      descricao: descricao,
      cidade: cidade,
      bairro: bairro,
      endereco: endereco,
      imagemUrl: imagemUrl,
      donoId: donoId,
      categoriaId: categoriaId,
    },
  });
};

const updateItem = async (id_item, titulo, descricao, imagemUrl) => {
  const item = await getItemById(id_item);

  if (!item) {
    throw new Error("Item não encontrado");
  }

  return prisma.item.update({
    where: {
      id_item: id_item,
    },
    data: {
      titulo: titulo,
      descricao: descricao,
      imagemUrl: imagemUrl,
    },
  });
};

const deleteItem = async (id_item) => {
  const item = await getItemById(id_item);

  if (!item) {
    throw new Error("Item não encontrado");
  }

  return prisma.item.delete({
    where: {
      id_item: id_item,
    },
  });
};

module.exports = {
  getAllItens,
  getItensByUsuario,
  getItemById,
  addItem,
  updateItem,
  deleteItem,
};
