
export class ErrorHttp {
    codigo: number;
    mensaje: string;

    constructor(codigo: number, mensaje: string) {
        this.codigo = codigo;
        this.mensaje = mensaje;
    }
}