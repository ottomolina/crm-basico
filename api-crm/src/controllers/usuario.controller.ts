import { Request, Response } from 'express';
import { Usuario, Rol } from './../database/model/';
import { Conexion } from '../database/config';
import Util from './../util/util';
const bcryptjs = require('bcryptjs');

export const creaUsuario = async(req: Request, res: Response): Promise<void> => {
    const conn = Conexion.getInstance();
    const usuario: Usuario = req.body;
    try {
        // Verifica que el rol existe en base de datos
        const existeRol = await conn.getClient().query('select 1 from crm_rol where rolid=$1', [usuario.rolid]);
        if(existeRol.rows.length === 0) {
            return Util.enviarMensajeError(res, 'EL ROL ENVIADO NO SE ENCUENTRA REGISTRADO.');
        }
        // Consulta si el correo ya existe
        const existeCorreo = await conn.getClient().query('select 1 from crm_usuario where correo like $1', [usuario.correo]);
        if(existeCorreo.rows.length > 0) {
           return Util.enviarMensajeError(res, 'EL CORREO ENVIADO YA SE ENCUENTRA REGISTRADO.');
        }
        // Se encripta la contraseña
        const salt = bcryptjs.genSaltSync();
        const pwd = bcryptjs.hashSync(usuario.pwd, salt);

        // Forma la consulta sql para insertar el registro del usuario
        const sql = `insert into crm_usuario (nombres,apellidos,correo,pwd,estado,fecha_creado,rolid) values($1,$2,$3,$4,'A',now(),$5)`;
        await conn.getClient().query(sql, [usuario.nombres, usuario.apellidos, usuario.correo, pwd, usuario.rolid]);

        Util.responseOK(res);
    } catch(err) {
        console.log('Error', err);
        Util.enviarMensajeError(res, 'OCURRIÓ UN ERROR AL GUARDAR LOS DATOS.');
    }
}

export const obtieneUsuarios = async(req: Request, res: Response): Promise<void> => {
    const conn = Conexion.getInstance();
    const { usuarioid } = req.params;
    let sql = 'select * from crm_usuario where estado not like $1';
    if(usuarioid) {
        sql = `${sql} and usuarioid=$2`
    }
    const obj = await conn.getClient().query(sql, ['E', usuarioid]);
    const usuarios = Util.convertResultToArrayOfClass<Usuario>(obj);
    usuarios.map(el => el.pwd = '');
    Util.responseOK(res, usuarios);
}

export const actualizaUsuario = async(req: Request, res: Response): Promise<void> => {
    const conn = Conexion.getInstance();
    const { usuarioid } = req.params;
    const usuario: Usuario = req.body;
    let sqlFields = [];
    let sqlValues = [];
    let count = 1;
    if(Util.validaCampoNoVacio(usuario.nombres)) {
        sqlFields.push(`nombres=$${count}`);
        sqlValues.push(usuario.nombres);
        count++;
    }
    if(Util.validaCampoNoVacio(usuario.apellidos)) {
        sqlFields.push(`apellidos=$${count}`);
        sqlValues.push(usuario.apellidos);
        count++;
    }
    if(Util.validaCampoNoVacio(usuario.pwd)) {
        sqlFields.push(`pwd=$${count}`);
        const salt = bcryptjs.genSaltSync();
        const pwd = bcryptjs.hashSync(usuario.pwd, salt);
        sqlValues.push(pwd);
        count++;
    }
    if(sqlFields.length > 0) {
        sqlValues.push(usuarioid);
        await conn.getClient().query(`update crm_usuario set ${sqlFields.toString()} where usuarioid=$${count}`, sqlValues);
    }
    Util.responseOK(res);
}

export const eliminaUsuario = async(req: Request, res: Response): Promise<void> => {
    const conn = Conexion.getInstance();
    const { usuarioid } = req.params;
    await conn.getClient().query('update crm_usuario set estado=$1 where usuarioid=$2', ['E', usuarioid]);
    Util.responseOK(res);
}