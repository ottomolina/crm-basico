import React, { useEffect, useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Usuario } from '../../../models/Usuario';
import { deleteUser, getUsers } from '../../../services/usuario.service';
import { getCatalogo } from '../../../util/storage';
import { TitleBar } from '../../common/title-bar/TitleBar';
import { useAlert } from '../../hooks/useAlert';
import { useLoading } from '../../hooks/useLoading';

export const Usuarios = () => {
    const alert = useAlert();
    // const loading = useLoading();
    const navigate = useNavigate();

    const [lista, setLista] = useState<Array<Usuario>>([]);
    const catalogo = getCatalogo();

    useEffect(() => obtenerUsuarios(), []);
    
    const obtenerUsuarios = () => {
        alert.showLoader();
        getUsers().then(resp => {
            alert.dismissLoader();
            setLista(resp);
        }).catch(err => {
            alert.dismissLoader();
            console.log('err getUsers', err);
            alert.mensajeInformativo(err.mensaje, () => navigate('/'));
        });
    }

    const handleActualiza = (usuarioid: number) => navigate(`/usuarios/update/${usuarioid}`);

    const handleElimina = (usuarioid: number) => {
        alert.confirm('¿Estás seguro de realizar esta acción?', () => {
            deleteUser(usuarioid).then(resp => {
                alert.mensajeInformativo('Usuario eliminado exitosamente.', () => {
                    obtenerUsuarios();
                })
            }).catch(err => {
                console.log('err deleteUser', err);
                alert.error(err);
            });
        });
    }

    const obtenerEstado = (letra:string) => catalogo.listaEstado.find((e:any)=>e.letra===letra).descripcion;
    const obtenerRol = (id:number) => catalogo.listaRol.find((e:any)=>e.rolid===id).nombre;
    const formatFecha = (fecha: Date) => `${fecha}`.replace('T', ' ').substring(0, 19);

    const handleCrear = () => navigate(`/usuarios/create`);

    return (
        <Card style={{margin: '10px'}}>
            <TitleBar titulo={'Usuarios'} clickCrear={handleCrear} />
            <Card style={{margin: '5px 10px'}}>
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Correo</th>
                        <th>Estado</th>
                        <th>Fecha Creado</th>
                        <th>Rol</th>
                        <th colSpan={2}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((user, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{user.nombres}</td>
                        <td>{user.apellidos}</td>
                        <td>{user.correo}</td>
                        <td>{obtenerEstado(user.estado)}</td>
                        <td>{formatFecha(user.fecha_creado)}</td>
                        <td>{obtenerRol(user.rolid)}</td>
                        <td>
                            <Button onClick={() => handleActualiza(user.usuarioid)}>Editar</Button>
                            {' '}
                            <Button onClick={() => handleElimina(user.usuarioid)}>Eliminar</Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </Card>
        </Card>
    )
};
