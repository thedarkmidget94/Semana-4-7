const models = require('../models');
const bcrypt = require('bcryptjs');
const tokenServices = require('../services/token.js');

exports.login = async (req, res, next) => {
    try{
        const usuario = await models.Usuarios.findOne({where: {email: req.body.email}});
        if(usuario){
            const passwordIsValid = bcrypt.compareSync(req.body.password, usuario.password);
            if(passwordIsValid){
                const token = await tokenServices.encode(usuario);
                res.status(200).send({
                    auth: true, 
                    user: usuario,
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

exports.list = async(req, res, next) => {
    try{
        const usuario = await models.Usuarios.findAll();
        if(usuario){
            res.status(200).json(usuario);
        }else{
            res.status(404).send({
                message: 'La categoria no existe en el sistema.'
            })
        }
    }catch(error){
        res.status(500).send({
            message: "¡Error!"
        });
        next(error);
    }
};

exports.add = async (req, res, next) => {
    try{
        const usuario = await models.Usuarios.findOne({where: {email: req.body.email}});
        if(usuario){
            res.status(409).send({
                message: 'Existe un conflicto en el sistema. Puede que este usuario ya exista.'
            })
        }else{
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const usuario = await models.Usuarios.create(req.body);
            res.status(200).json(usuario);
        }
            
    }catch(error){
        res.status(500).send({
            message: "¡Error!"
        });
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try{
        const usuario = await models.Usuarios.update({nombre: req.body.nombre, rol: req.body.descripcion},
            { 
            where: {
                    id: req.body.id
                },
            });
            res.status(200).json(usuario);               
    }catch(error){
        res.status(500).send({
            message: "¡Error!"
        });
        next(error);
    }
};

exports.activate = async (req, res, next) => {
    try{
        const usuario = await models.Usuarios.update({estado: 1},
            { 
            where: {
                    id: req.body.id
                },
            });
            res.status(200).json(usuario);               
    }catch(error){
        res.status(500).send({
            message: "¡Error!"
        });
        next(error);
    }
};

exports.deactivate = async (req, res, next) => {
    try{
        const usuario = await models.Usuarios.update({estado: 0},
            { 
            where: {
                    id: req.body.id
                },
            });
            res.status(200).json(usuario);               
    }catch(error){
        res.status(500).send({
            message: "¡Error!"
        });
        next(error);
    }
};
