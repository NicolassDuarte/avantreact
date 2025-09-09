const {
  getAllUsuarios,
  getUsuarioById,
  addUsuario,
  updateUsuario,
  deleteUsuario,
} = require("../models/usuarioModel");

const getAllUsuariosHandler = async (req, res) => {
  try {
    const usuarios = await getAllUsuarios();
    return res.status(200).json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error ao buscar usuarios" });
  }
};

const getUsuarioByIdHandler = async (req, res) => {
  const id_usuario = Number.parseInt(req.params.id_usuario, 10);
  try {
    const usuario = await getUsuarioById(id_usuario);
    if (!usuario) {
      return res.status(400).json({ error: "Usuario não encontrado" });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ error: "Usuario não encontrado" });
  }
};

const addUsuarioHandler = async (req, res) => {
  const { nome, email, senha } = req.body;
  try {
    const novousuario = await addUsuario(nome, email, senha);
    return res.status(201).json(novousuario);
  } catch (error) {
    console.error("Erro ao criar usuário:", error); // log completo
    if (error.code === "P2002") {
      return res.status(400).json({ error: "Usuário já existe com este email" });
    }
    return res.status(500).json({ error: error.message || "Erro ao criar usuário" });
  }

};

const uppdateUsuarioHandler = async (req, res) => {
  const id_usuario = Number.parseInt(req.params.id_usuario);
  const { nome, email, senha } = req.body;
  try {
    const usuarioAtualizado = await updateUsuario(
      Number(id_usuario),
      nome,
      email,
      senha
    );
    return res.status(200).json(usuarioAtualizado);
  } catch (error) {
    console.log(error);
    if (error.message === "Usuário não encontrado") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: "Error ao atualizar usuario" });
  }
};

const deleteUsuarioHandler = async (req, res) => {
  const id_usuario = parseInt(req.params.id_usuario);
  try {
    await deleteUsuario(id_usuario);
    return res.status(204).send();
  } catch (error) {
    if (error.message === "Usuário não encontrado") {
      return res.status(500).json({ error: "Usuário não encontrado!" });
    }
    return res.status(500).json({ error: "Erro ao deletar Usuário!" });
  }
};

module.exports = {
  getAllUsuariosHandler,
  getUsuarioByIdHandler,
  addUsuarioHandler,
  uppdateUsuarioHandler,
  deleteUsuarioHandler,
};
