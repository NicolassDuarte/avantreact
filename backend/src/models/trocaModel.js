// const { PrismaClient } = require("../../generated/prisma");
// const prisma = new PrismaClient();

// const getAllTrocas = async () => {
//   return await prisma.troca.findMany({
//     orderBy: {
//       criadoEm: "desc",
//     },
//   });
// };

// const getTrocaById = async (id_troca) => {
//   return await prisma.troca.findUnique({
//     where: {
//       id_troca: id_troca,
//     },
//   });
// };

// const getTrocasByUsuario = async (id_usuario) => {
//   return await prisma.troca.findMany({
//     where: {
//       id_aluno: id_aluno,
//     },
//   });
// };

// const addTroca = async (
//   itemOferecidoId,
//   itemDesejadoId,
//   ofertanteId,
//   receptorId
// ) => {
//   console.log("Valores recebidos para criar a troca:", {
//     itemOferecidoId,
//     itemDesejadoId,
//     ofertanteId,
//     receptorId,
//   });
//   return prisma.troca.create({
//     data: {
//       itemOferecidoId: itemOferecidoId,
//       itemDesejadoId: itemDesejadoId,
//       ofertanteId: ofertanteId,
//       receptorId: receptorId,
//     },
//   });
// };

// const deleteTroca = async (id_troca) => {
//   const troca = getTrocaById(id_troca);
//   if (!troca) {
//     throw new Error("Troca não encontrada");
//   }
//   return prisma.troca.delete({
//     where: {
//       id_troca: id_troca,
//     },
//   });
// };

// module.exports = {
//   getAllTrocas,
//   getTrocaById,
//   getTrocasByUsuario,
//   addTroca,
//   deleteTroca,
// };

// trocaModel.js - Versão melhorada
const prisma = require('../prisma');

const getAllTrocas = async () => {
  return await prisma.troca.findMany({
    orderBy: {
      criadoEm: "desc",
    },
    include: {
      itemOferecido: {
        include: {
          dono: true,
          categoria: true
        }
      },
      itemDesejado: {
        include: {
          dono: true,
          categoria: true
        }
      },
      ofertante: true,
      receptor: true
    }
  });
};

const getTrocaById = async (id_troca) => {
  return await prisma.troca.findUnique({
    where: {
      id_troca: id_troca,
    },
    include: {
      itemOferecido: {
        include: {
          dono: true,
          categoria: true
        }
      },
      itemDesejado: {
        include: {
          dono: true,
          categoria: true
        }
      },
      ofertante: true,
      receptor: true
    }
  });
};

const getTrocasByOfertante = async (ofertanteId) => {
  return await prisma.troca.findMany({
    where: {
      ofertanteId: ofertanteId,
    },
    include: {
      itemOferecido: {
        include: {
          dono: true,
          categoria: true
        }
      },
      itemDesejado: {
        include: {
          dono: true,
          categoria: true
        }
      },
      ofertante: true,
      receptor: true
    },
    orderBy: {
      criadoEm: "desc"
    }
  });
};

const getTrocasByReceptor = async (receptorId) => {
  return await prisma.troca.findMany({
    where: {
      receptorId: receptorId,
    },
    include: {
      itemOferecido: {
        include: {
          dono: true,
          categoria: true
        }
      },
      itemDesejado: {
        include: {
          dono: true,
          categoria: true
        }
      },
      ofertante: true,
      receptor: true
    },
    orderBy: {
      criadoEm: "desc"
    }
  });
};

const addTroca = async (itemOferecidoId, itemDesejadoId, ofertanteId, receptorId) => {
  return prisma.troca.create({
    data: {
      itemOferecidoId: itemOferecidoId,
      itemDesejadoId: itemDesejadoId,
      ofertanteId: ofertanteId,
      receptorId: receptorId,
    },
    include: {
      itemOferecido: true,
      itemDesejado: true,
      ofertante: true,
      receptor: true
    }
  });
};

const updateTroca = async (id_troca, status) => {
  const troca = await prisma.troca.update({
    where: { id_troca },
    data: { status },
    include: {
      itemOferecido: true,
      itemDesejado: true,
      ofertante: true,
      receptor: true
    }
  });

  // Se a troca foi aceita, marcar os itens como trocados
  if (status === "ACEITA") {
    await prisma.item.update({
      where: { id_item: troca.itemOferecidoId },
      data: { status: "INDISPONIVEL" }
    });

    await prisma.item.update({
      where: { id_item: troca.itemDesejadoId },
      data: { status: "INDISPONIVEL" }
    });
  }

  return troca;
};


const deleteTroca = async (id_troca) => {
  const troca = await getTrocaById(id_troca);
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
  getTrocasByOfertante,
  getTrocasByReceptor,
  addTroca,
  updateTroca,
  deleteTroca,
};