import React from 'react'
import { Link } from 'react-router-dom'

import AppContext from '../../../context/AppContext'

import { Row, Col, Image } from 'react-bootstrap'

import Button from '../../../styled/buttons/Button'
import Calendar from '../../../shared/nivo_calendar/NivoCalendar'


const ProfileHeader = ({ user }) => {

    const data = [
        {
            "day": "2020-04-14",
            "value": 337
        },
        {
            "day": "2021-07-22",
            "value": 135
        }]

    return (

        <AppContext.Consumer>

            {({ loggedInUser }) => (

                <header>

                    <Row>

                        <Col id='profile-img' xs={12} sm='auto' className='d-flex justify-content-center'>
                            <Image src={user.imageUrl} roundedCircle />
                        </Col>

                        <Col id='user-info' xs='12' sm='auto' className='mt-3'>

                            <Row className='mb-3 justify-content-center justify-content-sm-start'>

                                <Col id='username' xs='auto'>

                                    <p className='d-inline-block mb-0 font-weight-bold'>{user.username}</p>

                                </Col>

                                <Col xs='auto' className='d-flex align-items-center'>

                                    {user._id === loggedInUser._id ?

                                        <Link to='user/settings' style={{ color: 'black' }}>

                                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                            </svg>

                                        </Link>

                                        :

                                        <Button variant='lightBlue' size='sm' onClick={() => console.log('Me presionaste')}>Follow</Button>
                                    }

                                </Col>

                            </Row>

                            <Row className='justify-content-around justify-content-sm-start'>

                                <Col xs='auto'>

                                    <p className='mb-0'><span style={{ fontWeight: '700' }}>
                                        {user.social.followers.length}</span> {user.social.followers.length !== 1 ? 'seguidores' : 'seguidor'}</p>

                                </Col>

                                <Col xs='auto'>

                                    <p className='mb-0'><span style={{ fontWeight: '700' }}>
                                        {user.social.following.length}</span> {user.social.following.length !== 1 ? 'seguidos' : 'seguido'}</p>

                                </Col>

                            </Row>

                        </Col>

                        {/* <Col style={{ height: '200px', flexGrow: '1' }}>

                            <Calendar xs='auto' data={data} />

                        </Col> */}

                    </Row>

                </header>

            )}
        </AppContext.Consumer>
    )
}

export default ProfileHeader