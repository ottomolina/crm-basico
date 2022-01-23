import { Client } from 'ts-postgres';

export class Conexion {
    static instancia: Conexion;
    private client: Client;

    constructor() {
        this.client = new Client({
            host: `${process.env.HOSTDB}`,
            user: `${process.env.USERDB}`,
            password: `${process.env.PWDDB}`,
            database: `${process.env.DATABASE}`,
            port: +`${process.env.PORTDB}`
        });
        this.client.connect();
    }

    public getClient() {
        return this.client;
    }
    
    public static getInstance(): Conexion {
        if(!Conexion.instancia) {
            Conexion.instancia = new Conexion();
        }
        return Conexion.instancia;
    }

}
