import { Api } from "../config/http/api";

const obtenerCatalogo = () => {
    return new Promise((resolve, reject) => {
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