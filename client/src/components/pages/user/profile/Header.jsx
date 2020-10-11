import React from 'react'

import { Row, Col, Image } from 'react-bootstrap'

import Button from '../../../styled/buttons/Button'

const ProfileHeader = ({ user }) => {

    return (

        <header>

            <Row>

                <Col id='profile-img' xs='auto'>
                    <Image src={user.imageUrl} roundedCircle />
                </Col>

                <Col id='user-info' xs='auto'>

                    <Row className='mb-3'>

                        <Col xs='auto'>

                            <p className='d-inline-block mb-0 font-weight-bold' style={{ fontSize: '2em' }}>{user.username}</p>

                        </Col>

                        <Col className='d-flex align-items-center'>

                            <Button variant='lightBlue' size='sm' onClick={() => console.log('Me presionaste')}>Editar</Button>

                        </Col>

                    </Row>

                    <Row className='justify-content-start py-1'>

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

            </Row>

        </header>

    )
}

export default ProfileHeader