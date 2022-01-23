import { Api } from "../config/http/api";
import { Cliente } from "../models/Cliente";


const addCliente = (cliente = Cliente) => {
    return new Promise((resolve, reject) => {
        Api.post('/clientes', cliente).then(resp => {
            resolve(resp);
        }).catch(err => {
            reject(err);
        });
    });
}

const getClientes = (clienteid = 0) => {
    return new Promise((resolve, reject) => {
        let url = '/clientes';
        if(clienteid !== 0) {
            url = `${url}/${clienteid}`;
        }
        Api.get(url).then(resp => {
            resolve(resp.data);
        }).catch(err => {
            reject(err);
        });
    });
}

const updateCliente = (cliente = Cliente) => {
    return new Promise((resolve, reject) => {
        Api.put(`/clientes/${cliente.clienteid}`, cliente).then(resp => {
            resolve(resp);
        }).catch(err => {
            reject(err);
        });
    });
}

export {
    addCliente,
    getClientes,
    updateCliente
}