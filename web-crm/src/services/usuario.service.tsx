import { Api } from "../config/http/api";
import { Usuario } from "../models/Usuario";


const addUser = (usuario: Usuario): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        Api.post('/usuarios', usuario).then(resp => {
            resolve(resp);
        }).catch(err => {
            reject(err);
        });
    });
}

const getUsers = (usuarioid?: number): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        let url = '/usuarios';
        if(usuarioid) {
            url = `${url}/${usuarioid}`;
        }
        Api.get(url).then(resp => {
            resolve(resp.data);
        }).catch(err => {
            reject(err);
        });
    });
}

const updateUser = (usuario: Usuario): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        Api.put(`/usuarios/${usuario.usuarioid}`, usuario).then(resp => {
            resolve(resp);
        }).catch(err => {
            reject(err);
        });
    });
}

const deleteUser = (usuarioid: number): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        Api.delete(`/usuarios/${usuarioid}`).then(resp => {
            resolve(resp);
        }).catch(err => {
            reject(err);
        });
    });
}

export {
    addUser,
    getUsers,
    updateUser,
    deleteUser
}