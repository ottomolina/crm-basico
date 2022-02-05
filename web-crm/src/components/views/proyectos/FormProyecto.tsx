import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { useAlert, useForm  } from '../../hooks';
import { InputComponent, SelectComponent, TextAreaComponent } from '../../common';
import { getCatalogo } from '../../../util/storage';
import { Proyecto } from '../../../models/Proyecto';
import { addProyecto, getProyectos, updateProyecto } from '../../../services/proyecto.service';
import { getClientes } from '../../../services/cliente.service';
import { getContactos } from '../../../services/contacto.service';
import { Cliente } from '../../../models/Cliente';
import { Contacto } from '../../../models/Contacto';
import { ErrorHttp } from '../../../models/ErrorHttp';
import { SelectItem } from '../../common/form-select/select.component';

export const FormProyecto = () => {

    const alert = useAlert();
    const navigate = useNavigate();
    const { proyectoid } = useParams();
    const { state, onChange, setForm } = useForm(new Proyecto());
    const [ listaCliente, setListaCliente ] = useState<Array<SelectItem>>([]);
    const [ listaContacto, setListaContacto ] = useState<Array<SelectItem>>([]);
    const estados = getCatalogo().listaEstado.filter((e:any)=>`${e.tabla}`.includes('CRM_PROYECTO'))
                                             .map((e:any) => { return {id: e.letra, valor: e.descripcion}});
    
    useEffect(() => {
        if(proyectoid) {
            getProyectos(+proyectoid).then((result) => {
                if(result.length === 0) {
                    alert.error(new ErrorHttp(1, 'No se encontró el proyecto.'));
                } else {
                    const proyecto = result[0];
                    setForm(proyecto);
                    cargarContactos(proyecto.contactoid);
                }
            });
        }
        getClientes().then(result => {
            if(result.length === 0) {
                alert.error(new ErrorHttp(1, 'No se encontraron clientes.'));
            } else {
                const lista = result.map((e:any)=> {return {id:e.clienteid, valor: e.nombre}});
                setListaCliente(lista);
            }
        })
    }, [proyectoid])

    const handleGuardar = (event:any) => {
        event.preventDefault();
        alert.showLoader();
        let promise = undefined;
        const { ...proyecto } = state;
        if(proyectoid) {
            proyecto.proyectoid = +proyectoid;
            promise = updateProyecto(proyecto);
        } else {
            promise = addProyecto(proyecto);
        }
        promise.then(resp => {
            alert.dismissLoader();
            alert.mensajeInformativo(`Proyecto ${proyectoid ? 'modificado':'creado'} exitosamente.`, () => {
                navigate('/proyectos');
            });
        }).catch(err => {
            alert.dismissLoader();
            console.log('err', err);
            alert.mensajeInformativo(err.mensaje, ()=>{});
        });
    }

    const handleSelectCliente = (ev:any) => {
        onChange(ev.target.value, 'clienteid');
        cargarContactos(ev.target.value);
    }
    
    const cargarContactos = (clienteid:number) => {
        getContactos(clienteid).then(result => {
            if(result.length === 0) {
                setListaContacto([]);
                alert.info('Este cliente no tiene contactos agregados.');
            } else {
                const lista = result.map((e:any)=> {return {id:e.contactoid, valor: e.nombre_contacto}});
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
