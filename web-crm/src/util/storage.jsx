import { Usuario } from "../models/Usuario";

const KEY_TOKEN     = 'C00001';
const KEY_USUARIO   = 'C00002';
const KEY_CATALOGO  = 'C00003';

const getToken = () => {
    let token = localStorage.getItem(KEY_TOKEN)
    return token === null ? '' : token;
}

const getUsuario = () => {
    const valor = localStorage.getItem(KEY_USUARIO);
    const usuario = JSON.parse(valor ? valor : '');
    return usuario;
}

const setUsuario = (usuario = Usuario) => {
    localStorage.setItem(KEY_USUARIO, JSON.stringify(usuario));
}

const setLogged = (token, usuario = Usuario) => {
    localStorage.setItem(KEY_TOKEN, token);
    localStorage.setItem(KEY_USUARIO, JSON.stringify(usuario));
}

const isLogged = () => {
    const validacion = getToken() === '' ? false : true;
    return validacion;
}

const closeSesion = () => {
    localStorage.removeItem(KEY_TOKEN);
    localStorage.removeItem(KEY_USUARIO);
    removeCatalogo();
}

const setCatalogo = (catalogo) => {
    localStorage.setItem(KEY_CATALOGO, JSON.stringify(catalogo));
}

const getCatalogo = () => {
    return JSON.parse(localStorage.getItem(KEY_CATALOGO));
}

const removeCatalogo = () => {
    localStorage.removeItem(KEY_CATALOGO);
}


export {
    closeSesion,
    getToken,
    getUsuario,
    setLogged,
    isLogged,
    getCatalogo,
    setCatalogo,
    removeCatalogo,
    setUsuario
}