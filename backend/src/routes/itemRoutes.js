const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // caminho do arquivo acima
const authMiddleware = require('../middlewares/authMiddleware'); // 
const {
  getAllItensHandler,
  getItemByIdHandler,
  addItemHandler,
  updateItemHandler,
  deleteItemHandler,
  getItensByUsuarioHandler
} = require('../controllers/itemController');

// Rotas
router.get('/', getAllItensHandler);
router.get('/meus-itens', getItensByUsuarioHandler);
router.get('/:id_item', getItemByIdHandler);

// Aqui usamos o middleware do Multer
router.post('/', upload.single('imagem'), addItemHandler);

router.put('/:id_item', updateItemHandler);
router.delete('/:id_item', deleteItemHandler);

module.exports = router;
