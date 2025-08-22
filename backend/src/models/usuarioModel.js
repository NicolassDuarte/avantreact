const prisma = require("../prisma");

const getAllUsuarios = async () => {
  return prisma.usuario.findMany({
    orderBy: {
      nome: "DESC",
    },
  });
};

const getUsuarioById = async (id_usuario) => {
  return prisma.usuario.findUnique({
    where: {
      id_usuario: id_usuario,
    },
  });
};

const addUsuario = async (nome, email) => {
  return prisma.usuario.create({
    data: {
      nome: nome,
      email: email,
    },
  });
};

const updateUsuario = async (id_usuario, nome, email) => {
  const usuario = await getUsuarioById(id_usuario);

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  return prisma.usuario.update({
    where: {
      id_usuario: id_usuario,
    },
    data: {
      nome: nome,
      email: email,
    },
  });
};

const deleteUsuario = async (id_usuario) => {
  const usuario = await getUsuarioById(id_usuario);

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  return prisma.usuario.delete({
    where: {
      id_usuario: id_usuario,
    },
  });
};

module.exports = {
  getAllUsuarios,
  getUsuarioById,
  addUsuario,
  updateUsuario,
  deleteUsuario,
};
