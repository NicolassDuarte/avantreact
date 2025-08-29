const express = require('require')
const router = express.Router()
const {getAllCategoriasTotais,getCategoriaByIdHandler,createCategoriaHandler,deleteCategoriaHandler,updateCategoriaHandler} = require('../controllers/categoriaController')

router.get("/", getAllCategoriasTotais); 
router.get("/:id_categoria", getCategoriaByIdHandler); 

// ROTAS DE ADM
router.post("/", createCategoriaHandler); 
router.delete("/:nome", deleteCategoriaHandler); 
router.put("/:id_categoria", updateCategoriaHandler); 

module.exports = router