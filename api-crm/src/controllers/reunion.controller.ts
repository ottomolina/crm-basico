import { Request, Response } from "express";
import { Conexion } from './../database/config';
import { Reunion } from "../database/model";
import Util from '../util/util';


export const creaReunion = async(req: Request, res: Response): Promise<void> => {
    const conn = Conexion.getInstance();
    const reunion: Reunion = req.body;
    try {
        // Verifica si el proyecto existe
        const existeProyecto = await conn.getClient().query('select 1 from crm_proyecto where proyectoid=$1', [reunion.proyectoid]);
        if(existeProyecto.rows.length === 0) {
           return Util.enviarMensajeError(res, 'EL PROYECTO PARA ESTA REUNIÓN NO SE ENCUENTRA REGISTRADO.');
        }
        // Verifica si el proyecto existe
        const existeContacto = await conn.getClient().query('select 1 from crm_contacto where contactoid=$1', [reunion.contactoid]);
        if(existeContacto.rows.length === 0) {
           return Util.enviarMensajeError(res, 'EL CONTACTO DE ESTA REUNIÓN NO SE ENCUENTRA REGISTRADO.');
        }
        // Forma la consulta sql para insertar el registro de la reunión
        const sql = `insert into crm_reunion (fecha_reunion,estado,fecha_creado,proyectoid,contactoid) values($1,'P',now(),$2,$3)`;
        await conn.getClient().query(sql, [reunion.fecha_reunion,reunion.proyectoid,reunion.contactoid]);

        Util.responseOK(res);
    } catch(err) {
        console.log('Error', err);
        Util.enviarMensajeError(res, 'OCURRIÓ UN ERROR AL GUARDAR LOS DATOS.');
    }
}


export const obtieneReuniones = async(req: Request, res: Response): Promise<void> => {
    const conn = Conexion.getInstance();
    const { reunionid, proyectoid, contactoid } = req.query;
    let sql =  `select reunionid, fecha_reunion, cr.estado, cr.fecha_creado, cr.proyectoid, cr.contactoid, cc.nombre_contacto, cp.nombre as nombre_proyecto
                from crm_reunion cr 
                inner join crm_contacto cc
                on cr.contactoid = cc.contactoid 
                inner join crm_proyecto cp 
                on cr.proyectoid = cp.proyectoid  where 1=1`;
    let count = 1;
    let sqlValues = [];
    if(reunionid) {
        sql = `${sql} and reunionid=$${count}`;
        sqlValues.push(`${reunionid}`);
        count++;
    }
    if(proyectoid) {
        sql = `${sql} and cr.proyectoid=$${count}`;
        sqlValues.push(`${proyectoid}`);
        count++;
    }
    if(contactoid) {
        sql = `${sql} and cr.contactoid=$${count}`;
        sqlValues.push(`${contactoid}`);
        count++;
    }
    const obj = await conn.getClient().query(sql, sqlValues);
    const contactos = Util.convertResultToArrayOfClass<Reunion>(obj);
    Util.responseOK(res, contactos);
}

export const actualizaReunion = async(req: Request, res: Response): Promise<void> => {
    const conn = Conexion.getInstance();
    const { reunionid } = req.params;
    const reunion: Reunion = req.body;
    let sqlFields = [];
    let sqlValues = [];
    let count = 1;
    if(reunion.fecha_reunion) {
        sqlFields.push(`fecha_reunion=$${count}`);
        sqlValues.push(reunion.fecha_reunion);
        count++;
    }
    if(Util.validaCampoNoVacio(reunion.estado)) {
        sqlFields.push(`estado=$${count}`);
        sqlValues.push(reunion.estado);
        count++;
    }
    if(sqlFields.length > 0) {
        sqlValues.push(+reunionid);
        await conn.getClient().query(`update crm_reunion set ${sqlFields.toString()} where reunionid=$${count}`, sqlValues);
    }
    Util.responseOK(res);
}