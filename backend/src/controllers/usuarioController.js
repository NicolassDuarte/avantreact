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

const updateUsuarioHandler = async (req, res) => {
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

// Novo handler para obter perfil do usuário logado
const getUsuarioProfileHandler = async (req, res) => {
  try {
    const user_id = req.user.user_id; // Obtido do token JWT
    const usuario = await getUsuarioById(user_id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Não retornar a senha
    const { senha, ...usuarioSemSenha } = usuario;
    res.json(usuarioSemSenha);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUsuarioSenhaHandler = async (req, res) => {
  const id_usuario = Number.parseInt(req.params.id_usuario);
  const { senhaAtual, novaSenha } = req.body;

  try {
    // Buscar usuário
    const usuario = await getUsuarioById(id_usuario);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Verificar senha atual
    const bcrypt = require('bcryptjs');
    const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ error: "Senha atual incorreta" });
    }

    // Atualizar senha
    const usuarioAtualizado = await updateUsuario(
      id_usuario,
      usuario.nome,
      usuario.email,
      novaSenha
    );

    // Não retornar a senha
    const { senha, ...usuarioSemSenha } = usuarioAtualizado;
    return res.status(200).json(usuarioSemSenha);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao atualizar senha" });
  }
};

// Adicione esta exportação
module.exports = {
  getAllUsuariosHandler,
  getUsuarioByIdHandler,
  getUsuarioProfileHandler, // Nova exportação
  addUsuarioHandler,
  updateUsuarioHandler,
  deleteUsuarioHandler,
  updateUsuarioSenhaHandler
};