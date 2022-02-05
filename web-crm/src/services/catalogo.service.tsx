import { Api } from "../config/http/api";

const obtenerCatalogo = (): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        Api.get('/catalogo').then(resp => {
            resolve(resp.data);
        }).catch(err => {
            reject(err);
        });
    });
}

export {
    obtenerCatalogo
}