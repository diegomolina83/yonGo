import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// import AppContext from '../../context/AppContext'

import './Profile.css'

import { Container, Spinner } from 'react-bootstrap'

import MainNavbar from '../../../shared/navbar/MainNavbar'
import BackArrow from '../../../styled/BackArrow'
import PlansViewer from '../plans_viewer/PlansViewerVis'
import Header from './Header'
import LoadingMessage from '../../../shared/loading_spinner/LoadingMessage'

import UserService from '../../../../service/user.service'

class UserProfile extends Component {

    constructor() {

        super()
        this.state = {

        }

        this.userService = new UserService()
    }

    componentDidMount() {

        const getUser = this.userService.getOneUser(this.props.match.params.userId)
        const getPlans = this.userService.getAllPlans(this.props.match.params.userId)

        Promise.all([getUser, getPlans])
            .then(response => this.setState({ user: response[0].data, userPlans: response[1].data }))
            .catch(err => console.log(err))

        window.addEventListener('scroll', this.scrolleo)
    }

    componentWillUnmount() {

        window.removeEventListener('scroll', this.scrolleo)
    }

    scrolleo = e => {

        console.log(e.target);


        const scrollContainer = document.getElementById('plans-container')
        const scrollContent = document.querySelector('.profile')

        // .scrollHeight = e.target.offsetHeight + e.target.scrollTop (the maximun one)
        console.log('scrollHeight: ', scrollContent.scrollHeight) // The height of the content defined by its own content
        console.log('window.scrollY: ', window.scrollY)
        console.log(('window.offsetHeight: ', window.innerHeight));

        //console.log('scrollHeight: ', scrollContent.scrollHeight) // The height of the content defined by its own content
        //console.log('e.target.scrollTop: ', e.target.scrollTop);    // Scroll value in y
        //console.log('e.target.offsetHeight: ', e.target.offsetHeight);  // The height of the container (setted in the styles)

        // console.log('parent.getBoundingClientRect()', scrollContent.getBoundingClientRect());

        // console.log('window.innerHeight: ', window.innerHeight);
    }

    render() {

        return (

            <div className='profile'>

                <MainNavbar />

                {this.state.user ?

                    <Container fluid='lg'>

                        <BackArrow className='d-block pt-3 pb-4' id='top-back-arrow' backLink={this.props.history.goBack} />

                        <Header user={this.state.user} />

                        <hr style={{ marginBottom: '0' }}></hr>

                        <PlansViewer user={this.state.user} plansList={this.state.userPlans} backLink={this.props.history.goBack}></PlansViewer>

                    </Container>

                    :

                    <LoadingMessage message='Cargando datos del perfil...' />

                }

            </div>
        )
    }
}

export default UserProfile