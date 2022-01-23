import { Request, Response } from "express";
import { Conexion } from "../database/config";
import { Token } from "../database/model";
import Util from '../util/util';
const jwt = require('jsonwebtoken');

export const validarJWT = async(req: Request, res: Response, next: any) => {
    const conn = Conexion.getInstance();
    const token = req.header('x-token');
    try {
        if ( !token ) {
            return Util.enviarMensajeError(res, 'Petición denegada, primero debes autenticarte.', false);
        }
        // Se extrae el id del usuario decodificando el token con la clave secreta.
        const { usuarioid } = jwt.verify( token, process.env.SECRETKEY);

        // Se verifica que el token exista del lado de base de datos para que las peticiones sean legítimas
        const validarToken = await conn.getClient().query('select * from crm_token where valor = $1 and usuarioid = $2', [token, usuarioid]);
        if(validarToken.rows.length === 0) { // El token no existe en base de datos mandar mensaje de error
            return Util.enviarMensajeError(res, 'Petición denegada, primero debes autenticarte.', false);
        }
        const objToken = Util.convertResultToArrayOfClass<Token>(validarToken)[0];
        if(objToken.estado === 'I') {
            return Util.enviarMensajeError(res, 'Petición denegada, primero debes autenticarte.', false);
        }

        // Se realiza la búsqueda del registro de usuario en bd
        const usuario = await conn.getClient().query('select 1 from crm_usuario where usuarioid = $1', [usuarioid]);
        if( usuario.rows.length === 0 ) { // No se encuentra el registro del usuario
            return Util.enviarMensajeError(res, 'Petición denegada, primero debes autenticarte.', false);
        }
        req.body.usuarioid = usuarioid;
        next();
    } catch (error) {
        console.log(error);
        return Util.enviarMensajeError(res, 'La sesión ha finalizado, por favor autentícate de nuevo.', false);
    }
}
