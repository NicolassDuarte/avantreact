// const { PrismaClient } = require("../../generated/prisma");
// const { PrismaClient } = require("@prisma/client");
const prisma = require("../prisma"); // usa a instância única
const bcrypt = require("bcryptjs");

// const prisma = new PrismaClient()

const getAllUsuarios = async () => {
  return prisma.usuario.findMany({
    orderBy: {
      nome: "desc",
    },
  });
};

const getUsuarioById = async (id_usuario) => {
  return prisma.usuario.findUnique({
    where: { id_usuario }
  });
};

const getUsuarioByEmail = async (email) => {
  return prisma.usuario.findUnique({
    where: { email }
  });
};

const addUsuario = async (nome, email, senha) => {
  const hashedPassword = await bcrypt.hash(senha, 10);

  return prisma.usuario.create({
    data: {
      nome: nome,
      email: email,
      senha: hashedPassword,
    },
  });
};

const updateUsuario = async (id_usuario, nome, email, senha) => {
  const usuario = await getUsuarioById(id_usuario);

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  let hashedPassword = usuario.senha;
  if (senha) {
    hashedPassword = await bcrypt.hash(senha, 10);
  }

  return prisma.usuario.update({
    where: { id_usuario },
    data: {
      nome: nome,
      email: email,
      senha: hashedPassword,
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
  getUsuarioByEmail,
  addUsuario,
  updateUsuario,
  deleteUsuario
};