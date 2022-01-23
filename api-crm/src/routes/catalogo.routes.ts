import express from 'express';
import { validarCampos } from './../middlewares/validar-campos';
import { validarJWT } from './../middlewares/valida-jwt';
import { obtenerCatalogo } from '../controllers/catalogo.controller';

const router = express.Router();

router.get('', [
    validarJWT,
    // esAdminRol,
    validarCampos
], obtenerCatalogo);

module.exports = router;