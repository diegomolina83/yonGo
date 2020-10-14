import React, { Component } from 'react'

import UserService from '../../../../service/user.service'

import Container from 'react-bootstrap/Container'

import EditForm from './UserEditForm'
import MainNavbar from '../../../shared/navbar/MainNavbar'
import BackArrow from '../../../styled/BackArrow'

//import './UserSettings.css'

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

    stateUpdate = () => {

        console.log('Updating state')
    }

    render() {
        return (

            <div id="user-edit">

                <MainNavbar />

                <Container fluid='lg pb-4 pt-5'>

                    <BackArrow />

                    <h1 className='mb-5 text-center font-weight-bold'>{this.isEdition ? <>Rediseña tu <span>plan</span></> : <>Diseña una nueva <span>experiencia!</span></>} </h1>


                    {this.state && <EditForm formState={this.state} handleFieldChange={this.stateUpdate} />}

                </Container>

            </div>

        )
    }
}

export default UserSettings