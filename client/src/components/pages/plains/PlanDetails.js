import React, { Component } from 'react'
import BackArrow from '../../styled/BackArrow'


class PlanDetails extends Component {

    constructor(props) {
        super()
        console.log(props)
        this.propCard = props.location.cardProps.cardProps
    }

    render() {
        return (
            <>
                <BackArrow backLink={this.props.history.goBack} color='red' />
                <h1>{this.propCard.title}</h1>
                <h2>{this.propCard.description}</h2>
                <h2>{this.propCard.requirements}</h2>

            </>
        )
    }
}


export default PlanDetails