import { Request, Response } from 'express';
import { Usuario, Rol } from './../database/model/';
import { Conexion } from '../database/config';
import { generaJwT } from '../util/jwt';
import Util from './../util/util';
const bcryptjs = require('bcryptjs');


export const loginUsuario = async(req: Request, res: Response): Promise<void> => {
    const conn = Conexion.getInstance();
    const { correo, pwd } = req.body;
    try {
        // Verificar que el usuario existe
        const valida = await conn.getClient().query('select * from crm_usuario where correo like $1', [correo]);
        if ( valida.rows.length === 0 ) {
            return Util.enviarMensajeError(res, 'Usuario o contraseña incorrectos.');
        }
        const usuario = Util.convertResultToArrayOfClass<Usuario>(valida)[0];
        // Verificar la contraseña
        const validOffset = bcryptjs.compareSync(pwd, usuario.pwd);
        if ( !validOffset ) {
            return Util.enviarMensajeError(res, 'Usuario o contraseña incorrectos.');
        }
        // Verificar si el usuario está bloqueado o inactivo
        if ( usuario.estado !== 'A' ) {
            return Util.enviarMensajeError(res, 'Tu usuario no está activo.');
        }
        // Generar el JWT
        const token = await generaJwT( usuario.usuarioid );
        // Guardar el token en base de datos
        await conn.getClient().query('insert into crm_token (valor,estado,fecha_creado,usuarioid) values($1,$2,now(),$3)',
                                [token,'A',usuario.usuarioid]);

        const {pwd: psd, ...user} = usuario;
        Util.responseOK(res, { usuario: user, token });
    } catch (error) {
        console.log('', error);
        Util.enviarMensajeError(res, 'Ocurrió un error al autenticarse, consulte al desarrollador.');
    }
}

export const logoutUsuario = async(req: Request, res: Response): Promise<void> => {
    const conn = Conexion.getInstance();
    // Obtener el token de la petición
    const token = req.header('x-token');
    // Obtener el usuarioid del body
    const { usuarioid } = req.body;
    // Actualizar el estado del registro del token a base de datos
    await conn.getClient().query('update crm_token set estado=$1 where usuarioid=$2 and valor=$3',['I',usuarioid,token]);
    Util.enviarMensaje(res, 'Consulta exitosa.', false);
}
