import { Conexion } from './../database/config';
import { Request, Response } from "express";
import Util from '../util/util';
import { Estado, Rol } from '../database/model';


export const obtenerCatalogo = async(req: Request, res: Response): Promise<void> => {
    const conn = Conexion.getInstance();
    const objEstado = await conn.getClient().query('select * from crm_estado');
    const objRol = await conn.getClient().query('select * from crm_rol');

    const listaEstado = Util.convertResultToArrayOfClass<Estado>(objEstado);
    const listaRol = Util.convertResultToArrayOfClass<Rol>(objRol);

    Util.responseOK(res, { listaEstado, listaRol });
}