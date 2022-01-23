import { Api } from "../config/http/api";
import { Usuario } from "../models/Usuario";

const login = (usuario = Usuario) => {
    const {correo, pwd} = usuario;
    return new Promise((resolve, reject) => {
        Api.post('/auth/login', {correo, pwd}).then(resp => {
            resolve(resp.data);
        }).catch(err => {
            reject(err);
        });
    });
}

const logout = () => {
    return new Promise((resolve, reject) => {
        Api.post('/auth/logout', {}).then(resp => {
            resolve(resp);
        }).catch(err => {
            reject(err);
        });
    });   
}

export default {
    login,
    logout
}