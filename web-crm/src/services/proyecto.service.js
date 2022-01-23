import { Api } from "../config/http/api";
import { Proyecto } from "../models/Proyecto";


const addProyecto = (proyecto = Proyecto) => {
    return new Promise((resolve, reject) => {
        Api.post('/proyectos', proyecto).then(resp => {
            resolve(resp);
        }).catch(err => {
            reject(err);
        });
    });
}

const getProyectos = (proyectoid = 0, clienteid = 0, contactoid = 0) => {
    return new Promise((resolve, reject) => {
        let url = '/proyectos';

        let query = '';
        if(proyectoid !== 0) {
            query = `${query}proyectoid=${proyectoid}&`;
        }
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

const updateProyecto = (proyecto = Proyecto) => {
    return new Promise((resolve, reject) => {
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