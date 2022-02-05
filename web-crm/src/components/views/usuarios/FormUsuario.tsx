import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { useAlert, useForm, useLoading  } from '../../hooks';
import { Usuario } from '../../../models/Usuario';
import { InputComponent, SelectComponent } from '../../common';
import { addUser, getUsers, updateUser } from '../../../services/usuario.service';
import { getCatalogo } from '../../../util/storage';
import { ErrorHttp } from '../../../models/ErrorHttp';

export const FormUsuario = () => {

    const alert = useAlert();
    const loading = useLoading();
    const navigate = useNavigate();
    const { usuarioid } = useParams();
    const { state, onChange, setForm } = useForm(new Usuario());
    const estados = getCatalogo().listaEstado.filter((e: any)=>`${e.tabla}`.includes('CRM_USUARIO'))
                                             .map((e: any) => { return {id: e.letra, valor: e.descripcion}});
    const roles = getCatalogo().listaRol.map((e: any) => { return {id: e.rolid, valor: e.nombre}});
    
    useEffect(() => {
        if(usuarioid) {
            getUsers(+usuarioid).then((result) => {
                if(result.length === 0) {
                    alert.error(new ErrorHttp(1, 'No se encontró el usuario.'));
                } else {
                    const usuario = result[0];
                    setForm(usuario);
                }
            });
        }
    }, [usuarioid])

    const handleGuardar = (event: any) => {
        event.preventDefault();
        loading.showLoader();
        let promise = undefined;
        if(usuarioid) {
            const { ...usuario } = state;
            usuario.usuarioid = +usuarioid;
            promise = updateUser(usuario);
        } else {
            promise = addUser(state);
        }
        promise.then(resp => {
            loading.dismissLoader();
            alert.mensajeInformativo(`Usuario ${usuarioid ? 'modificado':'creado'} exitosamente.`, () => {
                navigate('/usuarios');
            });
        }).catch(err => {
            loading.dismissLoader();
            console.log('err gerUsers', err);
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
                    <InputComponent controlid="nombres"
                                    label="Nombres:"
                                    placeholder="Ingresa al menos un nombre"
                                    value={state.nombres}
                                    onChange={(e: any) => onChange(e.target.value, 'nombres')}/>
                                    
                    <InputComponent controlid="apellidos"
                                    label="Apellidos:"
                                    placeholder="Ingresa al menos un apellido"
                                    value={state.apellidos}
                                    onChange={e=>onChange(e.target.value, 'apellidos')}/>

                    {!usuarioid &&
                    <InputComponent controlid="correo"
                                    type="email"
                                    label="Correo:"
                                    placeholder="Ingresa un correo válido"
                                    value={state.correo}
                                    onChange={e=>onChange(e.target.value, 'correo')}/>}

                    <InputComponent controlid="pwd"
                                    type="password"
                                    label="Contraseña:"
                                    placeholder="Ingresa una contraseña"
                                    value={state.pwd}
                                    onChange={e=>onChange(e.target.value, 'pwd')}
                                    subText={usuarioid ? '': 'Deberá ser cambiada en el primer inicio de sesión.'} />

                    {/* {!usuarioid && 
                    <SelectComponent controlid="rol"
                                    label="Rol:"
                                    placeholder="Selecciona un rol"
                                    value={state.rol}
                                    lista={roles}
                                    onChange={e=>onChange(e.target.value, 'rolid')}/>} */}

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
