import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

const CreateNewUser = () => {
    useEffect(() => { });
    const [searchParams] = useSearchParams();
    const [validated, set_Validated] = useState(false);
    const [form_Data, set_Form_Data] = useState({
        first_name: "",
        last_name: "",
        password: "",
        confim_password: "",
        email: "",
        phone_number: "",
    });
    let sourcePage = searchParams.get('from')
    console.log(sourcePage);
    const submitFn = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        set_Validated(true);
        console.log(form.checkValidity() )
    };
    const chngFn = (event) => {
        const { name, value } = event.target;
        set_Form_Data({
            ...form_Data,
            [name]: value,
        });
    };

    return (
        <Card>
            <Container className="mt-5">
                <Row>
                    <Col
                        md={{
                            offset: 0,
                        }}
                    >
                        <h1
                            style={{
                                color: "green",
                            }}
                        >
                            Thêm mới người dùng
                        </h1>
                   
                        <Form noValidate validated={validated} onSubmit={submitFn}>
                            <div className='row'>
                                <Form.Group controlId="first_name" className='col-md-6'>
                                    <Form.Label>Họ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="first_name"
                                        value={form_Data.first_name}
                                        onChange={chngFn}
                                        pattern="^[a-zA-Z0-9]+$"
                                        required
                                        isInvalid={
                                            validated &&
                                            !/^[a-zA-Z0-9]+$/.test(form_Data.first_name)
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid username (alphanumeric
                                        characters only).
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="last_name" className='col-md-6'>
                                    <Form.Label>Họ</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="last_name"
                                        value={form_Data.last_name}
                                        onChange={chngFn}
                                        pattern="^[a-zA-Z0-9]+$"
                                        required
                                        isInvalid={
                                            validated &&
                                            !/^[a-zA-Z0-9]+$/.test(form_Data.last_name)
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid username (alphanumeric
                                        characters only).
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                            <div className = "row">
                                    <Form.Group controlId="password" className='col-md-6'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={form_Data.pass}
                                            onChange={chngFn}
                                            minLength={6}
                                            required
                                            isInvalid={
                                                validated && form_Data.password.length < 6
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Password must be at least 6 characters long.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="confirmPassword" className='col-md-6'>
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confim_password"
                                            value={form_Data.confim_password}
                                            onChange={chngFn}
                                            minLength={6}
                                            required
                                            pattern={form_Data.pass}
                                            isInvalid={
                                                validated &&
                                                form_Data.confim_password !== form_Data.password
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Passwords do not match.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                            </div>
                    
                            <div className = "row">
                                <Form.Group controlId="phone_number" className='col-md-6'>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="phone_number"
                                        value={form_Data.phone_number}
                                        onChange={chngFn}
                                        pattern="^\d{10}$"
                                        required
                                        isInvalid={
                                            validated &&
                                            !/^\d{10}$/.test(form_Data.phone_number)
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid 10-digit phone number.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="email"  className='col-md-6'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={form_Data.email}
                                        onChange={chngFn}
                                        required
                                        isInvalid={
                                            validated &&
                                            !/^\S+@\S+\.\S+$/.test(form_Data.email)
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid email address.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>
                           <div className='d-flex justify-content-center m-4'>
                                    <Button type="submit" >Submit</Button>
                           </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Card>
    );
}
export default CreateNewUser;

