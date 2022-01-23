import express from 'express';
import AuthValidators from './../helpers/auth.validators';
import { loginUsuario, logoutUsuario } from '../controllers/auth.controller';

const router = express.Router();

router.post('/login', loginUsuario);

router.post('/logout', AuthValidators.validatorsLogout, logoutUsuario);

module.exports = router;