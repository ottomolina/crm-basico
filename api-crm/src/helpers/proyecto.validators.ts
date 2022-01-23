import { check } from 'express-validator';
import { validarCampos } from './../middlewares/validar-campos';
import { validarJWT } from './../middlewares/valida-jwt';

const validatorCrearProyecto = [
    check('nombre', 'El nombre es obligatorio.').notEmpty(),
    check('descripcion', 'La descripción es obligatorio.').notEmpty(),
    check('fecha_entrega', 'La fecha de entrega es obligatoria.').notEmpty(),
    check('valor', 'El valor del proyecto es obligatorio.').notEmpty(),
    check('clienteid', 'El identificador del cliente es obligatorio.').notEmpty(),
    check('contactoid', 'El identificador del contacto es obligatorio.').notEmpty(),
    validarJWT,
    validarCampos
];

const validatorActualizarProyecto = [
    validarJWT,
    check('proyectoid', 'Debe enviar el identificador del proyecto.').notEmpty(),
    validarCampos
];

const validatorConsultaProyectos = [
    validarJWT,
    validarCampos
]


export = {
    validatorCrearProyecto,
    validatorActualizarProyecto,
    validatorConsultaProyectos
};