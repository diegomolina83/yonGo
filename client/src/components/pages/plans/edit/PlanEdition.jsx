import React, { Component } from 'react'

import PlanService from '../../../../service/plan.service'

import PlanForm from '../planForm/PlanForm'

class PlanEdition extends Component {

    constructor() {
        super()
        this.state = {}

        this.planService = new PlanService()
    }

    componentDidMount() {

        this.planService.getOnePlan()
    }

    render() {
        return (

            <PlanForm />
        )
    }
}

export default PlanEdition