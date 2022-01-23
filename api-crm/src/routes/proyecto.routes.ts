import express from 'express';
import { actualizaProyecto, creaProyecto, obtieneProyectos } from '../controllers/proyecto.controller';
import ProyectoValidators from '../helpers/proyecto.validators';

const router = express.Router();

router.post('', ProyectoValidators.validatorCrearProyecto, creaProyecto);

router.get('', ProyectoValidators.validatorConsultaProyectos, obtieneProyectos);

router.put('/:proyectoid', ProyectoValidators.validatorActualizarProyecto, actualizaProyecto);

module.exports = router;