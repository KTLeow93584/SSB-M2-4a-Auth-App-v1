import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { GetUser, UpdateUser } from './AuthContext';

export function RenderAuthForm() {
    const user = GetUser();
    const authenticateUser = UpdateUser();
    const isLoggedIn = (user !== null && user !== undefined);

    return (
        <Container fluid className="d-flex align-items-center justify-content-center">
            <Row className="mt-3 bg-dark rounded">
                {RenderHeader(isLoggedIn, user)}
                {isLoggedIn ? RenderUserUI(authenticateUser) : RenderLoginForm(user, authenticateUser)}
            </Row>
        </Container>
    );
}

function RenderHeader(isLoggedIn, user) {
    const welcomeMsg = isLoggedIn ? (`Welcome ${user.lastName} ${user.firstName} (${user.email})`) :
        `Hello, New User! Please log in.`;

    return (
        <Row>
            <Col className="col-12 d-flex justify-content-center mb-2">
                <p className="text-white my-0">
                    {welcomeMsg}
                </p>
            </Col>
        </Row>
    );
}

function RenderLoginForm(user, authenticateUser) {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Row>
            <Col className="col-12">
                <Form className="mb-2" onSubmit={(event) => {
                    event.preventDefault();
                    authenticateUser(username, password);
                }}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="username" className="me-2 text-white">Username: </Form.Label>
                        <Form.Control required id="username" value={username}
                            className="me-2" type="text" placeholder="Enter username here"
                            onChange={(event) => setUserName(event.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="password" className="me-2 text-white">Password: </Form.Label>
                        <Form.Control required id="password" value={password}
                            className="me-2" type="password" placeholder="Enter password here"
                            onChange={(event) => setPassword(event.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mb-1">Log In</Button>
                </Form>
                {user === undefined ? RenderErrorSection() : ""}
            </Col>
        </Row>
    );
}

function RenderErrorSection() {
    return (
        <Form.Label className="fs-6 text-danger mb-3">Invalid Username/Password Combination</Form.Label>
    );
}

function RenderUserUI(authenticateUser) {
    return (
        <Row>
            <Col className="col-12 d-flex flex-column text-white align-items-center mb-2">
                <Button variant="primary" onClick={() => authenticateUser(null, null)} className="mb-2">Log Out</Button>
            </Col>
        </Row >
    );
}