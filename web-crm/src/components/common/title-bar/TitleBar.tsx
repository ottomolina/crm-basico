import { Button } from 'react-bootstrap';

interface TitleBarProps {
    titulo: string,
    clickCrear?: () => void,
    clickBuscar?: () => void
}

export const TitleBar = (props: TitleBarProps) => {
    const { titulo, clickCrear, clickBuscar } = props;


    return (
        <div className="title-bar" style={{display: 'flex', flexDirection:'row', justifyContent: 'space-between', padding: '10px 20px'}}>
            <h2>{titulo}</h2>
            <div>
                {clickCrear &&<Button variant="success" size="sm" onClick={() => clickCrear()}>Crear</Button>}{' '}
                {clickBuscar && <Button variant="success" size="sm" onClick={() => clickBuscar()}>Buscar</Button>}
            </div>
        </div>
    );
};
