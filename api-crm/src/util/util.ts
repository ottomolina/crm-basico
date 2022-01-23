import { Response } from 'express';
import { Value } from 'ts-postgres';
import { Result } from 'ts-postgres/dist/src/result';

const OK = { codigo: 0 };
const ERROR = { codigo: 1 };
const OK_CHANGE_PASS = { codigo: 2 };


const responseOK = (res: Response, data: any = undefined) => {
    data
    ? res.status(200).json({ ...OK, sesion: true, mensaje: 'Consulta exitosa.', data })
    : res.status(200).json({ ...OK, sesion: true, mensaje: 'Consulta exitosa.' })
}

const enviarMensaje = (res: Response, mensaje: string, sesion: boolean = true) => {
    res.status(200).json({ ...OK, sesion, mensaje });
}

const enviarMensajeError = (res: Response, mensaje: string, sesion: boolean = true) => {
    res.status(200).json({ ...ERROR, sesion, mensaje });
}

const enviarMensajeCambioPasswords = (res: Response, mensaje: string) => {
    res.status(200).json({ ...OK_CHANGE_PASS, mensaje });
}

const getCurrentDate = () => {
    let date = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Guatemala"}));
    let year = date.getFullYear();
    let month = `${date.getMonth() + 1}`.padStart(2, '0');
    let day = `${date.getDate()}`.padStart(2, '0');
    let hour = `${date.getHours()}`.padStart(2, '0');
    let minute = `${date.getMinutes()}`.padStart(2, '0');
    let seconds = `${date.getSeconds()}`.padStart(2, '0');
    let curDate = `${year}-${month}-${day}T${hour}:${minute}:${seconds}.000+00:00`;
    return curDate;
}

const obtenerFechaActual = () => {
    const date = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Guatemala"}));
    let year = date.getFullYear();
    let month = `${date.getMonth() + 1}`.padStart(2, '0');
    let day = `${date.getDate()}`.padStart(2, '0');
    let hour = `${date.getHours()}`.padStart(2, '0');
    let minute = `${date.getMinutes()}`.padStart(2, '0');
    let seconds = `${date.getSeconds()}`.padStart(2, '0');

    let curDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:${seconds}.000+00:00`);
    return curDate;
}

const fechaActual = () => {
    const date = new Date(new Date().toLocaleString("en-US", {timeZone: "America/Guatemala"}));
    let year = date.getFullYear();
    let month = `${date.getMonth() + 1}`.padStart(2, '0');
    let day = `${date.getDate()}`.padStart(2, '0');
    let curDate = new Date(`${year}-${month}-${day}`);
    return curDate;
}

function convertResultToArrayOfClass<T extends Object>(result: Result<Value>)  {
    let indice = 0;
    let array = new Array<T>();
    while(indice < result.rows.length) {
        const model: any = {};
        const row = result.rows[indice];
        // console.log('row', row);
        let i = 0;
        for(const field of result.names) {
            // console.log('model', model);
            // console.log('field', field.name);
            model[field] = row[i];
            i++;
            // console.log('model', model);
        }
        array.push(model);
        indice++;
    }
    return array;
}
// function convertResultToArrayOfClass<T extends Object>(result: any)  {
//     let indice = 0;
//     let array = new Array<T>();
//     while(indice < result.rows.length) {
//         const model: any = {};
//         const row = result.rows[indice];
//         // console.log('row', row);
//         for(const field of result.fields) {
//             // console.log('model', model);
//             // console.log('field', field.name);
//             model[field.name] = row[field.name];
//             // console.log('model', model);
//         }
//         array.push(model);
//         indice++;
//     }
//     return array;
// }

const validaCampoNoVacio = (campo: string): boolean => {
    if(campo && campo !== '') {
        return true;
    }
    return false;
}

export = {
    convertResultToArrayOfClass,
    enviarMensaje,
    enviarMensajeError,
    responseOK,
    enviarMensajeCambioPasswords,
    getCurrentDate,
    obtenerFechaActual,
    fechaActual,
    validaCampoNoVacio
}
