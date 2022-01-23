import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { useAlert, useForm, useLoading  } from '../../hooks';
import { InputComponent, SelectComponent } from '../../common';
import { getCatalogo } from '../../../util/storage';
import { Proyecto } from '../../../models/Proyecto';
import { addProyecto, getProyectos, updateProyecto } from '../../../services/proyecto.service';
import { TextAreaComponent } from '../../common/form-area/input-area.component';
import { getClientes } from '../../../services/cliente.service';
import { getContactos } from '../../../services/contacto.service';

export const FormProyecto = () => {

    const alert = useAlert();
    const loading = useLoading();
    const navigate = useNavigate();
    const { proyectoid } = useParams();
    const { state, onChange, setForm } = useForm(new Proyecto());
    const [ listaCliente, setListaCliente ] = useState([]);
    const [ listaContacto, setListaContacto ] = useState([]);
    const estados = getCatalogo().listaEstado.filter(e=>`${e.tabla}`.includes('CRM_PROYECTO'))
                                             .map(e => { return {id: e.letra, valor: e.descripcion}});
    
    useEffect(() => {
        if(proyectoid) {
            getProyectos(proyectoid).then((result) => {
                if(result.length === 0) {
                    alert.error({mensaje: 'No se encontró el proyecto.'});
                } else {
                    const proyecto = result[0];
                    setForm(proyecto);
                    cargarContactos(proyecto.contactoid);
                }
            });
        }
        getClientes().then(result => {
            if(result.length === 0) {
                alert.error({mensaje: 'No se encontraron clientes.'});
            } else {
                const lista = result.map(e=> {return {id:e.clienteid, valor: e.nombre}});
                setListaCliente(lista);
            }
        })
    }, [proyectoid])

    const handleGuardar = (event) => {
        event.preventDefault();
        loading.showLoader();
        let promise = undefined;
        if(proyectoid) {
            promise = updateProyecto({...state, proyectoid});
        } else {
            promise = addProyecto(state);
        }
        promise.then(resp => {
            loading.dismissLoader();
            alert.mensajeInformativo(`Proyecto ${proyectoid ? 'modificado':'creado'} exitosamente.`, () => {
                navigate('/proyectos');
            });
        }).catch(err => {
            loading.dismissLoader();
            console.log('err', err);
            alert.mensajeInformativo(err.mensaje, ()=>{});
        });
    }

    const handleSelectCliente = (ev) => {
        onChange(ev.target.value, 'clienteid');
        cargarContactos(ev.target.value);
    }
    
    const cargarContactos = (clienteid) => {
        getContactos(clienteid).then(result => {
            if(result.length === 0) {
                setListaContacto([]);
                alert.info('Este cliente no tiene contactos agregados.');
            } else {
                const lista = result.map(e=> {return {id:e.contactoid, valor: e.nombre_contacto}});
                setListaContacto(lista);
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
                    <InputComponent controlid="nombre"
                                    label="Nombre:"
                                    placeholder="Ingresa un nombre"
                                    value={state.nombre}
                                    onChange={e=>onChange(e.target.value, 'nombre')}/>

                    <TextAreaComponent controlid="descripcion"
                                    label="Descripción:"
                                    placeholder="Ingresa una breve descripción"
                                    value={state.descripcion}
                                    onChange={e=>onChange(e.target.value, 'descripcion')}/>
                                    
                    <InputComponent controlid="entrega"
                                    label="Entrega:"
                                    type="date"
                                    placeholder="Selecciona una fecha"
                                    value={state.fecha_entrega}
                                    onChange={e=>onChange(e.target.value, 'fecha_entrega')}/>

                    <InputComponent controlid="valor"
                                    label="Valor:"
                                    type="number"
                                    placeholder="Ingresa el monto del proyecto"
                                    value={state.valor}
                                    onChange={e=>onChange(e.target.value, 'valor')}/>

                    {proyectoid && 
                    <SelectComponent controlid="estado"
                                    label="Estado:"
                                    placeholder="Selecciona un estado"
                                    value={state.estado}
                                    lista={estados}
                                    onChange={e=>onChange(e.target.value, 'estado')}/>}

                    <SelectComponent controlid="cliente"
                                    label="Cliente:"
                                    placeholder="Selecciona un cliente"
                                    value={state.clienteid}
                                    lista={listaCliente}
                                    onChange={handleSelectCliente}/>

                    <SelectComponent controlid="contacto"
                                    label="Contacto:"
                                    placeholder="Selecciona un contacto"
                                    value={state.contactoid}
                                    lista={listaContacto}
                                    onChange={e=>onChange(e.target.value, 'contactoid')}/>

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
