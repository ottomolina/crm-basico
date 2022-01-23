import express from 'express';
import { actualizaReunion, creaReunion, obtieneReuniones } from '../controllers/reunion.controller';
import ReunionValidators from '../helpers/reunion.validators';

const router = express.Router();

router.post('', ReunionValidators.validatorCrearReunion, creaReunion);

router.get('', ReunionValidators.validatorConsultaReuniones, obtieneReuniones);

router.put('/:reunionid', ReunionValidators.validatorActualizarReunion, actualizaReunion);

module.exports = router;