-- crm_cliente definition

-- Drop table

-- DROP TABLE crm_cliente;

CREATE TABLE crm_cliente (
	clienteid serial4 NOT NULL,
	nombre varchar(128) NOT NULL,
	telefono varchar(16) NOT NULL,
	website varchar(100) NULL,
	correo varchar(150) NOT NULL,
	estado bpchar(1) NOT NULL,
	fecha_creado timestamp NOT NULL,
	CONSTRAINT crm_cliente_pk01 PRIMARY KEY (clienteid)
);


-- crm_estado definition

-- Drop table

-- DROP TABLE crm_estado;

CREATE TABLE crm_estado (
	estadoid serial4 NOT NULL,
	letra bpchar(1) NOT NULL,
	descripcion varchar(64) NOT NULL,
	tabla varchar(500) NOT NULL,
	CONSTRAINT crm_estado_pk01 PRIMARY KEY (estadoid)
);


-- crm_rol definition

-- Drop table

-- DROP TABLE crm_rol;

CREATE TABLE crm_rol (
	rolid serial4 NOT NULL,
	nombre varchar(32) NOT NULL,
	estado bpchar(1) NOT NULL,
	CONSTRAINT crm_rol_pk01 PRIMARY KEY (rolid)
);


-- crm_contacto definition

-- Drop table

-- DROP TABLE crm_contacto;

CREATE TABLE crm_contacto (
	contactoid serial4 NOT NULL,
	nombre_contacto varchar(300) NOT NULL,
	cargo varchar(150) NOT NULL,
	telefono varchar(16) NOT NULL,
	correo varchar(150) NOT NULL,
	estado bpchar(1) NOT NULL,
	fecha_creado timestamp NOT NULL,
	clienteid int4 NOT NULL,
	CONSTRAINT crm_contacto_pk01 PRIMARY KEY (contactoid),
	CONSTRAINT refcrm_cliente21 FOREIGN KEY (clienteid) REFERENCES crm_cliente(clienteid)
);


-- crm_proyecto definition

-- Drop table

-- DROP TABLE crm_proyecto;

CREATE TABLE crm_proyecto (
	proyectoid serial4 NOT NULL,
	nombre varchar(200) NOT NULL,
	descripcion varchar(500) NOT NULL,
	fecha_entrega varchar(16) NOT NULL,
	valor varchar(16) NOT NULL,
	estado bpchar(1) NOT NULL,
	fecha_creado timestamp NOT NULL,
	clienteid int4 NOT NULL,
	contactoid int4 NOT NULL,
	CONSTRAINT crm_proyecto_pk01 PRIMARY KEY (proyectoid),
	CONSTRAINT refcrm_cliente31 FOREIGN KEY (clienteid) REFERENCES crm_cliente(clienteid),
	CONSTRAINT refcrm_contacto41 FOREIGN KEY (contactoid) REFERENCES crm_contacto(contactoid)
);


-- crm_reunion definition

-- Drop table

-- DROP TABLE crm_reunion;

CREATE TABLE crm_reunion (
	reunionid serial4 NOT NULL,
	fecha_reunion varchar(32) NOT NULL,
	estado bpchar(1) NOT NULL,
	fecha_creado timestamp NOT NULL,
	proyectoid int4 NOT NULL,
	contactoid int4 NOT NULL,
	CONSTRAINT crm_reunion_pk01 PRIMARY KEY (reunionid),
	CONSTRAINT refcrm_contacto61 FOREIGN KEY (contactoid) REFERENCES crm_contacto(contactoid),
	CONSTRAINT refcrm_proyecto51 FOREIGN KEY (proyectoid) REFERENCES crm_proyecto(proyectoid)
);


-- crm_usuario definition

-- Drop table

-- DROP TABLE crm_usuario;

CREATE TABLE crm_usuario (
	usuarioid serial4 NOT NULL,
	nombres varchar(120) NOT NULL,
	apellidos varchar(250) NOT NULL,
	correo varchar(150) NOT NULL,
	pwd varchar(300) NOT NULL,
	estado bpchar(1) NOT NULL,
	fecha_creado timestamp NOT NULL,
	rolid int4 NOT NULL,
	CONSTRAINT crm_usuario_pk01 PRIMARY KEY (usuarioid),
	CONSTRAINT refcrm_rol81 FOREIGN KEY (rolid) REFERENCES crm_rol(rolid)
);


-- crm_token definition

-- Drop table

-- DROP TABLE crm_token;

CREATE TABLE crm_token (
	tokenid serial4 NOT NULL,
	valor varchar(200) NOT NULL,
	estado bpchar(1) NOT NULL,
	fecha_creado timestamp NOT NULL,
	usuarioid int4 NOT NULL,
	CONSTRAINT crm_token_pk01 PRIMARY KEY (tokenid),
	CONSTRAINT refcrm_usuario71 FOREIGN KEY (usuarioid) REFERENCES crm_usuario(usuarioid)
);
