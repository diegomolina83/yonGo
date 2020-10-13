import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Cards.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import fireIcon from '../../pages/user/plans_viewer/fuego.png'
import Schedule from '../Icons/ScheduleIcon'
import ClockIcon from '../Icons/ClockIcon'
import AttendeesIcon from '../Icons/AttendeesIcon'


class CardPlan extends Component {

    renderIfExist() {
        let cardProps = this.props
        return (
            <>
                <div onMouseOver={() => this.props.highlightPlan(this.props.properties.planId)} onMouseOut={() => this.props.understate(this.props.properties.planId)} id={`card${this.props.properties.planId}`} className="cardPlan">
                    <Link to={{
                        pathname: `/plans/details/${this.props.properties.planId}`,
                        cardProps: {
                            cardProps: cardProps.properties
                        }
                    }}>

                        <Card className='d-flex justify-content-center mb-3' style={{ width: '18rem' }}>
                            <Card.Img style={{ maxHeight: '140px', objectFit: 'cover' }} variant="top" src={this.props.properties.imageUrl} />
                            <Card.Body>

                                <Card.Title >{this.props.properties.title}</Card.Title>

                                <div id="event-date">

                                    <Schedule />

                                    <Card.Text className='mb-1 d-inline-block ml-2'>
                                        {this.props.properties.start.date.slice(0, 10)}
                                    </Card.Text>

                                </div>

                                <div id="event-time">

                                    <ClockIcon />

                                    <Card.Text className='mb-1 d-inline-block ml-2'>
                                        {this.props.properties.start.date.slice(this.props.properties.start.date.indexOf('T') + 1, this.props.properties.start.date.indexOf('T') + 6)}
                                    </Card.Text>

                                </div>

                                <div id="event-attendees" className='mb-3'>

                                    <AttendeesIcon />

                                    <Card.Text className='d-inline-block ml-1'>
                                        {this.props.properties.attendees.length}
                                    </Card.Text>

                                    {this.props.properties.attendees.length > 10 ?
                                        <img src={fireIcon} alt="llama de fuego" className='ml-2' style={{ width: '15px' }} title='vas a morir!' /> : null}



                                </div>

                                <Row>

                                    <Col>

                                        <Button variant="primary" size='sm'>Go somewhere</Button>

                                    </Col>

                                </Row>

                            </Card.Body>
                        </Card>

                    </Link>
                </div>
            </>
        )
    }


    render() {
        return (
            <>
                { this.props.properties.title ? this.renderIfExist() : null}
            </>
        )
    }

}


export default CardPlan








