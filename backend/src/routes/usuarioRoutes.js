const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware'); // Importe o middleware

const {
    getAllUsuariosHandler,
    getUsuarioByIdHandler,
    getUsuarioProfileHandler, // Novo handler para perfil do usuário logado
    updateUsuarioHandler,
    deleteUsuarioHandler
} = require('../controllers/usuarioController');

// Rota pública - listar usuários (se necessário)
router.get('/', getAllUsuariosHandler);

// Rota protegida - perfil do usuário logado
router.get('/profile', authMiddleware, getUsuarioProfileHandler);

// Rotas protegidas - operações específicas por ID
router.get('/:id_usuario', authMiddleware, getUsuarioByIdHandler);
router.put('/:id_usuario', authMiddleware, updateUsuarioHandler);
router.delete('/:id_usuario', authMiddleware, deleteUsuarioHandler);

module.exports = router;