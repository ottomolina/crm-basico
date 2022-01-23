import express from 'express';
import UsuarioValidators from '../helpers/usuario.validators';
import { actualizaUsuario, creaUsuario, obtieneUsuarios, eliminaUsuario } from '../controllers/usuario.controller';

const router = express.Router();

router.post('', UsuarioValidators.validatorCrearUsuario, creaUsuario);

router.get('', UsuarioValidators.validatorGetUsers, obtieneUsuarios);

router.get('/:usuarioid', UsuarioValidators.validatorconsulta, obtieneUsuarios);

router.put('/:usuarioid', UsuarioValidators.validatorActualizarUsuario, actualizaUsuario);

router.delete('/:usuarioid', UsuarioValidators.validatorActualizarUsuario, eliminaUsuario);

module.exports = router;