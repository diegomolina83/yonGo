import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'

import MainNavbar from '../../../shared/navbar/MainNavbar'
import BackArrow from '../../../styled/BackArrow'

import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import FormImage from '../../../shared/form/FormImage'
import DefaultImage from './default-plan-img.png'

import PlanFormLocation from './FormLocation'

import planService from '../../../../service/plan.service'
import fileService from '../../../../service/files.service'


import './PlanForm.css'
import AppContext from '../../../context/AppContext'

class PlanForm extends Component {

    constructor(props) {

        super()

        this.state =
        {
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

            imageUrl: DefaultImage,
            isImageLoading: false,

            creator: undefined,
            owners: [],
            attendees: []
        }

        this.isEdition = props.match ? true : false

        this.hasEnd = false
        this.isValidForm = false

        this.planService = new planService()
        this.fileService = new fileService
    }

    componentDidMount() {

        if (this.isEdition) {

            this.planService.getOnePlan(this.props.match.params.planId)
                .then(matchedPlan => {

                    const { title, scope, category, description, requirements, imageUrl, creator, owners, attendees, isImageLoading } = matchedPlan.data
                    matchedPlan.data.isImageLoading = false

                    const objToSet = { title, scope, category, description, requirements, imageUrl, creator, owners, attendees, isImageLoading }
                    objToSet.startDate = matchedPlan.data.start.date.slice(0, 10)
                    objToSet.startTime = matchedPlan.data.start.date.slice(matchedPlan.data.start.date.indexOf('T') + 1, matchedPlan.data.start.date.indexOf('T') + 6)

                    if (matchedPlan.data.end) {

                        objToSet.endDate = matchedPlan.data.end.date.slice(0, 10)
                        objToSet.endTime = matchedPlan.data.end.date.slice(matchedPlan.data.end.date.indexOf('T') + 1, matchedPlan.data.end.date.indexOf('T') + 6)
                    }

                    this.isValidForm = true
                    document.getElementById('submit-btn').toggleAttribute('disabled')
                    this.setState(objToSet)
                })
                .catch(err => console.log(err))


        } else {

            this.setState({
                creator: this.props.loggedInUser._id,
                owners: new Array(this.props.loggedInUser._id),
                attendees: new Array(this.props.loggedInUser._id)

            })
        }

    }

    handleFormSubmit = e => {

        e.preventDefault()

        if (this.isEdition) {

            console.log('Editando plan :)');
            this.planService.editPlan(this.props.match.params.planId, this.state)
                .then(respuesta => console.log('el siguiente plan ha sido creado: ', respuesta))
                .catch(err => console.log({ err }))

        } else {

            this.planService.createPlan(this.state)
                .then(response => {
                    this.props.history.push('/')
                })
                .catch(err => console.log(err))
        }

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

    handleFileUrl = e => {

        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])

        const displayLoadingInfo = this.setState({ isImageLoading: true, imageUrl: '' })
        const uploadImage = this.fileService.uploadImage(uploadData)

        Promise.all([displayLoadingInfo, uploadImage])
            .then(response => this.setState({ imageUrl: response[1].data.secure_url, isImageLoading: false }))
            .catch(err => console.log({ err }))
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
        } else {

            console.log('Fill al the fields please!')
        }
    }

    getCoords = (coords, address, flag) => {

        console.log('la dirección es: ', address);

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

            <AppContext.Consumer>

                {({ styles }) => (

                    <div className='plan-new'>

                        <MainNavbar />

                        <Container fluid='lg pb-4'>

                            <BackArrow backLink={this.props.history.goBack} className='d-inline-block mt-3 mb-4' color='red' />

                            <h1 className='mb-5 text-center font-weight-bold'>{this.isEdition ? <>Rediseña tu <span>plan</span></> : <>Diseña una nueva <span>experiencia!</span></>} </h1>

                            <Form onSubmit={this.handleFormSubmit}>

                                <Form.Group>
                                    <Form.Control
                                        // className='plan-form-title border-top-0 border-right-0 border-left-0 rounded-0 font-weight-bold'
                                        className='plan-new-title rounded font-weight-bold'

                                        type="text" name="title" value={this.state.title} onChange={this.handleInputChange} placeholder='Titulo' />
                                </Form.Group>

                                <PlanFormLocation getCoords={this.getCoords} formState={this.state} handleInputChange={this.handleInputChange} styles={styles} hasEndToogle={this.hasEndToogle} />

                                <Form.Group>

                                    <Form.Label className='d-block'>Lista blanca</Form.Label>

                                    <ButtonGroup className='border rounded flex-column flex-sm-row d-flex d-sm-inline-flex' aria-label="scope">
                                        <Button id='public' variant={styles.button.default} onClick={this.handleOptionChange}>Público</Button>
                                        <Button id='friends' className='selected-btn' variant={styles.button.default} onClick={this.handleOptionChange}>Amigos</Button>
                                        <Button id='group' variant={styles.button.default} onClick={this.handleOptionChange}>Grupo</Button>
                                    </ButtonGroup>

                                </Form.Group>

                                <Form.Group>

                                    <Form.Label className='d-block'>Categoría</Form.Label>

                                    <ButtonGroup className='border rounded flex-column flex-sm-row d-flex d-sm-inline-flex' aria-label="category">
                                        <Button id='sport' className={this.isEdition && this.state.category === 'sport' ? 'selected-btn' : ''} variant={styles.button.default} onClick={this.handleOptionChange} >Deporte</Button>
                                        <Button id='culinary' className={this.isEdition && this.state.category === 'culinary' ? 'selected-btn' : ''} variant={styles.button.default} onClick={this.handleOptionChange} >Culinaria</Button>
                                        <Button id='culture' className={this.isEdition && this.state.category === 'culture' ? 'selected-btn' : ''} variant={styles.button.default} onClick={this.handleOptionChange} >Cultura</Button>
                                        <Button id='travel' className={this.isEdition && this.state.category === 'travel' ? 'selected-btn' : ''} variant={styles.button.default} onClick={this.handleOptionChange} >Viajes</Button>
                                        <Button id='other' className={this.isEdition && this.state.category === 'other' ? 'selected-btn' : ''} variant={styles.button.default} onClick={this.handleOptionChange} >Otra</Button>
                                    </ButtonGroup>

                                </Form.Group>

                                <Form.Group controlId="description">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control as="textarea" rows="3" name='description' value={this.state.description} onChange={this.handleInputChange} placeholder='¿Qué vas a regalar al mundo?' />
                                </Form.Group>

                                {/* <Form.Group controlId="requirements">
                            <Form.Label>Requisitos</Form.Label>
                            <Form.Control as="textarea" rows="3" name='requirements' onChange={this.handleInputChange} placeholder='¿Algo que deban saber?' />
                        </Form.Group> */}

                                {!this.state.isImageLoading ?
                                    <FormImage src={this.state.imageUrl} onChange={this.handleFileUrl} />
                                    :
                                    <FormImage src={this.state.imageUrl} onChange={this.handleFileUrl} loading />}

                                <Button id='submit-btn' disabled className='mr-2 submit-btn' variant={styles.button.submit} type="submit">{this.isEdition ? 'Editar' : 'Crear'} plan</Button>
                                <Button variant={styles.button.discreet} onClick={this.props.history.goBack}>Cancelar</Button>
                            </Form>

                        </Container>
                    </div>

                )}

            </AppContext.Consumer>

        )
    }
}

export default PlanForm