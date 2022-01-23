import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { useAlert, useForm, useLoading  } from '../../hooks';
import { InputComponent, SelectComponent } from '../../common';
import { getCatalogo } from '../../../util/storage';
import { Reunion } from '../../../models/Reunion';
import { getProyectos } from '../../../services/proyecto.service';
import { addReunion, getReuniones, updateReunion } from '../../../services/reunion.service';
import { getContactos } from '../../../services/contacto.service';

export const FormReunion = () => {
    const alert = useAlert();
    const loading = useLoading();
    const navigate = useNavigate();
    const { reunionid } = useParams();

    const [ proyectos, setProyectos ] = useState([]);
    const [ contactos, setContactos ] = useState([]);

    const { state, onChange, setForm } = useForm(new Reunion());
    const estados = getCatalogo().listaEstado.filter(e=>`${e.tabla}`.includes('CRM_REUNION'))
                                             .map(e => { return {id: e.letra, valor: e.descripcion}});
    
    useEffect(() => {
        if(reunionid) {
            loading.showLoader();
            getReuniones(reunionid).then((result) => {
                loading.dismissLoader();
                if(result.length === 0) {
                    alert.error({mensaje: 'No se encontró la reunión.'});
                } else {
                    const lista = result.map(e=> {
                        e.hora = e.fecha_reunion.substring(11);
                        e.fecha_reunion = e.fecha_reunion.substring(0,10);
                        return e;
                    });
                    console.log('lista', lista);
                    setForm(result[0]);
                }
            });
        }
    }, [reunionid]);

    useEffect(() => {
        loading.showLoader();
        getContactos().then(result => {
            loading.dismissLoader();
            if(result.length === 0) {
                alert.error({mensaje: 'No se encontraron contactos.'});
            } else {
                const lista = result.map(e => ( {id: e.contactoid, valor: e.nombre_contacto } ));
                setContactos(lista);
            }
        });
    }, []);

    const handleGuardar = (event) => {
        event.preventDefault();
        console.log('state', state);
        loading.showLoader();
        let promise = undefined;
        let { fecha_reunion, hora } = state;
        fecha_reunion = `${fecha_reunion} ${hora}`;
        if(reunionid) {
            promise = updateReunion({...state, fecha_reunion, reunionid});
        } else {
            promise = addReunion({...state, fecha_reunion});
        }
        promise.then(resp => {
            loading.dismissLoader();
            alert.mensajeInformativo(`Reunión ${reunionid ? 'modificada':'creada'} exitosamente.`, () => {
                navigate(`/reuniones`);
            });
        }).catch(err => {
            loading.dismissLoader();
            console.log('err', err);
            alert.mensajeInformativo(err.mensaje, ()=>{});
        });
    }

    const handleSelectContacto = (ev) => {
        onChange(ev.target.value, 'contactoid')
        loading.showLoader();
        getProyectos(0,0,ev.target.value).then(result => {
            loading.dismissLoader();
            if(result.length === 0) {
                alert.error({mensaje: 'No se encontraron proyectos.'});
            } else {
                const lista = result.map(e => ( {id: e.proyectoid, valor: e.nombre } ));
                setProyectos(lista);
            }
        });
    }

    return (
        <>
            <alert.Notificacion />
            <div className='row justify-content-md-center'>
            <Card style={{width: '40%', minWidth: '410px', marginTop: '50px'}}>
                <Card.Body>
                <Form>
                    <InputComponent controlid="fecha_reunion"
                                    label="Fecha:"
                                    type="date"
                                    placeholder="Selecciona una fecha"
                                    value={state.fecha_reunion}
                                    onChange={e=>onChange(e.target.value, 'fecha_reunion')}/>

                    <InputComponent controlid="hora"
                                    type="time"
                                    label="Hora:"
                                    placeholder="Ingresa una hora"
                                    value={state.hora}
                                    onChange={e=>onChange(e.target.value, 'hora')}/>

                    {reunionid && 
                    <SelectComponent controlid="estado"
                                    label="Estado:"
                                    placeholder="Selecciona un estado"
                                    value={state.estado}
                                    lista={estados}
                                    onChange={e=>onChange(e.target.value, 'estado')}/>}

                    {!reunionid &&
                    <SelectComponent controlid="contacto"
                                    label="Contactos:"
                                    placeholder="Selecciona un contacto"
                                    value={state.contactoid}
                                    lista={contactos}
                                    onChange={handleSelectContacto}/>
                        &&
                    <SelectComponent controlid="proyecto"
                                    label="Proyecto:"
                                    placeholder="Selecciona un proyecto"
                                    value={state.proyectoid}
                                    lista={proyectos}
                                    onChange={e=>onChange(e.target.value, 'proyectoid')}/>
                    }

                    <Button variant="primary"
                            disabled={loading.isLoading()}
                            onClick={handleGuardar}>Guardar</Button>
                    <loading.Loader />
                </Form>
                </Card.Body>
            </Card>
            </div>
        </>
    )
};
