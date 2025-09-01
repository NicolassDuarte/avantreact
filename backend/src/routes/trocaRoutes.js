const express = require('express');
const router = express.Router();
const {
  getAllTrocasHandler,
  getTrocaByIdHandler,
  addTrocaHandler,
  updateTrocaHandler,
  deleteTrocaHandler
} = require('../controllers/trocaController');

router.get('/', getAllTrocasHandler);
router.get('/:id_troca', getTrocaByIdHandler);
router.post('/', addTrocaHandler);
router.put('/:id_troca', updateTrocaHandler);
router.delete('/:id_troca', deleteTrocaHandler);

module.exports = router;
