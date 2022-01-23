import { check } from "express-validator";
import { validarCampos, validarJWT } from "../middlewares/index";

// const { validarCampos, validarJWT } = require('../middlewares/');

// const client = new OAuth2Client( process.env.GOOGLE_CLIENTID );

/**
 * Este método obtiene los datos del usuario de google
 * @param {String} idToken 
 * @returns 
 */
// const googleVerify = async( idToken = '' ) => {

//     const ticket = await client.verifyIdToken({
//         idToken,
//         audience: process.env.GOOGLE_CLIENTID
//     });

//     const {
//         given_name: nombres,
//         family_name: apellidos,
//         email: correo,
//         picture: img
//     } = ticket.getPayload();
    
//     return { nombres, apellidos, correo, img };
// }

const validatorsLogin = [
    check('correo', 'El correo no es válido.').isEmail(),
    check('pwd', 'La contraseña debe tener al menos 8 caracteres.').isLength({ min: 8 }),
    validarCampos
];

const validatorsLogout = [
    validarJWT,
    validarCampos
];

// const validatorsPrimerLogin = [
//     validarJWT,
//     validarCampos
// ];

// const validatorsSignGoogle = [
//     check('google_token', 'El token de Google es necesario para autenticarte con tu cuenta de Google.').notEmpty(),
//     validarCampos
// ];

export = {
    validatorsLogin,
    validatorsLogout
}