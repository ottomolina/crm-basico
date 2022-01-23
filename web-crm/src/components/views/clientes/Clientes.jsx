import React, { useEffect, useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getClientes } from '../../../services/cliente.service';
import { getCatalogo } from '../../../util/storage';
import { TitleBar } from '../../common/title-bar/TitleBar';
import { useAlert } from '../../hooks/useAlert';
import { useLoading } from '../../hooks/useLoading';

export const Clientes = () => {
    const alert = useAlert();
    const loading = useLoading();
    const navigate = useNavigate();

    const [lista, setLista] = useState([]);
    const catalogo = getCatalogo();

    useEffect(() => obtenerClientes(), []);
    
    const obtenerClientes = async() => {
        loading.showLoader();
        getClientes().then(resp => {
            loading.dismissLoader();
            setLista(resp);
        }).catch(err => {
            loading.dismissLoader();
            console.log('err getClientes', err);
            alert.mensajeInformativo(err.mensaje, () => navigate('/'));
        });
    }

    const handleCrear = () => navigate('/clientes/create/');
    const handleActualiza = (clienteid) => navigate(`/clientes/update/${clienteid}`);
    const handleVerContactos = (clienteid) => navigate(`/contactos?clienteid=${clienteid}`);

    const obtenerEstado = (letra) => catalogo.listaEstado.find(e=>e.letra===letra).descripcion;
    const formatFecha = (fecha = Date) => `${fecha}`.replace('T', ' ').substring(0, 19);

    return (
        <Card style={{margin: '10px'}}>
            <TitleBar titulo={'Clientes'} clickCrear={handleCrear} />
            <Card style={{margin: '5px 10px'}}>
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Website</th>
                        <th>Correo</th>
                        <th>Estado</th>
                        <th>Fecha Creado</th>
                        <th colSpan={2}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.length === 0 &&
                    <tr>
                        <td colSpan={9}>{`No se encontraron registros de clientes.`}</td>
                    </tr>}
                    {lista.map((cliente, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{cliente.nombre}</td>
                        <td>{cliente.telefono}</td>
                        <td>{cliente.website}</td>
                        <td>{cliente.correo}</td>
                        <td>{obtenerEstado(cliente.estado)}</td>
                        <td>{formatFecha(cliente.fecha_creado)}</td>
                        <td>
                            <Button onClick={() => handleVerContactos(cliente.clienteid)}>Contactos</Button>{' '}
                            <Button onClick={() => handleActualiza(cliente.clienteid)}>Editar</Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </Card>
        </Card>
    )
};
