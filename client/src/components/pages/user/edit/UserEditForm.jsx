import React from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import CustomButton from '../../../styled/buttons/Button'

import Image from '../../../shared/form/FormImage'

const UserEditForm = ({ formState, handleFieldChange, handleSubmit }) => {

    return (

        <Form onSubmit={handleSubmit}>

            <Image src={formState.imageUrl} />

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={formState.username} placeholder="Username" name='username' onChange={handleFieldChange} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" value={formState.email} readOnly />

                <Form.Text className="text-muted">
                    Para usar otra dirección de email por favor crea una nueva cuenta.
                </Form.Text>

            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" value={formState.firstName} placeholder="First name" name='firstName' onChange={handleFieldChange} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" value={formState.lastName} placeholder="Last name" name='lastName' onChange={handleFieldChange} />
            </Form.Group>

            <CustomButton variant="blue" type="submit">
                Editar
            </CustomButton>

            <Button variant='outline-danger' className='ml-2'>Delete</Button>

        </Form>

    )
}

export default UserEditForm