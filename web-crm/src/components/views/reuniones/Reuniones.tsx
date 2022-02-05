import { useEffect, useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Reunion } from '../../../models/Reunion';
import { getReuniones } from '../../../services/reunion.service';
import { getCatalogo } from '../../../util/storage';
import { TitleBar } from '../../common/title-bar/TitleBar';
import { useAlert } from '../../hooks/';

export const Reuniones = () => {
    const alert = useAlert();
    const navigate = useNavigate();
    const [lista, setLista] = useState<Array<Reunion>>([]);
    const catalogo = getCatalogo();

    useEffect(() => getData(), []);
    
    const getData = () => {
        alert.showLoader();
        obtenerReuniones().then(() => {
            alert.dismissLoader();
        }).catch(err => {
            alert.dismissLoader();
            console.log('err', err);
            alert.mensajeInformativo(err.mensaje, () => navigate('/'));
        });
    }

    const obtenerReuniones = async() => {
        const resp = await getReuniones();
        if(resp.length === 0) {
            alert.info(`No se encontraron reuniones.`);
        }
        setLista(resp);
    }

    const handleCrear = () => navigate(`/reuniones/create`);
    const handleActualiza = (reunionid: number) => navigate(`/reuniones/update/${reunionid}`);

    const obtenerEstado = (letra: string) => catalogo.listaEstado.find((e:any)=>e.letra===letra).descripcion;
    const formatFecha = (fecha: Date) => `${fecha}`.replace('T', ' ').substring(0, 19);

    return (
        <Card style={{margin: '10px'}}>
            <TitleBar titulo={'Reuniones'} clickCrear={handleCrear} />
            <Card style={{margin: '5px 10px'}}>
                <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Estado</th>
                        <th>Fecha Creado</th>
                        <th>Proyecto</th>
                        <th>Contacto</th>
                        <th colSpan={2}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.length === 0 &&
                    <tr>
                        <td colSpan={8}>{`No se encontraron reuniones.`}</td>
                    </tr>}
                    {lista.map((reunion, index) => (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{formatFecha(reunion.fecha_reunion)}</td>
                        <td>{obtenerEstado(reunion.estado)}</td>
                        <td>{formatFecha(reunion.fecha_creado)}</td>
                        <td>{reunion.nombre_proyecto}</td>
                        <td>{reunion.nombre_contacto}</td>
                        <td>
                            <Button onClick={() => handleActualiza(reunion.proyectoid)}>Editar</Button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </Table>
            </Card>
        </Card>
    )
};
