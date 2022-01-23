import React, { useEffect, useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getClientes } from '../../../services/cliente.service';
import { getContactos } from '../../../services/contacto.service';
import { getCatalogo } from '../../../util/storage';
import { TitleBar } from '../../common/title-bar/TitleBar';
import { useAlert } from '../../hooks/useAlert';
import { useLoading } from '../../hooks/useLoading';

export const Contactos = () => {
    const alert = useAlert();
    const loading = useLoading();
    const navigate = useNavigate();
    
    const [ searchParams ] = useSearchParams();
    const [lista, setLista] = useState([]);
    const [cliente, setCliente] = useState({});
    const catalogo = getCatalogo();
    const clienteid = searchParams.get("clienteid");
    if(!clienteid) {
        window.location.href = '/clientes';
    }

    useEffect(() => obtenerContactos(), []);

    useEffect(() => {
        getClientes(clienteid).then(result=> {
            if(result.length === 0) {
                alert.mensajeInformativo('No se encontró el cliente.', () => navigate('/clientes'));
            } else {
                setCliente(result[0]);
            }
        }).catch(err => {
            console.log('err', err);
            alert.mensajeInformativo(err.mensaje, () => navigate('/clientes'));
        });
    }, [clienteid]);
    
    const obtenerContactos = async() => {
        loading.showLoader();
        getContactos(clienteid).then(resp => {
            loading.dismissLoader();
            setLista(resp);
        }).catch(err => {
            loading.dismissLoader();
            console.log('err', err);
            alert.mensajeInformativo(err.mensaje, () => navigate('/'));
        });
    }

    const handleCrear = () => navigate('/contactos/create/');
    const handleActualiza = (contactoid) => navigate(`/contactos/update/${contactoid}?clienteid=${clienteid}`);

    const obtenerEstado = (letra) => catalogo.listaEstado.find(e=>e.letra===letra).descripcion;
    const formatFecha = (fecha = Date) => `${fecha}`.replace('T', ' ').substring(0, 19);

    return (
        <Card style={{margin: '10px'}}>
            <TitleBar titulo={cliente.nombre ? `Contactos del cliente ${cliente.nombre}`: ''} clickCrear={handleCrear} />
            <Card style={{margin: '5px 10px'}}>
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Cargo</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Estado</th>
                        <th>Fecha Creado</th>
                        <th colSpan={2}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.length === 0 &&
                    <tr>
                        <td colSpan={9}>{`No se encontraron registros de contactos.`}</td>
                    </tr>}
                    {lista.map((contacto, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{contacto.nombre_contacto}</td>
                        <td>{contacto.cargo}</td>
                        <td>{contacto.telefono}</td>
                        <td>{contacto.correo}</td>
                        <td>{obtenerEstado(contacto.estado)}</td>
                        <td>{formatFecha(contacto.fecha_creado)}</td>
                        <td>
                            <Button onClick={() => handleActualiza(contacto.contactoid)}>Editar</Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </Card>
        </Card>
    )
};
