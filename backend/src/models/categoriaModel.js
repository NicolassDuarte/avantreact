const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient()


const getAllCategorias = async () => {
  return await prisma.categoria.findMany({
    orderBy: {
      nome: "asc",
    },
  });
};

const getCategoriaById = async (id_categoria) => {
  console.log("ID recebido no model:", id_categoria); // debug
  return await prisma.categoria.findUnique({
    where: { id_categoria: parseInt(id_categoria) },
    include: { itens: true }
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
  const categoria = await prisma.categoria.findUnique({
    where: { id_categoria: parseInt(id_categoria) }
  });
  if (!categoria) {
    return null; 
  }
  await prisma.categoria.delete({
    where: { id_categoria: parseInt(id_categoria) }
  });
  return categoria; 
};

const updateCategoria = async (id_categoria, nome) => {
  const categoria = await prisma.categoria.findUnique({
    where: { id_categoria },
  });

  if (!categoria) {
    throw new Error("Categoria não encontrada");
  }

  return await prisma.categoria.update({
    where: { id_categoria },
    data: {
      nome: nome,
    },
    include: { itens: true }, 
  });
};


module.exports = {
  getAllCategorias,
  getCategoriaById,
  addCategoria,
  deleteCategoria,
  updateCategoria
};
