import { Conexion } from './../database/config';
import { Request, Response } from "express";
import { Cliente } from '../database/model';
import Util from '../util/util';


export const creaCliente = async(req: Request, res: Response): Promise<void> => {
    const conn = Conexion.getInstance();
    const cliente: Cliente = req.body;
    try {
        // Consulta si el correo ya existe
        const existeCorreo = await conn.getClient().query('select 1 from crm_cliente where correo like $1', [cliente.correo]);
        if(existeCorreo.rows.length > 0) {
           return Util.enviarMensajeError(res, 'EL CORREO ENVIADO YA SE ENCUENTRA REGISTRADO.');
        }
        
        // Forma la consulta sql para insertar el registro del cliente
        const sql = `insert into crm_cliente (nombre,telefono,website,correo,estado,fecha_creado) values($1,$2,$3,$4,'A',now())`;
        await conn.getClient().query(sql, [cliente.nombre, cliente.telefono, cliente.website, cliente.correo]);

        Util.responseOK(res);
    } catch(err) {
        console.log('Error', err);
        Util.enviarMensajeError(res, 'OCURRIÓ UN ERROR AL GUARDAR LOS DATOS.');
    }
}


export const obtieneClientes = async(req: Request, res: Response): Promise<void> => {
    const conn = Conexion.getInstance();
    const { clienteid } = req.params;
    let sql = 'select * from crm_cliente where estado not like $1';
    if(clienteid) {
        sql = `${sql} and clienteid=$2`
    }
    const obj = await conn.getClient().query(sql, ['E', clienteid]);
    const clientes = Util.convertResultToArrayOfClass<Cliente>(obj);
    Util.responseOK(res, clientes);
}

export const actualizaCliente = async(req: Request, res: Response): Promise<void> => {
    const conn = Conexion.getInstance();
    const { clienteid } = req.params;
    const cliente: Cliente = req.body;
    let sqlFields = [];
    let sqlValues = [];
    let count = 1;
    if(Util.validaCampoNoVacio(cliente.nombre)) {
        sqlFields.push(`nombre=$${count}`);
        sqlValues.push(cliente.nombre);
        count++;
    }
    if(Util.validaCampoNoVacio(cliente.telefono)) {
        sqlFields.push(`telefono=$${count}`);
        sqlValues.push(cliente.telefono);
        count++;
    }
    if(Util.validaCampoNoVacio(cliente.website)) {
        sqlFields.push(`website=$${count}`);
        sqlValues.push(cliente.website);
        count++;
    }
    if(Util.validaCampoNoVacio(cliente.estado)) {
        sqlFields.push(`estado=$${count}`);
        sqlValues.push(cliente.estado);
        count++;
    }
    if(sqlFields.length > 0) {
        sqlValues.push(+clienteid);
        await conn.getClient().query(`update crm_cliente set ${sqlFields.toString()} where clienteid=$${count}`, sqlValues);
    }
    Util.responseOK(res);
}