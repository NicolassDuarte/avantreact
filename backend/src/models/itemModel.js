const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

const getAllItens = async () => {
  return prisma.item.findMany({
    orderBy: {
      criadoEm: "desc",
    },
  });
};

const getItensByUsuario = async (id_aluno) => {
  return await prisma.item.findMany({
    where: {
      id_aluno: id_aluno,
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
