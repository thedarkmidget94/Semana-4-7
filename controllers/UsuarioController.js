const models = require('../models');
const bcrypt = require('bcryptjs');
const tokenServices = require('../services/token.js');

exports.login = async (req, res, next) => {
    try{
        const user = await models.Usuarios.findOne({where: {email: req.body.email}});
        if(user){
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if(passwordIsValid){
                const token = await tokenServices.encode(user);
                res.status(200).send({
                    auth: true, 
                    user: user,
                    tokenReturn: token,
                })
            }else{
                res.status(401).json({
                    error: 'Error en usuario o contraseña.'
                });
            }
        }else{
            res.status(404).json({
                error: 'El usuario no existe en el sistema.'
            });
        }
    }catch(error){
        res.status(500).send({
            message: "¡Error!"
        });
        next(error);
    }
};

exports.register = async (req, res, next) => {
    try{
        const user = await models.Usuarios.findOne({where: {email: req.body.email}});
        if(user){
            res.status(409).send({
                message: 'Existe un conflicto en el sistema. Puede que este usuario ya exista.'
            })
        }else{
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const user = await models.Usuarios.create(req.body);
            res.status(200).json(user);
        }
            
    }catch(error){
        res.status(500).send({
            message: "¡Error!"
        });
        next(error);
    }
};

exports.list = async(req, res, next) => {
    try{
        const user = await models.Usuarios.findAll();
        if(user){
            res.status(200).json(user);
        }else{
            res.status(404).send({
                message: 'El usuario no existe en el sistema.'
            })
        }
    }catch(error){
        res.status(500).send({
            message: "¡Error!"
        });
        next(error);
    }
};