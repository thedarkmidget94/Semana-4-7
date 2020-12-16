const router = require('express').Router();
const UsuarioController = require('../../controllers/UsuarioController.js');
const auth = require('../../middlewares/auth.js');

router.post('/login', UsuarioController.login);

router.get('/list', UsuarioController.list);

router.post('/add', UsuarioController.add);

router.put('/update', auth.verificarAdministrador, UsuarioController.update);

router.put('/activate', auth.verificarAdministrador, UsuarioController.activate);

router.put('/deactivate', auth.verificarAdministrador, UsuarioController.deactivate);


//router.post('/register', auth.verificarAdministrador, UsuarioController.register);

module.exports = router;