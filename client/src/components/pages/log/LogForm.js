import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import authService from '../../../service/auth.service'


class LogForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            email: ''
        }
        this.authService = new authService()
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }


    handleFormSubmit = e => {

        e.preventDefault()

        if (this.props.logType === 'Sign up') {

            this.authService
                .signup(this.state)
                .then(response => {
                    this.props.setTheUser(response.data)
                    this.props.close()
                })
                .catch(err => console.log('Erroooooor:', { err }))

        } else {


            this.authService
                .login(this.state)
                .then(response => {

                    this.props.setTheUser(response.data)
                    this.props.close()
                })
                .catch(err => console.log('Erroooooor:', { err }))
        }

    }


    render() {

        return (

            <Container>
                <main>
                    <Row className="justify-content-center">
                        <Col xs={9}>

                            <h1>{this.props.logType} de usuario</h1>

                            <Form onSubmit={this.handleFormSubmit}>

                                <Form.Group>
                                    <Form.Label>Nombre de usuario</Form.Label>
                                    <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                                </Form.Group>

                                {this.props.logType === 'Sign up' &&

                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                                    </Form.Group>
                                }

                                <Form.Group>
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Button variant="dark" type="submit" className='d-block' style={{ margin: '0 auto' }}>Acceder</Button>
                            </Form>
                        </Col>
                    </Row>
                </main>
            </Container>
        )
    }
}


export default LogForm