import React, { useEffect, useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getProyectos } from '../../../services/proyecto.service';
import { getCatalogo } from '../../../util/storage';
import { TitleBar } from '../../common/title-bar/TitleBar';
import { useAlert } from '../../hooks/useAlert';
import { useLoading } from '../../hooks/useLoading';

export const Proyectos = () => {
    const alert = useAlert();
    const loading = useLoading();
    const navigate = useNavigate();

    const [lista, setLista] = useState([]);
    const catalogo = getCatalogo();

    useEffect(() => obtenerProyectos(), []);
    
    const obtenerProyectos = async() => {
        loading.showLoader();
        getProyectos().then(resp => {
            loading.dismissLoader();
            setLista(resp);
        }).catch(err => {
            loading.dismissLoader();
            console.log('err', err);
            alert.mensajeInformativo(err.mensaje, () => navigate('/'));
        });
    }

    const handleCrear = () => navigate('/proyectos/create/');
    const handleActualiza = (proyectoid) => navigate(`/proyectos/update/${proyectoid}`);
    const handleReunion = (proyectoid) => navigate(`/reuniones?proyectoid=${proyectoid}`);

    const obtenerEstado = (letra) => catalogo.listaEstado.find(e=>e.letra===letra).descripcion;
    const formatFecha = (fecha = Date) => `${fecha}`.replace('T', ' ').substring(0, 19);

    return (
        <Card style={{margin: '10px'}}>
            <TitleBar titulo={'Proyectos'} clickCrear={handleCrear} />
            <Card style={{margin: '5px 10px'}}>
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Entrega</th>
                        <th>Valor</th>
                        <th>Estado</th>
                        <th>Fecha Creado</th>
                        <th colSpan={2}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.length === 0 &&
                    <tr>
                        <td colSpan={9}>{`No se encontraron registros de proyectos.`}</td>
                    </tr>}
                    {lista.map((proyecto, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{proyecto.nombre}</td>
                        <td>{proyecto.descripcion}</td>
                        <td>{proyecto.fecha_entrega}</td>
                        <td>{proyecto.valor}</td>
                        <td>{obtenerEstado(proyecto.estado)}</td>
                        <td>{formatFecha(proyecto.fecha_creado)}</td>
                        <td>
                            <Button onClick={() => handleReunion(proyecto.proyectoid)}>Reuniones</Button>{' '}
                            <Button onClick={() => handleActualiza(proyecto.proyectoid)}>Editar</Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </Card>
        </Card>
    )
};
