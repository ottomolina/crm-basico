import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { useAlert, useForm, useLoading  } from '../../hooks';
import { InputComponent, SelectComponent } from '../../common';
import { getCatalogo } from '../../../util/storage';
import { Reunion } from '../../../models/Reunion';
import { getProyectos } from '../../../services/proyecto.service';
import { addReunion, getReuniones, updateReunion } from '../../../services/reunion.service';
import { getContactos } from '../../../services/contacto.service';
import { ErrorHttp } from '../../../models/ErrorHttp';

export const FormReunion = () => {
    const alert = useAlert();
    // const loading = useLoading();
    const navigate = useNavigate();
    const { reunionid } = useParams();

    const [ proyectos, setProyectos ] = useState([]);
    const [ contactos, setContactos ] = useState([]);

    const { state, onChange, setForm } = useForm(new Reunion());
    const estados = getCatalogo().listaEstado.filter((e:any)=>`${e.tabla}`.includes('CRM_REUNION'))
                                             .map((e:any) => { return {id: e.letra, valor: e.descripcion}});
    
    useEffect(() => {
        if(reunionid) {
            alert.showLoader();
            getReuniones(+reunionid).then((result) => {
                alert.dismissLoader();
                if(result.length === 0) {
                    alert.error(new ErrorHttp(1, 'No se encontró la reunión.'));
                } else {
                    const lista = result.map(e=> {
                        e.hora = `${e.fecha_reunion}`.substring(11);
                        // e.fecha_reunion = new Date(`${e.fecha_reunion}`.substring(0,10));
                        console.log(`${e.fecha_reunion}`.substring(0,10));
                        return e;
                    });
                    console.log('lista', lista);
                    setForm(result[0]);
                }
            });
        }
    }, [reunionid]);

    useEffect(() => {
        alert.showLoader();
        getContactos().then(result => {
            alert.dismissLoader();
            if(result.length === 0) {
                alert.error(new ErrorHttp(1, 'No se encontraron contactos.'));
            } else {
                const lista = result.map((e:any) => ( {id: e.contactoid, valor: e.nombre_contacto } ));
                setContactos(lista);
            }
        });
    }, []);

    const handleGuardar = (event:any) => {
        event.preventDefault();
        console.log('state', state);
        alert.showLoader();
        let promise = undefined;
        let { ...reunion } = state;
        reunion.fecha_reunion = new Date(`${reunion.fecha_reunion} ${reunion.hora}`);
        if(reunionid) {
            reunion.reunionid = +reunionid;
            promise = updateReunion(reunion);
        } else {
            promise = addReunion(reunion);
        }
        promise.then(resp => {
            alert.dismissLoader();
            alert.mensajeInformativo(`Reunión ${reunionid ? 'modificada':'creada'} exitosamente.`, () => {
                navigate(`/reuniones`);
            });
        }).catch(err => {
            alert.dismissLoader();
            console.log('err', err);
            alert.mensajeInformativo(err.mensaje, ()=>{});
        });
    }

    const handleSelectContacto = (ev:any) => {
        onChange(ev.target.value, 'contactoid')
        alert.showLoader();
        getProyectos(0,0,ev.target.value).then(result => {
            alert.dismissLoader();
            if(result.length === 0) {
                alert.error(new ErrorHttp(1, 'No se encontraron proyectos.'));
            } else {
                const lista = result.map((e:any) => ( {id: e.proyectoid, valor: e.nombre } ));
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
                                    value={`${state.fecha_reunion}`.substring(0,10)}
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

                    {/* {!reunionid && */}
                    <SelectComponent controlid="contacto"
                                    label="Contactos:"
                                    placeholder="Selecciona un contacto"
                                    value={state.contactoid}
                                    lista={contactos}
                                    onChange={handleSelectContacto}/>
                        {/* && */}
                    <SelectComponent controlid="proyecto"
                                    label="Proyecto:"
                                    placeholder="Selecciona un proyecto"
                                    value={state.proyectoid}
                                    lista={proyectos}
                                    onChange={e=>onChange(e.target.value, 'proyectoid')}/>
                    {/* } */}

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
