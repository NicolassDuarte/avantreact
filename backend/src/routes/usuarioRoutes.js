const express = require('express')
const router = express.Router()
const {getAllUsuariosHandler,getUsuarioByIdHandler,addUsuarioHandler,uppdateUsuarioHandler,deleteUsuarioHandler} = require('../controllers/usuarioController')

router.get('/',getAllUsuariosHandler)
router.get('/:id_usuario',getUsuarioByIdHandler)
router.post('/',addUsuarioHandler)
router.put('/:id_usuario',uppdateUsuarioHandler)
router.delete('/:id_usuario',deleteUsuarioHandler)


module.exports = router