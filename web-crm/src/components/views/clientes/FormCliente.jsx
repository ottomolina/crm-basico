import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { useAlert, useForm, useLoading  } from '../../hooks';
import { InputComponent, SelectComponent } from '../../common';
import { getCatalogo } from '../../../util/storage';
import { Cliente } from '../../../models/Cliente';
import { addCliente, getClientes, updateCliente } from '../../../services/cliente.service';

export const FormCliente = () => {

    const alert = useAlert();
    const loading = useLoading();
    const navigate = useNavigate();
    const { clienteid } = useParams();
    const { state, onChange, setForm } = useForm(new Cliente());
    const estados = getCatalogo().listaEstado.filter(e=>`${e.tabla}`.includes('CRM_CLIENTE'))
                                             .map(e => { return {id: e.letra, valor: e.descripcion}});
    
    useEffect(() => {
        if(clienteid) {
            getClientes(clienteid).then((result) => {
                if(result.length === 0) {
                    alert.error({mensaje: 'No se encontró el cliente.'});
                } else {
                    const cliente = result[0];
                    setForm(cliente);
                }
            });
        }
    }, [clienteid])

    const handleGuardar = (event) => {
        event.preventDefault();
        loading.showLoader();
        let promise = undefined;
        if(clienteid) {
            promise = updateCliente({...state, clienteid});
        } else {
            promise = addCliente(state);
        }
        promise.then(resp => {
            loading.dismissLoader();
            alert.mensajeInformativo(`Cliente ${clienteid ? 'modificado':'creado'} exitosamente.`, () => {
                navigate('/clientes');
            });
        }).catch(err => {
            loading.dismissLoader();
            console.log('err', err);
            alert.mensajeInformativo(err.mensaje, ()=>{});
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
                                    
                    <InputComponent controlid="telefono"
                                    label="Teléfono:"
                                    placeholder="Ingresa un teléfono"
                                    value={state.telefono}
                                    onChange={e=>onChange(e.target.value, 'telefono')}/>

                    <InputComponent controlid="website"
                                    label="Website:"
                                    placeholder="Ingresa la página web del cliente"
                                    value={state.website}
                                    onChange={e=>onChange(e.target.value, 'website')}/>

                    {!clienteid &&
                    <InputComponent controlid="correo"
                                    type="email"
                                    label="Correo:"
                                    placeholder="Ingresa un correo válido"
                                    value={state.correo}
                                    onChange={e=>onChange(e.target.value, 'correo')}/>}

                    {clienteid && 
                    <SelectComponent controlid="estado"
                                    label="Estado:"
                                    placeholder="Selecciona un estado"
                                    value={state.estado}
                                    lista={estados}
                                    onChange={e=>onChange(e.target.value, 'estado')}/>}

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
