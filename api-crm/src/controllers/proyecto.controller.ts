import { Request, Response } from "express";
import { Conexion } from './../database/config';
import Util from '../util/util';
import { Proyecto } from "../database/model";


export const creaProyecto = async(req: Request, res: Response): Promise<void> => {
    const conn = Conexion.getInstance();
    const proyecto: Proyecto = req.body;
    try {
        // Consulta si el cliente existe
        const existeCliente = await conn.getClient().query('select 1 from crm_cliente where clienteid=$1', [proyecto.clienteid]);
        if(existeCliente.rows.length === 0) {
           return Util.enviarMensajeError(res, 'EL CLIENTE PARA ESTE PROYECTO NO SE ENCUENTRA REGISTRADO.');
        }
        // Verificar si el contacto existe
        const existeContacto = await conn.getClient().query('select 1 from crm_contacto where contactoid=$1', [proyecto.contactoid]);
        if(existeContacto.rows.length === 0) {
           return Util.enviarMensajeError(res, 'EL CONTACTO PARA ESTE PROYECTO NO SE ENCUENTRA REGISTRADO.');
        }
        console.log('llego');
        // Forma la consulta sql para insertar el registro del proyecto
        const sql = `insert into crm_proyecto (nombre,descripcion,fecha_entrega,valor,estado,fecha_creado,clienteid,contactoid) values($1,$2,$3,$4,'A',now(),$5,$6)`;
        await conn.getClient().query(sql, [proyecto.nombre,proyecto.descripcion,proyecto.fecha_entrega,proyecto.valor,proyecto.clienteid,proyecto.contactoid]);

        Util.responseOK(res);
    } catch(err) {
        console.log('Error', err);
        Util.enviarMensajeError(res, 'OCURRIÓ UN ERROR AL GUARDAR LOS DATOS.');
    }
}


export const obtieneProyectos = async(req: Request, res: Response): Promise<void> => {
    const conn = Conexion.getInstance();
    const { proyectoid, clienteid, contactoid } = req.query;
    let sql = 'select * from crm_proyecto where estado not like $1';
    let count = 2;
    let sqlValues = ['E'];
    if(proyectoid) {
        sql = `${sql} and proyectoid=$${count}`;
        sqlValues.push(`${proyectoid}`);
        count++;
    }
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
    const proyectos = Util.convertResultToArrayOfClass<Proyecto>(obj);
    Util.responseOK(res, proyectos);
}

export const actualizaProyecto = async(req: Request, res: Response): Promise<void> => {
    const conn = Conexion.getInstance();
    const { proyectoid } = req.params;
    const proyecto: Proyecto = req.body;
    let sqlFields = [];
    let sqlValues = [];
    let count = 1;
    if(Util.validaCampoNoVacio(proyecto.nombre)) {
        sqlFields.push(`nombre=$${count}`);
        sqlValues.push(proyecto.nombre);
        count++;
    }
    if(Util.validaCampoNoVacio(proyecto.descripcion)) {
        sqlFields.push(`descripcion=$${count}`);
        sqlValues.push(proyecto.descripcion);
        count++;
    }
    if(Util.validaCampoNoVacio(proyecto.fecha_entrega)) {
        sqlFields.push(`fecha_entrega=$${count}`);
        sqlValues.push(proyecto.fecha_entrega);
        count++;
    }
    if(Util.validaCampoNoVacio(proyecto.valor)) {
        sqlFields.push(`valor=$${count}`);
        sqlValues.push(proyecto.valor);
        count++;
    }
    if(Util.validaCampoNoVacio(proyecto.estado)) {
        sqlFields.push(`estado=$${count}`);
        sqlValues.push(proyecto.estado);
        count++;
    }
    if(sqlFields.length > 0) {
        sqlValues.push(+proyectoid);
        await conn.getClient().query(`update crm_proyecto set ${sqlFields.toString()} where proyectoid=$${count}`, sqlValues);
    }
    Util.responseOK(res);
}