import express, { Express } from 'express';
const cors = require('cors');
import {Conexion} from './database/config';

class Server {
    private app: Express;
    private port: string;
    private root: string = '/crm/api';

    constructor() {
        this.app = express();
        this.port = `${process.env.PORT}`;

        this.iniciar().then((res) => {
            this.start();
        }).catch(err => {
            console.log('Error', err);
        });

    }

    async iniciar() {
        await this.dbConnection();
        await this.middlewares();
        await this.routes();
    }

    async dbConnection(): Promise<void>  {
        const conn = Conexion.getInstance();
        conn.getClient().on('error', (err: any) => {
            console.log('Error', err);
            throw new Error('Ocurrió un error al conectarse a base de datos.');
        })
    }

    async middlewares() {
        // CORS
        this.app.use( cors() );
        // Lectura y parseo del body
        this.app.use( express.json() );
        // Directorio público para pruebas
        this.app.use( express.static('public') );
    }

    async routes() {
        this.app.use(`${this.root}/monitor`, require('./routes/monitor.routes'));
        this.app.use(`${this.root}/auth`, require('./routes/auth.routes'));
        this.app.use(`${this.root}/catalogo`, require('./routes/catalogo.routes'));
        this.app.use(`${this.root}/usuarios`, require('./routes/usuario.routes'));
        this.app.use(`${this.root}/clientes`, require('./routes/cliente.routes'));
        this.app.use(`${this.root}/proyectos`, require('./routes/proyecto.routes'));
        this.app.use(`${this.root}/contactos`, require('./routes/contacto.routes'));
        this.app.use(`${this.root}/reuniones`, require('./routes/reunion.routes'));

        this.app.use('*', (req, res) => res.status(404).json({mensaje: '404 | Servicio no encontrado.'}));
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`Servidor iniciado en el puerto ${this.port}`);
        });
    }
}

export default Server;
