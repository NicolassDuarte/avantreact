// const express = require('express');
// const router = express.Router();
// const {
//   getAllTrocasHandler,
//   getTrocaByIdHandler,
//   addTrocaHandler,
//   updateTrocaHandler,
//   deleteTrocaHandler
// } = require('../controllers/trocaController');

// router.get('/', getAllTrocasHandler);
// router.get('/:id_troca', getTrocaByIdHandler);
// router.post('/', addTrocaHandler);
// router.put('/:id_troca', updateTrocaHandler);
// router.delete('/:id_troca', deleteTrocaHandler);

// module.exports = router;

// trocaRoutes.js - Versão melhorada
const express = require('express');
const router = express.Router();
const {
  getAllTrocasHandler,
  getTrocaByIdHandler,
  getTrocasByOfertanteHandler,
  getTrocasByReceptorHandler,
  addTrocaHandler,
  updateTrocaHandler,
  deleteTrocaHandler
} = require('../controllers/trocaController');

router.get('/', getAllTrocasHandler);
router.get('/ofertante/:ofertanteId', getTrocasByOfertanteHandler);
router.get('/receptor/:receptorId', getTrocasByReceptorHandler);
router.get('/:id_troca', getTrocaByIdHandler);
router.post('/', addTrocaHandler);
router.put('/:id_troca', updateTrocaHandler);
router.delete('/:id_troca', deleteTrocaHandler);

module.exports = router;