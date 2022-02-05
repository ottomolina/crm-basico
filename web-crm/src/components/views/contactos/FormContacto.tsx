import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { useAlert, useForm  } from '../../hooks';
import { InputComponent, SelectComponent } from '../../common';
import { getCatalogo } from '../../../util/storage';
import { Contacto } from '../../../models/Contacto';
import { addContacto, getContactos, updateContacto } from '../../../services/contacto.service';
import { ErrorHttp } from '../../../models/ErrorHttp';

export const FormContacto = () => {

    const alert = useAlert();
    const navigate = useNavigate();
    const { contactoid } = useParams();
    const [ searchParams ] = useSearchParams();
    const { state, onChange, setForm } = useForm(new Contacto());
    const estados = getCatalogo().listaEstado.filter((e:any)=>`${e.tabla}`.includes('CRM_CONTACTO'))
                                             .map((e:any) => { return {id: e.letra, valor: e.descripcion}});
    const clienteid = searchParams.get('clienteid');
    
    useEffect(() => {
        if(contactoid) {
            getContactos(undefined, +contactoid).then((result) => {
                if(result.length === 0) {
                    alert.error(new ErrorHttp(1, 'No se encontró el contacto.'));
                } else {
                    setForm(result[0]);
                }
            });
        }
    }, [contactoid])

    const handleGuardar = (event:any) => {
        event.preventDefault();
        alert.showLoader();
        let promise = undefined;
        const { ...contacto } = state;
        if(contactoid) {
            contacto.contactoid = +contactoid;
            promise = updateContacto(contacto);
        } else {
            contacto.clienteid = clienteid ? +clienteid : 0;
            promise = addContacto(contacto);
        }
        promise.then(resp => {
            alert.dismissLoader();
            alert.mensajeInformativo(`Contacto ${contactoid ? 'modificado':'creado'} exitosamente.`, () => {
                navigate(`/contactos?clienteid=${clienteid}`);
            });
        }).catch(err => {
            alert.dismissLoader();
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
                            disabled={alert.isLoading()}
                            onClick={handleGuardar}>Guardar</Button>
                    <alert.Loader />
                </Form>
                </Card.Body>
            </Card>
            </div>
        </>
    )
};
