
-- VALORES EN LOS CAMPOS DE ESTADO DE LAS TABLAS
insert into crm_estado (letra,descripcion,tabla)
select 'A', 'ACTIVO', 'CRM_ROL,CRMUSUARIO,CRM_TOKEN,CRM_CLIENTE,CRM_CONTACTO,CRM_PROYECTO' union all 
select 'I', 'INACTIVO', 'CRM_ROL,CRMUSUARIO,CRM_TOKEN,CRM_CLIENTE,CRM_CONTACTO,CRM_PROYECTO' union all 
select 'E', 'ELIMINADO', 'CRM_ROL,CRMUSUARIO,CRM_TOKEN,CRM_CLIENTE,CRM_CONTACTO,CRM_PROYECTO' union all 
select 'P', 'POR INICIAR', 'CRM_REUNION' union all 
select 'G', 'EN PROGRESO', 'CRM_REUNION' union all
select 'F', 'FINALIZADA', 'CRM_REUNION' union all
select 'C', 'CANCELADA', 'CRM_REUNION';

-- ROLES
insert into crm_rol (nombre,estado)
select 'ADMIN', 'A' union all
select 'OPERADOR', 'A';

-- USUARIO ADMIN
-- La contraseña es admin123
insert into crm_usuario (nombres,apellidos,correo,pwd,estado,fecha_creado,rolid)
values('Administrador','Sistema','admin@correo.com','YWRtaW4xMjM=','A',now(),1);
