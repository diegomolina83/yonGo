import React, { Component } from 'react'

import './profile.css'

import MainNavbar from '../../shared/navbar/MainNavbar'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
// import Button from 'react-bootstrap/Button'

import BackArrow from '../../styled/BackArrow'
import Button from '../../styled/buttons/Button'

import UserService from '../../../service/user.service'

class UserProfile extends Component {

    constructor() {

        super()
        this.state = {

            userPlans: [],
            currentShownPlans: 'all-plans'
        }

        this.userService = new UserService()
    }

    componentDidMount() {

        const getUser = this.userService.getOneUser(this.props.match.params.userId)
        const getUserPlans = this.userService.getAllPlans(this.props.match.params.userId)

        Promise.all([getUser, getUserPlans])
            .then(results => this.setState({ user: results[0].data, userPlans: results[1].data }))
            .catch(err => console.log(err))
    }

    plansHandler = (e) => {

        // Clicked btn class change
        e.target.classList.replace('deselected', 'selected')

        // Clicked btn class change
        document.getElementById(this.state.currentShownPlans).classList.replace('selected', 'deselected')

        // State update
        this.setState({ currentShownPlans: e.target.id })
    }

    render() {

        const followersLength = this.state.user ? this.state.user.social.followers.length : null
        const followingLength = this.state.user ? this.state.user.social.following.length : null

        return (

            <div className='profile'>
                <MainNavbar />

                <Container fluid='lg pb-4'>

                    <BackArrow backLink={this.props.history.goBack} />

                    {this.state.user ?
                        <header>

                            <Row>


                                <Col id='profile-img' xs='auto'>
                                    <Image src={this.state.user.imageUrl} roundedCircle />
                                </Col>

                                <Col id='user-info' xs='auto'>

                                    <Row className='mb-3'>

                                        <Col xs='auto'>

                                            <p className='d-inline-block mb-0 font-weight-bold' style={{ fontSize: '2em' }}>{this.state.user.username}</p>

                                        </Col>

                                        <Col className='d-flex align-items-center'>

                                            <Button variant='lightBlue' size='sm' onClick={() => console.log('Me presionaste')}>Editar</Button>

                                        </Col>

                                    </Row>

                                    <Row className='justify-content-start py-1'>

                                        <Col xs='auto'>

                                            <p className='mb-0'><span style={{ fontWeight: '700' }}>
                                                {followersLength}</span> {followersLength !== 1 ? 'seguidores' : 'seguidor'}</p>

                                        </Col>

                                        <Col xs='auto'>

                                            <p className='mb-0'><span style={{ fontWeight: '700' }}>
                                                {followingLength}</span> {followingLength !== 1 ? 'seguidos' : 'seguido'}</p>

                                        </Col>

                                    </Row>

                                    <Row className='justify-content-start py-1'>

                                        <Col xs='auto'>

                                            {this.state.user.social ? <p className='mb-0'><span style={{ fontWeight: '700' }}>{followersLength}</span> {followersLength !== 1 ? 'creaciones' : 'creación'}</p> : null}

                                        </Col>

                                        <Col xs='auto'>

                                            {this.state.user.social ? <p className='mb-0'><span style={{ fontWeight: '700' }}>{followingLength}</span> {followingLength !== 1 ? 'participaciones' : 'participación'}</p> : null}

                                        </Col>

                                    </Row>

                                </Col>

                            </Row>

                        </header> : null
                    }

                    <hr></hr>

                    <Row>

                        <Col id='created-plans' xs={6} className='pb-2 deselected' style={{ textAlign: 'center', cursor: 'pointer' }}
                            onClick={this.plansHandler}>

                            Creados

                        </Col>

                        <Col id='all-plans' xs={6} className='pb-2 selected' style={{ textAlign: 'center', cursor: 'pointer' }}
                            onClick={this.plansHandler}>

                            Asistidos

                        </Col>

                    </Row>

                    <Row id='planes'>


                    </Row>

                </Container>


            </div>



        )
    }
}

export default UserProfile