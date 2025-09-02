const { PrismaClient } = require("../../generated/prisma");
const prisma = new PrismaClient();

const getAllTrocas = async () => {
  return await prisma.troca.findMany({
    orderBy: {
      criadoEm: "desc",
    },
  });
};

const getTrocaById = async (id_troca) => {
  return await prisma.troca.findUnique({
    where: {
      id_troca: id_troca,
    },
  });
};

const getTrocasByUsuario = async (id_usuario) => {
  return await prisma.troca.findMany({
    where: {
      id_aluno: id_aluno,
    },
  });
};

const addTroca = async (
  itemOferecidoId,
  itemDesejadoId,
  ofertanteId,
  receptorId
) => {
  console.log("Valores recebidos para criar a troca:", {
    itemOferecidoId,
    itemDesejadoId,
    ofertanteId,
    receptorId,
  });
  return prisma.troca.create({
    data: {
      itemOferecidoId: itemOferecidoId,
      itemDesejadoId: itemDesejadoId,
      ofertanteId: ofertanteId,
      receptorId: receptorId,
    },
  });
};

const deleteTroca = async (id_troca) => {
  const troca = getTrocaById(id_troca);
  if (!troca) {
    throw new Error("Troca não encontrada");
  }
  return prisma.troca.delete({
    where: {
      id_troca: id_troca,
    },
  });
};

module.exports = {
  getAllTrocas,
  getTrocaById,
  getTrocasByUsuario,
  addTroca,
  deleteTroca,
};
