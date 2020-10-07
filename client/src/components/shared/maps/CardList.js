import React, { Component } from 'react'
import Card from '../maps/Card'
import PlanService from '../../../service/plan.service'


class CardList extends Component {

    constructor(props) {
        super()
        this.state = {
            plans: [],
        }
        this.PlanService = new PlanService()
    }


    componentDidMount = () => this.loadPlans()


    loadPlans = () => {
        this.PlanService
            .getAllPlans()
            .then(response => this.setState({ plans: response.data }))
            .catch(err => console.log('Error:', err))
    }


    render() {
        return (
            <>
                {this.props.clusters.map((elm, idx) => <Card highlightPlan={this.props.highlightPlan} understate={this.props.understate} key={idx} {...elm} />)}
            </>
        )
    }
}


export default CardList


//La variable clusters tiene todos los planes visibles en el mapa
//la variable plans tiene todos los planes de la app

// Para el futuro-->{this.props.clusters.map(elm => <Card loggedInUser={this.props.loggedInUser} key={elm._id} {...elm} />)}