import { check } from 'express-validator';
import { validarCampos } from './../middlewares/validar-campos';
import { validarJWT } from './../middlewares/valida-jwt';

const validatorCrearContacto = [
    check('nombre_contacto', 'El nombre del contacto es obligatorio.').notEmpty(),
    check('cargo', 'El cargo es obligatorio.').notEmpty(),
    check('telefono', 'El teléfono del contacto es obligatoria.').notEmpty(),
    check('correo', 'El correo del contacto es obligatorio.').notEmpty(),
    check('clienteid', 'El identificador del cliente es obligatorio.').notEmpty(),
    validarJWT,
    validarCampos
];

const validatorActualizarContacto = [
    validarJWT,
    check('contactoid', 'Debe enviar el identificador del contacto.').notEmpty(),
    validarCampos
];

const validatorConsultaContactos = [
    validarJWT,
    validarCampos
]


export = {
    validatorCrearContacto,
    validatorActualizarContacto,
    validatorConsultaContactos
};