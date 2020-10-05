import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Signup from '../../pages/signup/Signup'
import Login from '../../pages/login/Login'
import SimpleMap from '../../shared/maps/Maps'
// import NewMap from '../../shared/maps/NewMap'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


import authService from '../../../service/auth.service'


class Home extends Component {

    constructor() {
        super()
        this.state = {
            loggedInUser: undefined,
            signup: false,
            login: false
        }
        this.authService = new authService()
    }

    //Para que se abran los modales según sea login o signup
    onOpenModal = () => {
        this.setState({
            signup: true,

        });
    };


    onOpenModalLogin = () => {
        this.setState({ login: true });
    };


    onCloseModal = () => {
        this.setState({ signup: false });
    };


    onCloseModalclose = () => {
        this.setState({ login: false });
    };


    //Ver estado de usuario
    componentDidMount = () => this.fetchUser()


    setTheUser = user => this.setState({ loggedInUser: user }, () => console.log('El usuario es', this.state.loggedInUser))


    fetchUser = () => {
        this.authService
            .isLoggedIn()
            .then(response => this.setState({ loggedInUser: response.data }))
            .catch(err => this.setState({ loggedInUser: null }))
    }


    //Finalizar la sesión del usuario
    logoutUser = () => {
        this.authService
            .logout()
            .then(() => this.setTheUser(null))
            .catch(err => console.log('ERRORR!!:', err))
    }


    render() {
        return (
            <>
                <h1>yonGo</h1>
                {!this.state.loggedInUser && <Link to="/"><Button onClick={() => this.onOpenModalLogin()}>Login</Button></Link>}
                {!this.state.loggedInUser && <Link to="/"><Button onClick={() => this.onOpenModal()}>Registro</Button></Link>}
                {this.state.loggedInUser && <div className="nav-link" onClick={this.logoutUser}>Cerrar sesión</div>}
                <Link to="/plans/new"><Button>Nuevo plan</Button></Link>

                {/* <NewMap /> */}
                <SimpleMap />
                <Modal show={this.state.signup} onHide={() => this.onCloseModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Signup</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Signup setTheUser={this.setTheUser} {...this.props} />
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.login} onHide={() => this.onCloseModalclose()}>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Login close={this.onCloseModalclose} setTheUser={this.setTheUser} {...this.props} />
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

export default Home;