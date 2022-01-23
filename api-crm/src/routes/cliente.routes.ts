import express from 'express';
import { actualizaCliente, creaCliente, obtieneClientes } from '../controllers/cliente.controller';
import ClienteValidators from '../helpers/cliente.validators';

const router = express.Router();

router.post('', ClienteValidators.validatorCrearCliente, creaCliente);

router.get('', ClienteValidators.validatorConsultaClientes, obtieneClientes);

router.get('/:clienteid', ClienteValidators.validatorConsultaClientes, obtieneClientes);

router.put('/:clienteid', ClienteValidators.validatorActualizarCliente, actualizaCliente);

module.exports = router;