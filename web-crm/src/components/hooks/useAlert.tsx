import { CSSProperties, useState } from 'react';
import { Spinner, Toast, ToastContainer } from 'react-bootstrap';    
import { confirmAlert } from 'react-confirm-alert';
import { ErrorHttp } from '../../models/ErrorHttp';
// import { closeSesion } from '../../util/storage';

const loaderStyles: CSSProperties = {
  position: 'absolute',
  top: 'calc(50% - 4em)',
  left: 'calc(50% - 4em)'
}

const divParent: CSSProperties = {
  position: 'absolute',
  background: '#FFFFFF',
  opacity: 0.4,
  bottom: 0,
  right: 0,
  left: 0,
  top: 0,
  zIndex: 1
}

export const useAlert = () => {

  const [show, setShow] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [titulo, setTitulo] = useState('');
  // const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const Loader = () => {
    if(loading) { 
      return (
        <div style={divParent}>
          <Spinner animation="border" style={loaderStyles} />
        </div>
      )
    } else {
      return <></>
    }
  } 

  const Notificacion = () => {
    return ( 
      <ToastContainer position='bottom-end' className="p-3" style={{display: show ? '' : 'none'}}>
        <Toast show={show} onClose={toggleShow}>
          <Toast.Header>
            <strong className="me-auto">{titulo}</strong>
          </Toast.Header>
          <Toast.Body>{mensaje}</Toast.Body>
        </Toast>
      </ToastContainer>
    )
  }

  const info = (mensaje: string) => mostrarAlerta(mensaje, 'Información');
  const warn = (mensaje: string) => mostrarAlerta(mensaje, 'Alerta');
  const error = (mensaje: ErrorHttp) => {
    mostrarAlerta(mensaje.mensaje, 'Error');
    // if(mensaje.sesion === false) {
    //     setTimeout(() => {
    //         closeSesion();
    //         window.location.href = '/';
    //     }, 4000);
    // }
  }
  
  const mostrarAlerta = (mensaje: string, titulo: string = '') => {
    if(!show) {
      setTitulo(titulo);
      setMensaje(mensaje);
      setShow(true);
      setTimeout(() => setShow(false) , 4000);
    }
  }

  // const mostrarModal = () => setShowModal(true);
  // const cerrarModal = () => setShowModal(false);

  const confirm = (
    mensaje: string,
    actionYes: () => void,
    actionNo?: () => void
  ) => {
    confirmAlert({
      title: 'Confirma esta acción',
      message: mensaje,
      buttons: [
        {
          label: 'Sí',
          onClick: actionYes
        },
        {
          label: 'No',
          onClick: actionNo ? actionNo : () => { }
        }
      ]
    });
  };

  const mensajeInformativo = ( mensaje: string, actionOk: () => void) => {
    confirmAlert({
      title: 'Información',
      message: mensaje,
      buttons: [ { label: 'Ok', onClick: actionOk } ]
    });
  };

  const isLoading = () => loading;

  const showLoader = () => setLoading(true);

  const dismissLoader = () => setLoading(false);

  const toggleShow = () => setShow(!show);

  return {
      Notificacion,
      Loader,
      info,
      error,
      warn,
      // showModal,
      // mostrarModal,
      // cerrarModal,
      confirm,
      mensajeInformativo,
      isLoading,
      showLoader,
      dismissLoader
  }
}
