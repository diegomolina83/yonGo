import React, { Component } from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './PlanForm.css'

class PlanForm extends Component {

    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (

            <Form className='plan-form' onSubmit={this.handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control required type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Start location</Form.Label>
                    <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>End location</Form.Label>
                    <Form.Control type="text" name="length" value={this.state.length} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="text" name="inversions" value={this.state.inversions} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Group>
                    <Form.Label>End Date</Form.Label>
                    <Form.Control type="text" name="inversions" value={this.state.inversions} onChange={this.handleInputChange} />
                </Form.Group>

                <Form.Label>Scope</Form.Label>
                <Form.Group>
                    <Form.Check
                        type="radio"
                        label="Public"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        inline
                    />
                    <Form.Check
                        type="radio"
                        label="Friends"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        inline
                    />
                    <Form.Check
                        type="radio"
                        label="Private"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                        inline
                    />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Requisitos</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                </Form.Group>

                <Button variant="dark" type="submit">Crear montaña rusa</Button>
            </Form>
        )
    }
}

export default PlanForm