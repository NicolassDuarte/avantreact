const express = require('express')
const {getAllCategoriasTotais,getCategoriaByIdHandler,createCategoriaHandler,deleteCategoriaHandler,updateCategoriaHandler} = require('../controllers/categoriaController')
const router = express.Router()


router.get("/", getAllCategoriasTotais); 
router.get("/:id_categoria", getCategoriaByIdHandler); 

// ROTAS DE ADM
router.post("/", createCategoriaHandler); 
router.delete("/:id_categoria", deleteCategoriaHandler); 
router.put("/:id_categoria", updateCategoriaHandler); 

module.exports = router