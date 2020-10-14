import React from 'react'

import Form from 'react-bootstrap/Form'

import Button from '../../../styled/buttons/Button'

const UserEditForm = ({ formState, handleFieldChange }) => {

    return (

        <Form>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" value={formState.email} readOnly />

                <Form.Text className="text-muted">
                    Para usar otra dirección de email por favor crea una nueva cuenta.
                </Form.Text>

            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={formState.username} placeholder="Username" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" value={formState.firstName} placeholder="First name" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" value={formState.lastName} placeholder="Last name" />
            </Form.Group>

            <Button variant="blue" type="submit">
                Editar
            </Button>

        </Form>

    )
}

export default UserEditForm