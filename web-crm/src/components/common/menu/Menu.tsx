import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

interface MenuProps {
    nombres: string,
    rolid: number,
    cerrarSesion: () => void
}

export const Menu = (props: MenuProps) => {
    const { nombres, rolid, cerrarSesion } = props;

    const handleSalir = () => cerrarSesion();

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">CRM</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {rolid===1 && <Nav.Link href="/usuarios">Usuarios</Nav.Link>}
                            <Nav.Link href="/clientes">Clientes</Nav.Link>
                            <Nav.Link href="/proyectos">Proyectos</Nav.Link>
                            <Nav.Link href="/reuniones">Reuniones</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>Bienvenido:</Navbar.Text>
                        <Nav className="me-auto">
                            <NavDropdown title={nombres} id="basic-nav-dropdown">
                                <NavDropdown.Item href="perfil">Perfil</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#" onClick={handleSalir}>Salir</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};
