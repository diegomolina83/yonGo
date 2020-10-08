import React, { Component } from 'react'

import MainNavbar from '../../shared/navbar/MainNavbar'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UserService from '../../../service/user.service'

import BackArrow from '../../styled/BackArrow'

class UserProfile extends Component {

    constructor() {

        super()
        this.state = {}
        this.userService = new UserService()
    }

    componentDidMount() {

        this.userService.getOneUser(this.props.match.params.userId)
            .then(matchedUser => console.log(matchedUser.data))
            .catch(err => console.log(err))

        //console.log('params.id: ', this.props.match.params.userId);
    }

    render() {
        return (

            <>
                <MainNavbar />

                <Container fluid='lg pb-4'>

                    <BackArrow backLink={this.props.history.goBack} />

                    <Row>

                        <Col>Hola</Col>
                    </Row>


                    <h4 style={{ color: 'grey' }}><b style={{ color: 'black' }}>UserProfile</b> class component</h4>

                </Container>


            </>



        )
    }
}

export default UserProfile