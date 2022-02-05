import { Api } from "../config/http/api";
import { Reunion } from "../models/Reunion";

const addReunion = (reunion: Reunion): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        Api.post('/reuniones', reunion).then(resp => {
            resolve(resp);
        }).catch(err => {
            reject(err);
        });
    });
}

const getReuniones = (reunionid?: number, proyectoid?: number, contactoid?: number): Promise<Array<Reunion>> => {
    return new Promise<Array<Reunion>>((resolve, reject) => {
        let url = '/reuniones';

        let query = '';
        if(reunionid) {
            query = `${query}reunionid=${reunionid}&`;
        }
        if(proyectoid) {
            query = `${query}proyectoid=${proyectoid}&`;
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

const updateReunion = (reunion: Reunion): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
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