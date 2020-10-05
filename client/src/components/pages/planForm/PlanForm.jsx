import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

import LocationFields from './FormLocation'

import './PlanForm.css'

import planService from '../../../service/plan.service'

class PlanForm extends Component {

    constructor() {
        super()
        this.state = {
            title: '',

            startLocation: '',
            startDate: '',
            startTime: '',

            endLocation: '',
            endDate: '',
            endTime: '',

            scope: 'friends',
            category: '',

            description: '',
            requirements: '',

        }

        this.hasEnd = false
        this.isValidForm = false
        this.planService = new planService()
    }

    handleFormSubmit = e => {

        e.preventDefault()

        this.planService.createPlan(this.state)
            .then(response => this.props.history.push('/'))
            .catch(err => console.log(err))
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value }, this.validation)
    }

    handleOptionChange = e => {

        const buttonGroup = e.target.parentNode.getAttribute('aria-label')

        // We change visual style of the previous selected button
        if (document.getElementById(this.state[buttonGroup])) {

            document.getElementById(this.state[buttonGroup]).classList.remove(`btn-${this.props.styles.button.active}`)
            document.getElementById(this.state[buttonGroup]).classList.add(`btn-${this.props.styles.button.default}`)
        }

        // We change visual style of the selected button
        e.target.classList.remove(`btn-${this.props.styles.button.default}`)
        e.target.classList.add(`btn-${this.props.styles.button.active}`)

        this.setState({ [buttonGroup]: e.target.id }, this.validation)
    }

    hasEndToogle = e => {

        this.hasEnd = !this.hasEnd

        this.validation()

        this.forceUpdate()
    }

    validation = () => {

        const requiredFields = !this.hasEnd ?
            [
                this.state.title,
                this.state.startLocation,
                this.state.startDate,
                this.state.startTime,
                this.state.scope,
                this.state.category] :
            [
                this.state.title,
                this.state.startLocation,
                this.state.startDate,
                this.state.startTime,
                this.state.endLocation,
                this.state.endDate,
                this.state.endTime,
                this.state.scope,
                this.state.category]

        const notValidForms = requiredFields.filter(elm => !elm)

        // (If the form is valid after check and previous state was invalid) OR (The form is invalid after check and the previous state was valid)
        if ((!notValidForms.length && !this.isValidForm) || (notValidForms.length && this.isValidForm)) {

            document.getElementById('submit-btn').toggleAttribute('disabled')

            this.isValidForm = !this.isValidForm
        }
    }

    render() {
        return (

            <Container fluid='lg' className='py-5'>


                <h1 className='mb-5 text-center font-weight-bold'>Diseña una nueva <span className='text-primary'>experiencia!</span></h1>

                <Form className='plan-form' onSubmit={this.handleFormSubmit}>

                    <Form.Group>
                        <Form.Control className='plan-form-title border-top-0 border-right-0 border-left-0 rounded-0 font-weight-bold' required type="text" name="title" value={this.state.title} onChange={this.handleInputChange} placeholder='Titulo' />
                        {/* <Form.Text className='text-muted'>* requerido</Form.Text> */}
                    </Form.Group>

                    <LocationFields formState={this.state} handleInputChange={this.handleInputChange} styles={this.props.styles} hasEndToogle={this.hasEndToogle} />

                    {/* Location start */}
                    {/* <Form.Group className='px-3 pt-3 border rounded bg-light'>

                        <Form.Label>Inicio</Form.Label>

                        <Form.Group>
                            <Form.Control type="text" name="startLocation" value={this.state.length} onChange={this.handleInputChange} placeholder='Ubicación' />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="date" name="startDate" value={this.state.inversions} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Control type="time" name="startTime" value={this.state.inversions} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form.Group>

                    {!this.hasEnd && <Button className='mb-3' variant={this.props.styles.button.discreet} onClick={this.hasEndToogle}>Añadir final</Button>}

                    {this.hasEnd && <><Form.Group className='px-3 pt-3 border rounded bg-light'>

                        <Form.Label>Final</Form.Label>

                        <Form.Group>
                            <Form.Control type="text" name="endLocation" value={this.state.length} onChange={this.handleInputChange} placeholder='Ubicación' />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="date" name="endDate" value={this.state.inversions} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Control type="time" name="endTime" value={this.state.inversions} onChange={this.handleInputChange} />
                                </Form.Group>
                            </Col>
                        </Row>

                    </Form.Group>

                        <Button className='mb-3' variant={this.props.styles.button.discreet} onClick={this.hasEndToogle}>Eliminar final</Button>

                    </>} */}
                    {/* Location end */}

                    <Form.Group>

                        <Form.Label className='d-block'>Lista blanca</Form.Label>

                        <ButtonGroup className='border rounded flex-column flex-sm-row d-flex d-sm-inline-flex' aria-label="scope">
                            <Button id='public' variant={this.props.styles.button.default} onClick={this.handleOptionChange}>Público</Button>
                            <Button id='friends' variant={this.props.styles.button.active} onClick={this.handleOptionChange}>Amigos</Button>
                            <Button id='group' variant={this.props.styles.button.default} onClick={this.handleOptionChange}>Grupo</Button>
                        </ButtonGroup>

                    </Form.Group>

                    <Form.Group>

                        <Form.Label className='d-block'>Categoría</Form.Label>

                        <ButtonGroup className='border rounded flex-column flex-sm-row d-flex d-sm-inline-flex' aria-label="category">
                            <Button id='sport' variant={this.props.styles.button.default} onClick={this.handleOptionChange} >Deporte</Button>
                            <Button id='culinary' variant={this.props.styles.button.default} onClick={this.handleOptionChange} >Culinaria</Button>
                            <Button id='culture' variant={this.props.styles.button.default} onClick={this.handleOptionChange} >Cultura</Button>
                            <Button id='travel' variant={this.props.styles.button.default} onClick={this.handleOptionChange} >Viajes</Button>
                            <Button id='other' variant={this.props.styles.button.default} onClick={this.handleOptionChange} >Otra</Button>
                        </ButtonGroup>

                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" rows="3" name='description' onChange={this.handleInputChange} placeholder='¿Qué vas a regalar al mundo?' />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Requisitos</Form.Label>
                        <Form.Control as="textarea" rows="3" name='requirements' onChange={this.handleInputChange} placeholder='¿Algo que deban saber?' />
                    </Form.Group>

                    <Button id='submit-btn' disabled className='mr-2' variant={this.props.styles.button.submit} type="submit">Crear plan</Button>
                    <Button variant={this.props.styles.button.discreet}>Cancelar</Button>
                </Form>

            </Container>

        )
    }
}

export default PlanForm