import { Request, Response } from "express";
import { Conexion } from './../database/config';
import Util from '../util/util';
import { Contacto } from "../database/model";


export const creaContacto = async(req: Request, res: Response): Promise<void> => {
    const conn = Conexion.getInstance();
    const contacto: Contacto = req.body;
    try {
        // Consulta si el cliente existe
        const existeCliente = await conn.getClient().query('select 1 from crm_cliente where clienteid=$1', [contacto.clienteid]);
        if(existeCliente.rows.length === 0) {
           return Util.enviarMensajeError(res, 'EL CLIENTE PARA ESTE CONTACTO NO SE ENCUENTRA REGISTRADO.');
        }
        // Forma la consulta sql para insertar el registro del contacto
        const sql = `insert into crm_contacto (nombre_contacto,cargo,telefono,correo,estado,fecha_creado,clienteid) values($1,$2,$3,$4,'A',now(),$5)`;
        await conn.getClient().query(sql, [contacto.nombre_contacto,contacto.cargo,contacto.telefono,contacto.correo,contacto.clienteid]);

        Util.responseOK(res);
    } catch(err) {
        console.log('Error', err);
        Util.enviarMensajeError(res, 'OCURRIÓ UN ERROR AL GUARDAR LOS DATOS.');
    }
}


export const obtieneContactos = async(req: Request, res: Response): Promise<void> => {
    const conn = Conexion.getInstance();
    const { clienteid, contactoid } = req.query;
    let sql = 'select * from crm_contacto where estado not like $1';
    let count = 2;
    let sqlValues = ['E'];
    if(clienteid) {
        sql = `${sql} and clienteid=$${count}`;
        sqlValues.push(`${clienteid}`);
        count++;
    }
    if(contactoid) {
        sql = `${sql} and contactoid=$${count}`;
        sqlValues.push(`${contactoid}`);
        count++;
    }
    const obj = await conn.getClient().query(sql, sqlValues);
    const contactos = Util.convertResultToArrayOfClass<Contacto>(obj);
    Util.responseOK(res, contactos);
}

export const actualizaContacto = async(req: Request, res: Response): Promise<void> => {
    const conn = Conexion.getInstance();
    const { contactoid } = req.params;
    const contacto: Contacto = req.body;
    let sqlFields = [];
    let sqlValues = [];
    let count = 1;
    if(Util.validaCampoNoVacio(contacto.nombre_contacto)) {
        sqlFields.push(`nombre_contacto=$${count}`);
        sqlValues.push(contacto.nombre_contacto);
        count++;
    }
    if(Util.validaCampoNoVacio(contacto.cargo)) {
        sqlFields.push(`cargo=$${count}`);
        sqlValues.push(contacto.cargo);
        count++;
    }
    if(Util.validaCampoNoVacio(contacto.telefono)) {
        sqlFields.push(`telefono=$${count}`);
        sqlValues.push(contacto.telefono);
        count++;
    }
    if(Util.validaCampoNoVacio(contacto.correo)) {
        sqlFields.push(`correo=$${count}`);
        sqlValues.push(contacto.correo);
        count++;
    }
    if(Util.validaCampoNoVacio(contacto.estado)) {
        sqlFields.push(`estado=$${count}`);
        sqlValues.push(contacto.estado);
        count++;
    }
    if(sqlFields.length > 0) {
        sqlValues.push(+contactoid);
        await conn.getClient().query(`update crm_contacto set ${sqlFields.toString()} where contactoid=$${count}`, sqlValues);
    }
    Util.responseOK(res);
}