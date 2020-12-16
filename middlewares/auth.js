const tokenServices = require('../services/token.js');

module.exports = {
    verificarAdministrador: async(req, res, next) => {
        if(!req.headers.token){
            return res.status(404).send({
                message: 'Token no encontrado'
            });
        }else{
            const validationResponse = await tokenServices.decode(req.headers.token);
            if(validationResponse.rol === 'Administrador'){
                next();
            }else{
                return res.status(403).send({
                    message: 'No autorizado'
                });
            }
        }
    },

    verificarVendedor: async(req, res, next) => {
        if(!req.headers.token){
            return res.status(404).send({
                message: 'Token no encontrado'
            });
        }else{
            const validationResponse = await tokenServices.decode(req.headers.token);
            if(validationResponse.rol === 'Administrador' || validationResponse.rol === 'Vendedor'){
                next();
            }else{
                return res.status(403).send({
                    message: 'No autorizado'
                });
            }
        }
    }
}