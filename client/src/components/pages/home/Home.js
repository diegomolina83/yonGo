import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import LogForm from '../log/LogForm'
import SimpleMap from '../../shared/maps/Maps'

import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'


import authService from '../../../service/auth.service'


class Home extends Component {

    constructor() {
        super()
        this.state = {
            loggedInUser: undefined,
            logModal: false,
            logType: undefined
        }
        this.authService = new authService()
    }

    //Para que se abran los modales según sea login o signup

    onOpenLogModal = (type) => {
        this.setState({ logModal: true, logType: type })
    }

    onCloseLogModal = () => {
        this.setState({ logModal: false })
    }


    render() {
        return (
            <>
                <h1>yonGo</h1>

                {!this.props.loggedInUser && <Button onClick={() => this.onOpenLogModal('Login')}>Login</Button>}
                {!this.props.loggedInUser && <Button onClick={() => this.onOpenLogModal('Sign up')}>Registro</Button>}
                {this.props.loggedInUser && <div className="nav-link" onClick={this.props.logoutUser}>Cerrar sesión</div>}


                <Link to="/plans/new"><Button>Nuevo plan</Button></Link>

                <SimpleMap />

                <Modal show={this.state.logModal} onHide={() => this.onCloseLogModal()}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.logType}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LogForm close={this.onCloseLogModal} setTheUser={this.props.setUser} {...this.props} logType={this.state.logType} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default Home