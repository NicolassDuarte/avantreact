const prisma = require("../prisma");

const getAllCategorias = async () => {
  return await prisma.categoria.findMany({
    orderBy: {
      nome: "asc",
    },
  });
};

const getCategoriaById = async (id_categoria) => {
  return await prisma.categoria.findUnique({
    where: {
      id_categoria: id_categoria,
    },
  });
};

const addCategoria = async (nome) => {
  return await prisma.categoria.create({
    data: {
      nome: nome,
    },
  });
};

const deleteCategoria = async (id_categoria) => {
  const categoria = getCategoriaById(id_categoria);
  if (!categoria) {
    throw new Error("Categoria não encontrada");
  }
  return await prisma.categoria.delete({
    where: {
      id_categoria: id_categoria,
    },
  });
};

const updateCategoria = async (id_categoria, nome, itens) => {
  const categoria = getCategoriaById(id_categoria);
  if (!categoria) {
    throw new Error("Categoria não encontrada");
  }

  return await prisma.categoria.update({
    where: {
      id_categoria: id_categoria,
    },
    data: {
      nome: nome,
      itens: itens,
    },
  });
};

module.exports = {
  getAllCategorias,
  getCategoriaById,
  addCategoria,
  deleteCategoria,
  updateCategoria,
};
