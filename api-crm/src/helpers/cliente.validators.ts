import { validarCampos } from './../middlewares/validar-campos';
import { validarJWT } from './../middlewares/valida-jwt';
import { check } from 'express-validator';

const validatorCrearCliente = [
    check('nombre', 'El nombre es obligatorio.').notEmpty(),
    check('telefono', 'El telefono es obligatorio.').notEmpty(),
    check('correo', 'El correo no es válido.').isEmail(),
    validarJWT,
    validarCampos
];

const validatorActualizarCliente = [
    validarJWT,
    check('clienteid', 'Debe enviar el identificador del cliente.').notEmpty(),
    validarCampos
];

const validatorConsultaClientes = [
    validarJWT,
    validarCampos
]


export = {
    validatorCrearCliente,
    validatorActualizarCliente,
    validatorConsultaClientes
};