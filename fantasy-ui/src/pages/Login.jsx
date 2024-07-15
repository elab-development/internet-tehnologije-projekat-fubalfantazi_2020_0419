import React, {useState} from 'react';
import PageTitle from "../components/PageTitle";
import {Col, Form, Row} from "react-bootstrap";
import useForm from "../hooks/useForm";
import axiosInstance from "../axiosInstance";

const Login = () => {
    const [poruka, setPoruka] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const title = showRegister ? 'Register page' : 'Login page';

    const {form, handleChange} = useForm({
        email: '',
        password: '',
        name: '',
    });

    const login = () => {

        axiosInstance.post('/login', form)
            .then(response => {
                console.log(response.data);

                window.sessionStorage.setItem('token', response.data.data.token);
                window.sessionStorage.setItem('user', JSON.stringify(response.data.data.user));
                window.sessionStorage.setItem('userTeam', JSON.stringify(response.data.data.userTeam));
                window.sessionStorage.setItem('madeTeam', response.data.data.madeTeam);

                if (response.data.data.madeTeam) {
                    window.location.href = '/my-team';
                } else {
                    window.location.href = '/create-team';
                }

            })
            .catch(error => {
                console.log(error);
                setPoruka('Invalid credentials');
            });
    }

    const register = () => {

            axiosInstance.post('/register', form)
                .then(response => {
                    console.log(response.data);

                    setPoruka('Registration successful, please login');
                    setTimeout(() => {
                        setShowRegister(false);
                    }, 3000);
                })
                .catch(error => {
                    console.log(error);
                    setPoruka('Invalid credentials');
                });
    }

    return (
        <>
            <PageTitle title={title} subtitle={poruka} />
            <Row>
                {
                    !showRegister && (
                        <Col>
                            <Form.Group className="form-control">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={form.email} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="form-control">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={form.password} onChange={handleChange} />
                            </Form.Group>
                            <hr/>
                            <button className="link-dark" onClick={() => setShowRegister(true)}>Do not have an account? Please register</button>
                            <br/>
                            <button onClick={login} className="btn btn-primary mt-3">Login</button>
                        </Col>
                    )
                }

                {
                    showRegister && (
                        <Col>
                            <Form.Group className="form-control">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" value={form.name} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="form-control">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={form.email} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="form-control">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={form.password} onChange={handleChange} />
                            </Form.Group>
                            <hr/>
                            <button className="link-dark" onClick={() => setShowRegister(false)}>Already have an account? Please login</button>
                            <br/>
                            <button onClick={register} className="btn btn-primary mt-3">Register</button>
                        </Col>
                    )
                }
            </Row>
        </>
    );
};

export default Login;