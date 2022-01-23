import { Api } from "../config/http/api";
import { Reunion } from "../models/Reunion";

const addReunion = (reunion = Reunion) => {
    return new Promise((resolve, reject) => {
        Api.post('/reuniones', reunion).then(resp => {
            resolve(resp);
        }).catch(err => {
            reject(err);
        });
    });
}

const getReuniones = (reunionid = 0, proyectoid = 0, contactoid = 0) => {
    return new Promise((resolve, reject) => {
        let url = '/reuniones';

        let query = '';
        if(reunionid !== 0) {
            query = `${query}reunionid=${reunionid}&`;
        }
        if(proyectoid !== 0 && proyectoid !== null) {
            query = `${query}proyectoid=${proyectoid}&`;
        }
        if(contactoid !== 0 && contactoid !== null) {
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

const updateReunion = (reunion = Reunion) => {
    return new Promise((resolve, reject) => {
        Api.put(`/reuniones/${reunion.reunionid}`, reunion).then(resp => {
            resolve(resp);
        }).catch(err => {
            reject(err);
        });
    });
}

export {
    addReunion,
    getReuniones,
    updateReunion
}