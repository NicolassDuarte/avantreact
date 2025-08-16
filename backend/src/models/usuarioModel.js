const prisma = require("../prisma");

const getAllUsuarios = async () => {
  return prisma.Usuario.findMany({
    orderBy: {
      nome: "DESC",
    },
  });
};
