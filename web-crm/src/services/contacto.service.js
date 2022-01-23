import { Api } from "../config/http/api";
import { Contacto } from "../models/Contacto";


const addContacto = (contacto = Contacto) => {
    return new Promise((resolve, reject) => {
        Api.post('/contactos', contacto).then(resp => {
            resolve(resp);
        }).catch(err => {
            reject(err);
        });
    });
}

const getContactos = (clienteid = 0, contactoid = 0) => {
    return new Promise((resolve, reject) => {
        let url = '/contactos';

        let query = '';
        if(clienteid !== 0) {
            query = `${query}clienteid=${clienteid}&`;
        }
        if(contactoid !== 0) {
            query = `${query}contactoid=${contactoid}&`;
        }
        if(query.length > 0) {
            url = `${url}?${query.substring(0, query.length-1)}`;
        }
        Api.get(url).then(resp => {
            resolve(resp.data);
        }).catch(err => {
            reject(err);
        });
    });
}

const updateContacto = (contacto = Contacto) => {
    return new Promise((resolve, reject) => {
        Api.put(`/contactos/${contacto.contactoid}`, contacto).then(resp => {
            resolve(resp);
        }).catch(err => {
            reject(err);
        });
    });
}

export {
    addContacto,
    getContactos,
    updateContacto
}