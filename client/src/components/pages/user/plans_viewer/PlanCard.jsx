import React from 'react'

import { Row, Col, Card } from 'react-bootstrap'

import Button from '../../../styled/buttons/Button'

import fireIcon from './fuego.png'

const PlanCard = ({ plan }) => {

    return (

        <Col sm='6' md='4' className='d-flex justify-content-center mb-3'>

            <Card style={{ width: '18rem' }}>
                <Card.Img style={{ maxHeight: '140px', objectFit: 'cover' }} variant="top" src={plan.imageUrl} />
                <Card.Body>

                    <Card.Title >{plan.title}</Card.Title>

                    <div id="event-date">

                        <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-calendar" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                        </svg>

                        <Card.Text className='mb-1 d-inline-block ml-2'>
                            {plan.start.date.slice(0, 10)}
                        </Card.Text>

                    </div>

                    <div id="event-time">

                        <svg width="1.1em" height="1.1em" viewBox="0 0 16 16" className="bi bi-clock" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z" />
                            <path fillRule="evenodd" d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
                        </svg>

                        <Card.Text className='mb-1 d-inline-block ml-2'>
                            {plan.start.date.slice(plan.start.date.indexOf('T') + 1, plan.start.date.indexOf('T') + 6)}
                        </Card.Text>

                    </div>

                    <div id="event-attendees" className='mb-3'>

                        <svg width="1.2em" height="1.2em" viewBox="0 0 16 16" className="bi bi-person-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        </svg>

                        <Card.Text className='d-inline-block ml-1'>
                            {plan.attendees.length}
                        </Card.Text>

                        {plan.attendees.length > 10 ?
                            <img src={fireIcon} alt="llama de fuego" className='ml-2' style={{ width: '15px' }} title='vas a morir!' /> : null}



                    </div>

                    <Row>

                        <Col>

                            <Button variant="primary" size='sm'>Go somewhere</Button>

                        </Col>

                    </Row>

                </Card.Body>
            </Card>

        </Col>
    )
}

export default PlanCard