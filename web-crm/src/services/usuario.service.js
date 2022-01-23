import { Api } from "../config/http/api";
import { Usuario } from "../models/Usuario";


const addUser = (usuario = Usuario) => {
    return new Promise((resolve, reject) => {
        Api.post('/usuarios', usuario).then(resp => {
            resolve(resp);
        }).catch(err => {
            reject(err);
        });
    });
}

const getUsers = (usuarioid = 0) => {
    return new Promise((resolve, reject) => {
        let url = '/usuarios';
        if(usuarioid !== 0) {
            url = `${url}/${usuarioid}`;
        }
        Api.get(url).then(resp => {
            resolve(resp.data);
        }).catch(err => {
            reject(err);
        });
    });
}

const updateUser = (usuario = Usuario) => {
    return new Promise((resolve, reject) => {
        Api.put(`/usuarios/${usuario.usuarioid}`, usuario).then(resp => {
            resolve(resp);
        }).catch(err => {
            reject(err);
        });
    });
}

const deleteUser = (usuario = Usuario) => {
    return new Promise((resolve, reject) => {
        Api.delete(`/usuarios/${usuario.usuarioid}`).then(resp => {
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