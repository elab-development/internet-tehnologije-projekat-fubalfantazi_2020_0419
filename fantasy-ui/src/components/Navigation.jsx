import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

const Navigation = () => {

    const token = window.sessionStorage.getItem('token');
    const user = token ? JSON.parse(window.sessionStorage.getItem('user')) : null;
    const userTeam = token ? JSON.parse(window.sessionStorage.getItem('userTeam')) : null;
    const madeTeam = window.sessionStorage.getItem('madeTeam') === 'true';
    const role = user ? user.role : null;


    const logout = () => {
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('user');
        window.sessionStorage.removeItem('userTeam');
        window.sessionStorage.removeItem('madeTeam');
        window.location.href = '/';
    }

    return (
        <>
            <Navbar bg="light" data-bs-theme="light">
                <Container>
                    <Navbar.Brand href="#">Premier Fantasy Football</Navbar.Brand>
                    <Nav className="me-auto">
                        {
                            !token ? <Nav.Link href="/">Login</Nav.Link> : null
                        }

                        {
                            token && !madeTeam ? <Nav.Link href="/create-team">Create Team</Nav.Link> : null
                        }

                        {
                            token && madeTeam ? (
                                <>
                                    <Nav.Link href="/my-team">My Team</Nav.Link>
                                    <Nav.Link href="/active-round">Active Round Points</Nav.Link>
                                    <Nav.Link href="/previous-rounds">Previous Rounds Points</Nav.Link>
                                </>
                            ) : null
                        }

                        {
                            token && (role === 'moderator' || role === 'admin') ? <Nav.Link href="/round-management">Round Management</Nav.Link> : null
                        }

                        {
                            token && role === 'admin' ? <Nav.Link href="/admin">Admin</Nav.Link> : null
                        }

                        {
                            token ? <Nav.Link onClick={logout} href="#">Logout</Nav.Link> : null
                        }
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigation;