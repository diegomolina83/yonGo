import React, { Component } from 'react'

import UserService from '../../../../service/user.service'

import Container from 'react-bootstrap/Container'

import EditForm from './UserEditForm'
import MainNavbar from '../../../shared/navbar/MainNavbar'
import BackArrow from '../../../styled/BackArrow'

import './UserSettings.css'

class UserSettings extends Component {

    constructor() {
        super()
        this.state = undefined

        this.userService = new UserService
    }

    componentDidMount() {

        this.userService.getOneUser(this.props.match.params.userId)
            .then(response => this.setState(response.data))
            .catch(err => console.log({ err }))
    }

    stateUpdate = e => {

        this.setState({ [e.target.name]: e.target.value })
    }

    submitForm = e => {

        e.preventDefault()

        console.log('Submiting...');

        this.userService.editUser(this.state._id, this.state)
            .then(response => console.log('Aquí la respuesta del servidor: ', response.data))
            .catch(err => console.log({ err }))
    }

    render() {
        return (

            <div id="user-edit">

                <MainNavbar />

                <Container className='user-settings' fluid='lg pb-4'>

                    <BackArrow className='d-inline-block mt-3 mb-4' />

                    <h1 className='mb-5 text-center font-weight-bold' style={{ color: '#43506c' }}>Edición de tu perfil</h1>

                    {this.state && <EditForm formState={this.state} handleFieldChange={this.stateUpdate} handleSubmit={this.submitForm} />}

                </Container>

            </div >

        )
    }
}

export default UserSettings