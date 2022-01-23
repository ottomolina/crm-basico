import axios from 'axios';
import { ErrorHttp } from '../../models/ErrorHttp';
import { getToken } from '../../util/storage';

const urlapi = 'http://localhost:8080/crm/api';

const EXITO = 0;

export class Api {
    static instance = axios;

    static getInstance() {
        if(!!Api.instance) { // undefined = false
            const token = getToken();
            Api.instance = axios.create({
                baseURL: urlapi,
                headers: {
                    'Content-Type':'application/json',
                    'x-token': token
                }
            });
        }
        return Api.instance;
    }

    static post(url='',data={}) {
        return new Promise((resolve, reject) => {
            Api.getInstance().post(url, data).then(resp => {
                Api.validaRespuesta(resp, resolve, reject);
            }).catch(err => {
                console.log('error post', err);
                reject(new ErrorHttp(1, 'Ocurrió un error al consultar el servicio.'));
            });
        });
    }

    static get(url='',params={}) {
        return new Promise((resolve, reject) => {
            Api.getInstance().get(url, params? { params } : {}).then(resp => {
                Api.validaRespuesta(resp, resolve, reject);
            }).catch(err => {
                console.log('error get', err);
                reject(new ErrorHttp(1, 'Ocurrió un error al consultar el servicio.'));
            });
        });
    }
    
    static put(url='',data={}) {
        return new Promise((resolve, reject) => {
            Api.getInstance().put(url, data).then(resp => {
                Api.validaRespuesta(resp, resolve, reject);
            }).catch(err => {
                console.log('error get', err);
                reject(new ErrorHttp(1, 'Ocurrió un error al consultar el servicio.'));
            });
        });
    }

    static delete(url='') {
        return new Promise((resolve, reject) => {
            Api.getInstance().delete(url).then(resp => {
                Api.validaRespuesta(resp, resolve, reject);
            }).catch(err => {
                console.log('error get', err);
                reject(new ErrorHttp(1, 'Ocurrió un error al consultar el servicio.'));
            });
        });
    }

    static validaRespuesta(resp, resolve, reject) {
        const {codigo,mensaje} = resp.data;
        if(codigo===EXITO) {
            resolve(resp.data);
        } else {
            if(!!mensaje.errors) {
                reject(new ErrorHttp(codigo, mensaje.errors[0].msg));
            } else {
                reject(new ErrorHttp(codigo, mensaje));
            }
        }
    }

}