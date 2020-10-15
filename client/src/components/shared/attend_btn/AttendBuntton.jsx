import React, { Component } from 'react'

import Button from '../../styled/buttons/Button'

import AppContext from '../../context/AppContext'

import PlanService from '../../../service/plan.service'

// import './FollowButton.css'

class AttendButton extends Component {

    constructor() {

        super()
        this.state = {

            mounted: false
        }

        this.planService = new PlanService()
    }

    componentDidMount() {

        this.planService.isAttendee(this.props.planId, this.props.loggedInUserId)
            .then(response => this.setState({ isAttendee: response.data, mounted: true }))
            .catch(err => console.log({ err }))
    }

    handleAttendance = () => {

        this.planService.handleAttendance(this.props.planId, this.props.loggedInUserId, this.state.isAttendee)
            .then(() => this.setState({ isAttendee: !this.state.isAttendee }))
            .catch(err => console.log({ err }))
    }

    render() {

        return (

            <>
                {this.state.mounted && <Button variant={this.props.variant} size={this.props.size} onClick={this.handleAttendance}>{this.state.isAttendee ? 'Borrarse' : 'Asistir'}</Button>}
            </>
        )
    }
}


export default AttendButton