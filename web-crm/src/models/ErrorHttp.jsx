
export class ErrorHttp {
    codigo = 0;
    mensaje = '';

    constructor(codigo, mensaje) {
        this.codigo = codigo;
        this.mensaje = mensaje;
    }
}