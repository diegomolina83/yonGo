import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// import AppContext from '../../context/AppContext'

import './Profile.css'

import { Container, Spinner } from 'react-bootstrap'

import MainNavbar from '../../../shared/navbar/MainNavbar'
import BackArrow from '../../../styled/BackArrow'
import PlansViewer from '../plans_viewer/PlansViewer'
import Header from './Header'
import LoadingMessage from '../../../shared/loading_spinner/LoadingMessage'

import UserService from '../../../../service/user.service'

class UserProfile extends Component {

    constructor() {

        super()
        this.state = {

        }

        this.userService = new UserService()

        this.previousScrollValue = 0
    }

    componentDidMount() {

        const getUser = this.userService.getOneUser(this.props.match.params.userId)
        const getPlans = this.userService.getAllPlansFast(this.props.match.params.userId)

        Promise.all([getUser, getPlans])
            .then(response => this.setState({ user: response[0].data, userPlans: response[1].data }, this.getAllPlans))
            .catch(err => console.log({ err }))
    }

    getAllPlans() {

        this.userService.getAllPlans(this.props.match.params.userId)
            .then(response => this.setState({ user: this.state.user, userPlans: response.data }))
            .catch(err => console.log({ err }))
    }

    render() {

        return (

            <div className='profile'>

                <MainNavbar />

                {this.state.user ?

                    <Container fluid='lg'>

                        <BackArrow id='top-back-arrow' className='d-inline-block mt-3 mb-4' backLink={this.props.history.goBack} />

                        <Header user={this.state.user} />

                        <hr style={{ marginBottom: '0' }}></hr>

                        <PlansViewer user={this.state.user} plansList={this.state.userPlans} backLink={this.props.history.goBack}></PlansViewer>

                    </Container>

                    :

                    <LoadingMessage>Cargando datos del perfil...</LoadingMessage>

                }

            </div>
        )
    }
}

export default UserProfile