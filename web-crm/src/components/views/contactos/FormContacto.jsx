import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { useAlert, useForm, useLoading  } from '../../hooks';
import { InputComponent, SelectComponent } from '../../common';
import { getCatalogo } from '../../../util/storage';
import { Contacto } from '../../../models/Contacto';
import { addContacto, getContactos, updateContacto } from '../../../services/contacto.service';

export const FormContacto = () => {

    const alert = useAlert();
    const loading = useLoading();
    const navigate = useNavigate();
    const { contactoid } = useParams();
    const [ searchParams ] = useSearchParams();
    const { state, onChange, setForm } = useForm(new Contacto());
    const estados = getCatalogo().listaEstado.filter(e=>`${e.tabla}`.includes('CRM_CONTACTO'))
                                             .map(e => { return {id: e.letra, valor: e.descripcion}});
    const clienteid = searchParams.get('clienteid');
    
    useEffect(() => {
        if(contactoid) {
            getContactos(undefined, contactoid).then((result) => {
                if(result.length === 0) {
                    alert.error({mensaje: 'No se encontró el contacto.'});
                } else {
                    setForm(result[0]);
                }
            });
        }
    }, [contactoid])

    const handleGuardar = (event) => {
        event.preventDefault();
        loading.showLoader();
        let promise = undefined;
        if(contactoid) {
            promise = updateContacto({...state, contactoid});
        } else {
            promise = addContacto({...state, clienteid});
        }
        promise.then(resp => {
            loading.dismissLoader();
            alert.mensajeInformativo(`Contacto ${contactoid ? 'modificado':'creado'} exitosamente.`, () => {
                navigate(`/contactos?clienteid=${clienteid}`);
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
                                    value={state.nombre_contacto}
                                    onChange={e=>onChange(e.target.value, 'nombre_contacto')}/>
                                    
                    <InputComponent controlid="cargo"
                                    label="Cargo:"
                                    placeholder="Ingresa el cargo del contacto"
                                    value={state.cargo}
                                    onChange={e=>onChange(e.target.value, 'cargo')}/>

                    <InputComponent controlid="telefono"
                                    label="Teléfono:"
                                    placeholder="Ingresa un teléfono"
                                    value={state.telefono}
                                    onChange={e=>onChange(e.target.value, 'telefono')}/>

                    <InputComponent controlid="correo"
                                    type="email"
                                    label="Correo:"
                                    placeholder="Ingresa un correo válido"
                                    value={state.correo}
                                    onChange={e=>onChange(e.target.value, 'correo')}/>

                    {contactoid && 
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
