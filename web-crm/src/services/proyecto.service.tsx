import { Api } from "../config/http/api";
import { Proyecto } from "../models/Proyecto";


const addProyecto = (proyecto: Proyecto): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        Api.post('/proyectos', proyecto).then(resp => {
            resolve(resp);
        }).catch(err => {
            reject(err);
        });
    });
}

const getProyectos = (proyectoid?: number, clienteid?: number, contactoid?: number): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        let url = '/proyectos';

        let query = '';
        if(proyectoid) {
            query = `${query}proyectoid=${proyectoid}&`;
        }
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

const updateProyecto = (proyecto: Proyecto): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        Api.put(`/proyectos/${proyecto.proyectoid}`, proyecto).then(resp => {
            resolve(resp);
        }).catch(err => {
            reject(err);
        });
    });
}

export {
    addProyecto,
    getProyectos,
    updateProyecto
}