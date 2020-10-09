import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Cards.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import deporte from '../../../images/deporte.jpg'



class CardPlan extends Component {

    renderIfExist() {
        let cardProps = this.props
        return (
            <>
                <div onMouseOver={() => this.props.highlightPlan(this.props.properties.planId)} onMouseOut={() => this.props.understate(this.props.properties.planId)} id={`card${this.props.properties.planId}`} className="cardPlan">
                    <Link to={{
                        pathname: `/plans/details/${this.props.properties.planId}`,
                        cardProps: {
                            cardProps
                        }
                    }}>   < Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={this.props.properties.imageUrl} />
                            <Card.Body>
                                <Card.Title><h2>{this.props.properties.title}</h2></Card.Title>
                                <Card.Text>
                                    <p>Puntuación:{this.props.properties.markAmount}</p>
                                </Card.Text>
                                <Button size="sm" variant="primary">{this.props.properties.title}</Button>
                            </Card.Body>
                        </Card ></Link>
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






