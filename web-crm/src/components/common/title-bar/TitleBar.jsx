import React from 'react';
import { Button } from 'react-bootstrap';

export const TitleBar = ({titulo, clickCrear, clickBuscar}) => {

    const handleCrear = () => {
        if(clickCrear) {
            clickCrear();
        }
    }

    return (
        <div className="title-bar" style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', padding: '10px 20px'}}>
            <h2>{titulo}</h2>
            {/* <Button variant="success" size="sm">Filtrar</Button> */}
            <div>
                {clickCrear &&<Button variant="success" size="sm" onClick={handleCrear}>Crear</Button>}{' '}
                {clickBuscar && <Button variant="success" size="sm" onClick={() => clickBuscar()}>Buscar</Button>}
            </div>
        </div>
    );
};
