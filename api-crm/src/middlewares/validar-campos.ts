import { Request, Response } from "express";
import { validationResult } from "express-validator";

const Util = require('../util/util');

export const validarCampos = ( request: Request, response: Response, next: any ) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return Util.enviarMensajeError(response, errors);
    }
    next();
}
