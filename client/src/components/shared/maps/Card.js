import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Cards.css'


class Card extends Component {

    renderIfExist() {
        let cardProps = this.props
        return (
            <>
                <div onMouseOver={() => this.props.highlightPlan(this.props.properties.planId)} onMouseOut={() => this.props.understate(this.props.properties.planId)} className="cardPlan">
                    <Link to={{
                        pathname: `/plans/details/${this.props.properties.planId}`,
                        cardProps: {
                            cardProps
                        }
                    }}><h2>{this.props.properties.title}</h2>
                        <p>Puntuación:{this.props.properties.markAmount}</p></Link>
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


export default Card






