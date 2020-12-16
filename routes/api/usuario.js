const router = require('express').Router();
const UsuarioController = require('../../controllers/UsuarioController.js');
const auth = require('../../middlewares/auth.js');

router.post('/login', UsuarioController.login);

router.post('/register', auth.verificarAdministrador, UsuarioController.register);

router.get('/list', auth.verificarVendedor, UsuarioController.list);

module.exports = router;