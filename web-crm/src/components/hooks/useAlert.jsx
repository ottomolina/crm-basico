import { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';    
import { confirmAlert } from 'react-confirm-alert';
import { ErrorHttp } from '../../models/ErrorHttp';
// import { closeSesion } from '../../util/storage'; 

export const useAlert = () => {

    const [show, setShow] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [titulo, setTitulo] = useState('');
    const [showModal, setShowModal] = useState(false);

    const toggleShow = () => setShow(!show);

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

    const info = (mensaje='') => mostrarAlerta(mensaje, 'Información');
    const warn = (mensaje='') => mostrarAlerta(mensaje, 'Alerta');
    const error = (mensaje=ErrorHttp) => {
        mostrarAlerta(mensaje.mensaje, 'Error');
        // if(mensaje.sesion === false) {
        //     setTimeout(() => {
        //         closeSesion();
        //         window.location.href = '/';
        //     }, 4000);
        // }
    }
    
    const mostrarAlerta = (mensaje='', titulo='') => {
        if(!show) {
            setTitulo(titulo);
            setMensaje(mensaje);
            setShow(true);
            setTimeout(() => setShow(false) , 4000);
        }
    }

    const mostrarModal = () => setShowModal(true);
    const cerrarModal = () => setShowModal(false);

    const confirm = (
        mensaje='',
        actionYes,
        actionNo
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
              onClick: actionNo
            }
          ]
        });
      };

    const mensajeInformativo = ( mensaje='', actionOk ) => {
        confirmAlert({
          title: 'Información',
          message: mensaje,
          buttons: [ { label: 'Ok', onClick: actionOk } ]
        });
      };

    return {
        Notificacion,
        info,
        error,
        warn,
        showModal,
        mostrarModal,
        cerrarModal,
        confirm,
        mensajeInformativo
    }
}
