import { Usuario } from "../models/Usuario";

const KEY_TOKEN     = 'C00001';
const KEY_USUARIO   = 'C00002';
const KEY_CATALOGO  = 'C00003';

const getToken = (): string => {
    let token = localStorage.getItem(KEY_TOKEN)
    return token === null ? '' : token;
}

const getUsuario = (): Usuario => {
    const valor = localStorage.getItem(KEY_USUARIO);
    const usuario = valor === null ? null : JSON.parse(valor);
    return usuario;
}

const setUsuario = (usuario: Usuario): void => {
    localStorage.setItem(KEY_USUARIO, JSON.stringify(usuario));
}

const setLogged = (token: string, usuario: Usuario): void => {
    localStorage.setItem(KEY_TOKEN, token);
    localStorage.setItem(KEY_USUARIO, JSON.stringify(usuario));
}

const isLogged = (): boolean => {
    const validacion = getToken() === '' ? false : true;
    return validacion;
}

const closeSesion = (): void => {
    localStorage.removeItem(KEY_TOKEN);
    localStorage.removeItem(KEY_USUARIO);
    removeCatalogo();
}

const setCatalogo = (catalogo: any): void => {
    localStorage.setItem(KEY_CATALOGO, JSON.stringify(catalogo));
}

const getCatalogo = (): any => {
    const catalogo = localStorage.getItem(KEY_CATALOGO);
    return catalogo === null ? null : JSON.parse(catalogo);
}

const removeCatalogo = (): void => {
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