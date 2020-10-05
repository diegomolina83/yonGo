import React, { Component } from 'react'
import PlanService from '../../../service/plan.service'
import './Cards.css'


class Card extends Component {

    constructor(props) {
        super()
        this.state = {

        }
        this.PlanService = new PlanService()
    }


    componentDidMount = () => {


    }
    renderIfExist() {

        return (
            <>
                <div className="cardPlan">
                    <h2>{this.props.properties.title}</h2>
                    <p>Puntuación:{this.props.properties.markAmount}</p>
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






