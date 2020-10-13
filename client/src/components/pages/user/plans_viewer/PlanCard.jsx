import React from 'react'
import { Link } from 'react-router-dom'

import AppContext from '../../../context/AppContext'

import { Row, Col, Card } from 'react-bootstrap'

import Button from '../../../styled/buttons/Button'

import fireIcon from './fuego.png'

const PlanCard = ({ plan, userId }) => {

    return (

        <AppContext.Consumer>

            {({ loggedInUser }) => (

                <Col sm='6' md='4' className='d-flex justify-content-center mb-3'>

                    <Link to={{
                        pathname: `/plans/details/${plan._id}`,
                        cardProps: {
                            cardProps: plan
                        }
                    }}
                        style={{ textDecoration: 'none', color: 'inherit' }}>

                        <Card style={{ width: '18rem' }} className='shadow' style={{ position: 'relative' }}>

                            <Card.Img style={{ height: '140px', objectFit: 'cover' }} variant="top" src={plan.imageUrl} />

                            <Card.Body>

                                <Card.Title >{plan.title}</Card.Title>

                                <div id="event-date" className='mb-1'>

                                    <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-calendar" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                    </svg>

                                    <Card.Text className='mb-0 d-inline-block ml-2'>
                                        {plan.start.date.slice(0, 10)}
                                    </Card.Text>

                                </div>

                                <div id="event-time" className='mb-1'>

                                    <svg width="1.1em" height="1.1em" viewBox="0 0 16 16" className="bi bi-clock" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z" />
                                        <path fillRule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                                    </svg>

                                    <Card.Text className='mb-0 d-inline-block ml-2'>
                                        {plan.start.date.slice(plan.start.date.indexOf('T') + 1, plan.start.date.indexOf('T') + 6)}
                                    </Card.Text>

                                </div>

                                <div id="event-attendees">

                                    <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    </svg>

                                    <Card.Text className='d-inline-block ml-1 mb-0'>
                                        {plan.attendees.length}
                                    </Card.Text>

                                    {plan.attendees.length > 10 ?
                                        <img src={fireIcon} alt="llama de fuego" className='ml-2' style={{ width: '15px' }} title='vas a morir!' /> : null}

                                </div>

                            </Card.Body>

                            {plan.creator === loggedInUser._id ?

                                <Link style={{ position: 'absolute', top: '10px', left: '10px', color: 'white', backgroundColor: '#ef4b4c', padding: '.4em .6em', borderRadius: '50%' }}>

                                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                    </svg>

                                </Link> : null}

                        </Card>

                    </Link>

                </Col>

            )}
        </AppContext.Consumer>

    )
}

export default PlanCard