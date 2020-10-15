import PlanService from '../../../service/plan.service'
import UserService from '../../../service/user.service'
import React, { Component } from 'react'
import MainNavbar from '../../shared/navbar/MainNavbar'

import '../../App.css'
import ScheduleIcon from '../../shared/Icons/ScheduleIcon'
import ClockIcon from '../../shared/Icons/ClockIcon'
import AttendeesIcon from '../../shared/Icons/AttendeesIcon'


import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Chat from '../../chat/Chat'


const containerStyle = {
    width: '100%',
    height: '50vh'
}


class PlanDetails extends Component {

    constructor() {
        super()
        this.state = {
            propCard: {},
            end: {},
            center: {},
            creatorData: {}

        }
        this.planService = new PlanService()
        this.userService = new UserService()

    }


    // componentDidMount() {



    //     this.planService.getOnePlan(this.props.match.params.plan)
    //         .then(response => this.setState({ propCard: response.data }))
    //         .then(console.log("CREADOR", this.state.propCard.creator))


    //     this.userService.getOneUser(this.props.match.params.plan.creator)
    //         .then(response => this.setState({ creator: response.data }))
    //         .catch(err => console.log(err))



    // }


    componentDidMount() {

        this.planService.getOnePlan(this.props.match.params.plan)
            .then(response => this.setState({ propCard: response.data }, this.getOneUser))
            .catch(err => console.log({ err }))


    }

    getOneUser = () => {

        this.userService.getOneUser(this.state.propCard.creator)
            .then(response => this.setState({ creatorData: response.data }))
            .catch(err => console.log({ err }))

    }



    createChat() {
        if (this.props.loggedInUser) return (<Chat location={this.props.location} />)
        else return <h6>Tienes que estar registrad@ para ver el chat</h6>
    }

    setCenter() {
        if (this.state.propCard.start) { this.center = { lat: parseFloat(this.state.propCard.start.location.lat), lng: parseFloat(this.state.propCard.start.location.lng) } }
    }

    setEnd() {
        if (this.state.propCard.end)
            this.state.end = { lat: parseFloat(this.state.propCard.end.location.lat), lng: parseFloat(this.state.propCard.end.location.lng) }
        else this.state.end = {}
    }

    putImage = () => {
        if (this.props.loggedInUser) {
            return (
                <div>
                <Link to={`/user/profile/${this.state.propCard.creator}`}>
                        <img className="profileImageDetail" src={this.state.creatorData.imageUrl} />
                        <h5 className="detailCreatorName">{this.state.creatorData.username}</h5></Link></div>)
        }
        else return (<button className="userImgButton" onClick={() => {

        }}><img className="profileImageDetail" src="https://lacasitacreativa.files.wordpress.com/2012/11/282416.gif" /></button>)
    }

    getDate = () => {
        if (this.state.propCard.start) {
            return (this.state.propCard.start.date.slice(0, 10))
        }
    }
    getTime = () => {
        if (this.state.propCard.start) {
            return (this.state.propCard.start.date.slice(this.state.propCard.start.date.indexOf('T') + 1, this.state.propCard.start.date.indexOf('T') + 6))
        }
    }
    getAttendeesNumber = () => {
        if (this.state.propCard.attendees) {
            return (this.state.propCard.attendees.length)
        }
    }

    getAttendees = () => {
        if (this.state.propCard.attendees) {
            this.state.propCard.attendees.forEach(element => {
                
            })
        }
    }

    render() {
        // console.log("LOCATION", this.props.match.params.title)
        this.state.propCard ? this.setCenter() : console.log()

        return (
            <>
                <MainNavbar />
{console.log("++++++++++++++++++++++++++++++++++",this.state)}
                <div className="details">
                    <div className="detailsBody">
                        <Container>
                            <Row>
                                <Col><h1>{this.state.propCard.title}</h1></Col>
                            </Row>
                            <Row>
                                <Col>   <img className="imagePlan" src={this.state.propCard.imageUrl} /></Col>
                                <Col>  <h3>Datos del plan</h3>
                                    <p>{this.state.propCard.description}</p>
                                    <p><ScheduleIcon /> {this.getDate()}</p>
                                    <p><ClockIcon />  {this.getTime()}</p>
                                    <p><AttendeesIcon />  {this.getAttendeesNumber()}</p>
                                    {this.getAttendees()}
                                    <div className="profileDetail">
                                        <h5>Plan creado por:</h5>
                                        {this.putImage()}{}
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <GoogleMap
                                        mapContainerStyle={containerStyle}
                                        center={this.center}
                                        zoom={18}
                                    >
                                        <Marker
                                            position={this.center}
                                            title="Principio"
                                        />
                                        {this.setEnd()}
                                        {this.state.end
                                            ?
                                            <Marker
                                                position={this.state.end}
                                                title="Final" />
                                            :
                                            null}
                                    </GoogleMap>
                                </Col>
                            </Row>
                            {this.createChat()}
                        </Container>
                    </div>
                </div>


            </>
        )
    }

}


export default PlanDetails