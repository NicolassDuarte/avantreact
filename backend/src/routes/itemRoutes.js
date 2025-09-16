const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const {
  getAllItensHandler,
  getItemByIdHandler,
  addItemHandler,
  updateItemHandler,
  deleteItemHandler,
  getItensByUsuarioHandler
} = require('../controllers/itemController');

router.get('/', getAllItensHandler);
router.get('/meus-itens', getItensByUsuarioHandler);
router.get('/:id_item', getItemByIdHandler);

// Aqui usamos upload.single('imagem') para 1 arquivo (campo do form "imagem")
router.post('/', upload.single('imagem'), addItemHandler);

router.put('/:id_item', updateItemHandler);
router.delete('/:id_item', deleteItemHandler);

module.exports = router;
