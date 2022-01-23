# API-CRM, WEB-CRM

Api-crm es una colección de servicios para proveer datos a web-crm.
Web-crm es una aplicación web crm básica creada con el framerwork ReactJs.

## Empezando

* [Descarga el instalador](https://nodejs.org/) de Node LTS.
* Clona este repositorio:  `git clone https://github.com/ottomolina/crm-basico.git`

### Configurar base de datos
* Ejecuta el script del archivo `ER-CRM.sql` en una base de datos PostgreSQL v.14.1.
* Ejecuta el script del archivo `Datos.sql` en una base de datos PostgreSQL v.14.1 con las tablas previamente creadas.

### Configurar api-crm
* En una terminal accede a la raíz del proyecto api-crm
```bash
  cd api-crm
```
* Crea un archivo con extensión .env en la raíz del proyecto api-crm y configuralo basado en .example.env que se encuentra en la raíz de api-crm.
```bash
  PORT = Puerto que utilizarán los servicios api rest
  HOSTDB = Hostname de la base de datos postgresql
  USERDB = Usuario de base de datos
  PWDDB = Contraseña de base de datos
  DATABASE = Nombre de la base de datos a la que se conectará
  PORTDB = Puerto de base de datos
  SECRETKEY = Palabra secreta para generar json web token
```
* Ejecuta desde la raíz del proyecto api-crm para instalar todas las dependencias requeridas
```bash
  npm install
```
* En una terminal desde la raíz del proyecto para iniciar los servicios ejecuta lo siguiente
```bash
  npm start
```
* Puedes ejecutar también este comando para iniciar el proyecto con [Nodemon](https://nodemon.io) y que este escuche los cambios que realices para compilar y recargar automáticamente
```bash
  npm run dev
```

### Configurar web-crm

* Desde la terminal accede a la raiz del proyecto web-crm
```bash
  cd web-crm
```
* Ejecuta desde la raíz del proyecto web-crm para instalar todas las dependencias requeridas
```bash
  npm install
```
* En una terminal desde la raíz del proyecto para iniciar la aplicación ejecuta lo siguiente
```bash
  npm start
```
* Profit. :tada:

## License
[MIT](https://choosealicense.com/licenses/mit/)
