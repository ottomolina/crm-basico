import { Request, Response } from "express";
import { Conexion } from "../database/config";
import { Usuario } from "../database/model";
import Util from "../util/util";

export const esAdminRol = async(req: Request, res: Response, next: any) => {
    const conn = Conexion.getInstance();
    try {
        const { usuarioid } = req.body;
        const usuario = await conn.getClient().query('select * from crm_usuario where usuarioid = $1', [usuarioid]);
        //  Usuario.findById(uid);
        const user = Util.convertResultToArrayOfClass<Usuario>(usuario)[0];

        if ( user.rolid !== 1 ) {
            return Util.enviarMensajeError(res, 'Tu usuario no tiene permiso para realizar esta acción.');
        }
        next();
    } catch (error) {
        return Util.enviarMensajeError(res, 'Petición denegada, ocurrió un error de validación de permisos del usuario.')
    }
}
