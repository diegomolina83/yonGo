import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'

import MainNavbar from '../../shared/navbar/MainNavbar'
import BackArrow from '../../styled/BackArrow'

import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import PlanFormLocation from './FormLocation'
import planService from '../../../service/plan.service'

import './PlanForm.css'

class PlanForm extends Component {

    constructor() {
        super()
        this.state = {
            title: '',

            startLocation: {},
            startDate: '',
            startTime: '',

            endLocation: '',
            endDate: '',
            endTime: '',

            scope: 'friends',
            category: '',

            description: '',
            requirements: '',

            creator: undefined,
            owners: []

        }

        console.log('En el constructor de pFORM')

        this.hasEnd = false
        this.isValidForm = false
        this.planService = new planService()
    }

    componentDidMount() {

        this.setState({
            creator: this.props.loggedInUser._id,
            owners: new Array(this.props.loggedInUser._id)
        })
    }

    handleFormSubmit = e => {

        e.preventDefault()

        this.planService.createPlan(this.state)
            .then(response => {
                this.props.history.push('/')
            })
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

            document.getElementById(this.state[buttonGroup]).classList.remove(`selected-btn`)
            document.getElementById(this.state[buttonGroup]).classList.add(`btn-${this.props.styles.button.default}`)
        }

        // We change visual style of the selected button
        e.target.classList.remove(`btn-${this.props.styles.button.default}`)
        e.target.classList.add(`selected-btn`)

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

    getCoords = (coords, flag) => {

        switch (flag) {
            case "start":
                this.setState({ startLocation: { lat: coords[0], lng: coords[1] } })
                break;
            case "end":
                this.setState({ endLocation: { lat: coords[0], lng: coords[1] } })
                break;
            case "map":
                console.log("Estamos en el mapa")
                break;
            default:
                console.log("error")
                break
        }


    }

    render() {

        return (

            <div className='plan-new'>

                <MainNavbar />

                <Container fluid='lg pb-4'>

                    <BackArrow backLink={this.props.history.goBack} color='red' />

                    <h1 className='mb-5 text-center font-weight-bold'>Diseña una nueva <span>experiencia!</span></h1>

                    <Form onSubmit={this.handleFormSubmit}>

                        <Form.Group>
                            <Form.Control className='plan-form-title border-top-0 border-right-0 border-left-0 rounded-0 font-weight-bold' type="text" name="title" value={this.state.title} onChange={this.handleInputChange} placeholder='Titulo' />
                        </Form.Group>

                        <PlanFormLocation getCoords={this.getCoords} formState={this.state} handleInputChange={this.handleInputChange} styles={this.props.styles} hasEndToogle={this.hasEndToogle} />

                        <Form.Group>

                            <Form.Label className='d-block'>Lista blanca</Form.Label>

                            <ButtonGroup className='border rounded flex-column flex-sm-row d-flex d-sm-inline-flex' aria-label="scope">
                                <Button id='public' variant={this.props.styles.button.default} onClick={this.handleOptionChange}>Público</Button>
                                <Button id='friends' className='selected-btn' onClick={this.handleOptionChange}>Amigos</Button>
                                <Button id='group' variant={this.props.styles.button.default} onClick={this.handleOptionChange}>Grupo</Button>
                            </ButtonGroup>

                        </Form.Group>

                        <Form.Group>

                            <Form.Label className='d-block'>Categoría</Form.Label>

                            <ButtonGroup className='border rounded flex-column flex-sm-row d-flex d-sm-inline-flex' aria-label="category">
                                <Button id='sport' variant='light' onClick={this.handleOptionChange} >Deporte</Button>
                                <Button id='culinary' variant={this.props.styles.button.default} onClick={this.handleOptionChange} >Culinaria</Button>
                                <Button id='culture' variant={this.props.styles.button.default} onClick={this.handleOptionChange} >Cultura</Button>
                                <Button id='travel' variant={this.props.styles.button.default} onClick={this.handleOptionChange} >Viajes</Button>
                                <Button id='other' variant={this.props.styles.button.default} onClick={this.handleOptionChange} >Otra</Button>
                            </ButtonGroup>

                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows="3" name='description' onChange={this.handleInputChange} placeholder='¿Qué vas a regalar al mundo?' />
                        </Form.Group>

                        {/* <Form.Group controlId="requirements">
                            <Form.Label>Requisitos</Form.Label>
                            <Form.Control as="textarea" rows="3" name='requirements' onChange={this.handleInputChange} placeholder='¿Algo que deban saber?' />
                        </Form.Group> */}

                        <Button id='submit-btn' disabled className='mr-2 submit-btn' variant={this.props.styles.button.submit} type="submit">Crear plan</Button>
                        <Button variant={this.props.styles.button.discreet} onClick={this.props.history.goBack}>Cancelar</Button>
                    </Form>

                </Container>
            </div>


        )
    }
}

export default PlanForm