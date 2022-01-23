import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { useAlert, useForm, useLoading  } from '../../hooks';
import { InputComponent } from '../../common';
import { getCatalogo, getUsuario } from '../../../util/storage';
import { TitleBar } from '../../common/title-bar/TitleBar';
import { updateUser } from '../../../services/usuario.service';

export const Perfil = () => {
    const usuario = getUsuario();
    const alert = useAlert();
    const loading = useLoading();
    const navigate = useNavigate();
    const { state, onChange } = useForm({...usuario, pwd:''});
    const roles = getCatalogo().listaRol;
    

    const handleGuardar = (event) => {
        event.preventDefault();
        loading.showLoader();
        let { pwd, ...user } = state;
        pwd = btoa(pwd);
        user.pwd = pwd;
        updateUser(user).then(resp => {
            loading.dismissLoader();
            alert.mensajeInformativo(`Los datos del perfil se han modificado exitosamente.`, () => {
                navigate('/');
            });
        }).catch(err => {
            loading.dismissLoader();
            console.log('err', err);
            alert.mensajeInformativo(err.mensaje, ()=>{});
        });
    }

    const getRol = (rolid) => roles.find(e => e.rolid = rolid).nombre;

    return (
        <>
            <alert.Notificacion />
            <div className='row justify-content-md-center'>
            <Card style={{width: '40%', minWidth: '410px', marginTop: '50px'}}>
                <TitleBar titulo={'Perfil'}/>
                <Card.Body>
                <Form>
                    <InputComponent controlid="nombres"
                                    label="Nombres:"
                                    placeholder="Ingresa al menos un nombre"
                                    value={state.nombres}
                                    onChange={e=>onChange(e.target.value, 'nombres')}/>
                                
                    <InputComponent controlid="apellidos"
                                    label="Apellidos:"
                                    placeholder="Ingresa al menos un apellido"
                                    value={state.apellidos}
                                    onChange={e=>onChange(e.target.value, 'apellidos')}/>

                    <InputComponent controlid="correo"
                                    type="email"
                                    label="Correo:"
                                    placeholder="Ingresa un correo válido"
                                    value={state.correo}
                                    disabled={true}
                                    onChange={e=>onChange(e.target.value, 'correo')}/>

                    <InputComponent controlid="pwd"
                                    type="password"
                                    label="Contraseña:"
                                    placeholder="Ingresa una contraseña"
                                    value={state.pwd}
                                    onChange={e=>onChange(e.target.value, 'pwd')}/>

                    <InputComponent controlid="rol"
                                    label="Rol:"
                                    value={getRol(state.rolid)}
                                    disabled={true} />

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
