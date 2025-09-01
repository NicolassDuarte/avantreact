const express = require('express')
const router = express.Router()
const {getAllUsuariosHandler,getUsarioByIdHandler,addUsuarioHandler,uppdateUsuarioHandler,deleteUsuarioHandler} = require('../controllers/usuarioController')

router.get('/',getAllUsuariosHandler)
router.get('/:id_usuario',getUsarioByIdHandler)
router.post('/usuarios',addUsuarioHandler)
router.put('/:id_usuario',uppdateUsuarioHandler)
router.delete('/:id_usuario',deleteUsuarioHandler)


module.exports = router