import React, { useRef } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Usuario } from '../../../models/Usuario';
import { setLogged } from '../../../util/storage';
import { useAlert } from '../../hooks/useAlert';
import { useForm } from '../../hooks/useForm';
import { useLoading } from '../../hooks/useLoading';
import AuthService from '../../../services/auth.service';

export const Login = () => {
  const alert = useAlert();
  const loading = useLoading();
  const navigate = useNavigate();
  const { state, onChange } = useForm(new Usuario());
  const chkSesion = useRef();

  const handleLogin = (event) => {
    event.preventDefault();
    loading.showLoader();
    let { pwd, ...user } = state;
    pwd = btoa(pwd);
    user.pwd = pwd;
    AuthService.login(user).then(resp => {
      loading.dismissLoader();
      console.log('login', resp);
      setLogged(resp.token, resp.usuario)
      setTimeout(() => navigate('/'), 800);
    }).catch(err => {
      loading.dismissLoader();
      console.log('err login', err);
      alert.error(err);
    })
  }

  return (
    <>
      <alert.Notificacion />
      <div className='row justify-content-md-center'>
        <Card style={{width: '40%', minWidth: '410px', marginTop: '50px'}}>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo:</Form.Label>
                <Form.Control type="email"
                              placeholder="Ingresa tu correo"
                              value={state.correo}
                              onChange={e => onChange(e.target.value, 'correo')} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control type="password"
                              placeholder="Ingresa tu contraseña"
                              value={state.pwd}
                              onChange={e => onChange(e.target.value, 'pwd')} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Mantener sesión" ref={chkSesion} />
              </Form.Group>
              <Button variant="primary" onClick={handleLogin} disabled={loading.isLoading()}>Acceder</Button>
              <loading.Loader />
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
