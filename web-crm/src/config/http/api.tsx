import axios, { Axios, AxiosRequestConfig } from 'axios';
import { ErrorHttp } from '../../models/ErrorHttp';
import { getToken } from '../../util/storage';

const urlapi = 'http://localhost:8080/crm/api';

const EXITO = 0;

export class Api {
    static instance: Axios;
    static config: AxiosRequestConfig<any>;

    static getInstance() {
        if(!Api.instance) {
            Api.instance = axios.create({
                baseURL: urlapi,
                headers: {
                    'Content-Type':'application/json'
                }
            });
        }
        const token = getToken();
        Api.config = { headers: { 'x-token': token } };
        return Api.instance;
    }

    static post(url: string, data: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            Api.getInstance().post(url, data, Api.config).then(resp => {
                Api.validaRespuesta(resp, resolve, reject);
            }).catch(err => {
                console.log('error post', err);
                reject(new ErrorHttp(1, 'Ocurrió un error al consultar el servicio.'));
            });
        });
    }

    static get(url: string, params?: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            Api.getInstance().get(url, params? { params, headers: Api.config.headers } : { headers: Api.config.headers}).then(resp => {
                Api.validaRespuesta(resp, resolve, reject);
            }).catch(err => {
                console.log('error get', err);
                reject(new ErrorHttp(1, 'Ocurrió un error al consultar el servicio.'));
            });
        });
    }
    
    static put(url: string, data: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            Api.getInstance().put(url, data, Api.config).then(resp => {
                Api.validaRespuesta(resp, resolve, reject);
            }).catch(err => {
                console.log('error get', err);
                reject(new ErrorHttp(1, 'Ocurrió un error al consultar el servicio.'));
            });
        });
    }

    static delete(url: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            Api.getInstance().delete(url, Api.config).then(resp => {
                Api.validaRespuesta(resp, resolve, reject);
            }).catch(err => {
                console.log('error get', err);
                reject(new ErrorHttp(1, 'Ocurrió un error al consultar el servicio.'));
            });
        });
    }

    static validaRespuesta(resp: any, resolve: (value: unknown) => void, reject: (reason: any) => void) {
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