import { validarCampos } from './../middlewares/validar-campos';
import { esAdminRol } from './../middlewares/valida-rol';
import { validarJWT } from './../middlewares/valida-jwt';
import { check } from 'express-validator';

const validatorCrearUsuario = [
    check('nombres', 'El nombre es obligatorio.').notEmpty(),
    check('apellidos', 'El apellido es obligatorio.').notEmpty(),
    check('correo', 'El correo no es válido.').isEmail(),
    check('pwd', 'La contraseña debe tener al menos 8 caracteres.').isLength({ min: 8 }),
    check('rolid', 'El rol no es válido.').isNumeric(),
    validarJWT,
    esAdminRol,
    validarCampos
];

const validatorActualizarUsuario = [
    validarJWT,
    check('usuarioid', 'Debe enviar el identificador del usuario.').notEmpty(),
    validarCampos
];

const validatorGetUsers = [
    validarJWT,
    esAdminRol,
    validarCampos
];

const validatorconsulta = [
    validarJWT,
    validarCampos
]


export = {
    validatorconsulta,
    validatorGetUsers,
    validatorCrearUsuario,
    validatorActualizarUsuario
};
