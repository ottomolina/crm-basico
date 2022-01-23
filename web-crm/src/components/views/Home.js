import React, { Fragment, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { closeSesion, getUsuario, isLogged, setCatalogo } from '../../util/storage';
import { Menu } from '../common/menu/Menu';
import { useAlert } from '../hooks/useAlert';
import { useLoading } from '../hooks/useLoading';
import { Dashboard } from './dashboard/Dashboard';
import { Usuarios } from './usuarios/Usuarios';
import AuthService from '../../services/auth.service';
import { obtenerCatalogo } from '../../services/catalogo.service';
import { FormUsuario } from './usuarios/FormUsuario';
import { Clientes } from './clientes/Clientes';
import { FormCliente } from './clientes/FormCliente';
import { Proyectos } from './proyectos/Proyectos';
import { FormProyecto } from './proyectos/FormProyecto';
import { Contactos } from './contactos/Contactos';
import { FormContacto } from './contactos/FormContacto';
import { Reuniones } from './reuniones/Reuniones';
import { FormReunion } from './reuniones/FormReunion';
import { Perfil } from './usuarios/Perfil';

export const Home = () => {
  const alert = useAlert();
  const loading = useLoading();
  const navigate = useNavigate();
  const isLog = isLogged();
  if(!isLog) {
    window.location.href = 'login';
  }
  const usuario = getUsuario();

  useEffect(() => {
    loading.showLoader();
    obtenerCatalogo().then(resp => {
      loading.dismissLoader();
      setCatalogo(resp);
    }).catch(err => {
      loading.dismissLoader();
      console.log('err catalogo', err);
      alert.error(err);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const salir = () => {
    loading.showLoader();
    AuthService.logout().then(resp => {
      loading.dismissLoader();
      closeSesion();
      setTimeout(() => navigate('login'), 800);
    }).catch(err => {
      loading.dismissLoader();
      console.log('err', err);
      alert.error(err);
    })
  }

  return ( 
    <>
      <alert.Notificacion />
      <Menu nombres={usuario.nombres} rolid={usuario.rolid} cerrarSesion={salir} />
      <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="usuarios" element={<Usuarios />} />
          <Route exact path="usuarios/create" element={<FormUsuario />} />
          <Route exact path="usuarios/update/:usuarioid" element={<FormUsuario />} />
          <Route exact path="perfil" element={<Perfil />} />

          <Route exact path="clientes" element={<Clientes />} />
          <Route exact path="clientes/create" element={<FormCliente />} />
          <Route exact path="clientes/update/:clienteid" element={<FormCliente />} />

          <Route exact path="proyectos" element={<Proyectos />} />
          <Route exact path="proyectos/create" element={<FormProyecto />} />
          <Route exact path="proyectos/update/:proyectoid" element={<FormProyecto />} />

          <Route exact path="contactos" element={<Contactos />} />
          <Route exact path="contactos/create" element={<FormContacto />} />
          <Route exact path="contactos/update/:contactoid" element={<FormContacto />} />

          <Route exact path="reuniones" element={<Reuniones />} />
          <Route exact path="reuniones/create" element={<FormReunion />} />
          <Route exact path="reuniones/update/:reunionid" element={<FormReunion />} />

          <Route exact path="*" element={<div>Página no encontrada</div>} />
      </Routes>
      <loading.Loader />
    </>
  );
};
