import express from 'express';
import { actualizaContacto, creaContacto, obtieneContactos } from '../controllers/contacto.controller';
import ContactoValidators from '../helpers/contacto.validators';

const router = express.Router();

router.post('', ContactoValidators.validatorCrearContacto, creaContacto);

router.get('', ContactoValidators.validatorConsultaContactos, obtieneContactos);

router.put('/:contactoid', ContactoValidators.validatorActualizarContacto, actualizaContacto);

module.exports = router;