import { check } from 'express-validator';
import { validarCampos } from './../middlewares/validar-campos';
import { validarJWT } from './../middlewares/valida-jwt';

const validatorCrearReunion = [
    check('fecha_reunion', 'La fecha de la reunión es obligatoria.').notEmpty(),
    check('proyectoid', 'El identificador del proyecto es obligatorio.').notEmpty(),
    check('contactoid', 'El identificador del contacto es obligatorio.').notEmpty(),
    validarJWT,
    validarCampos
];

const validatorActualizarReunion = [
    validarJWT,
    check('reunionid', 'Debe enviar el identificador de la reunión.').notEmpty(),
    validarCampos
];

const validatorConsultaReuniones = [
    validarJWT,
    validarCampos
]


export = {
    validatorCrearReunion,
    validatorActualizarReunion,
    validatorConsultaReuniones
};