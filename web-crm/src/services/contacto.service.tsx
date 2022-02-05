import { Api } from "../config/http/api";
import { Contacto } from "../models/Contacto";


const addContacto = (contacto: Contacto): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        Api.post('/contactos', contacto).then(resp => {
            resolve(resp);
        }).catch(err => {
            reject(err);
        });
    });
}

const getContactos = (clienteid?: number, contactoid?: number): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        let url = '/contactos';

        let query = '';
        if(clienteid) {
            query = `${query}clienteid=${clienteid}&`;
        }
        if(contactoid) {
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

const updateContacto = (contacto: Contacto): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
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