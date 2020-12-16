const jwt = require('jsonwebtoken');
const models = require('../models');

const checkToken = async(token) =>{
    let localID = null;

    try{
         const {id} = await token.decode(token);
         localID = id;
    }catch(error){
        return false;
    }

    const user = await models.Usuarios.findOne({where: {
        id : localID,
        estado : 1
    }});

    if(user){
        const token = encode(user);
        return token;
    }else{
        return false;
    }
}
module.exports = {

    encode: (user) => {
        const token = jwt.sign({
            id: user.id,
            nombre: user.name,
            email: user.email,
            rol: user.rol,
        }, 'UnaFraseSecretaParaCodificar', {
            expiresIn: 86400 //24 horas
        });
        return token;
    },

    decode: async(token) => {
        try{
            const {id} = await jwt.verify(token, 'UnaFraseSecretaParaCodificar');
            const user = await models.Usuarios.findOne({where: {
                id : id,
                estado : 1
            }})
            if(user){
                return user;
            }else{
                return false;
            }
        }catch(error){
            const newToken = await checkToken(token);
            return newToken;
        }
    } 
}