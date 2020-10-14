import PlanService from '../../../service/plan.service'
import React, { Component } from 'react'
import BackArrow from '../../styled/BackArrow'
import MainNavbar from '../../shared/navbar/MainNavbar'
import GoogleMapReact from 'google-map-react';

import '../../App.css'
import ScheduleIcon from '../../../components/shared/Icons/ScheduleIcon'
import ClockIcon from '../../../components/shared/Icons/ClockIcon'
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api'
import { Link } from 'react-router-dom'


const containerStyle = {
    width: '60vh',
    height: '50vh'
}


class PlanDetails extends Component {

    constructor() {
        super()
        this.state = {
            propCard:{},
            end: {},
            center:{}
            
        }
        this.planService = new PlanService()
        
    }


    componentDidMount() {

        this.planService.getOnePlan(this.props.match.params.plan)
            .then(response => this.setState({ propCard: response.data }))
            .catch(err => console.log(err))
        console.log(this.state.propCard)
        
       
    }


    setCenter() {
        if(this.state.propCard.start)
        { this.center = { lat: parseFloat(this.state.propCard.start.location.lat), lng: parseFloat(this.state.propCard.start.location.lng) } }
        else console.log()
    }

    setEnd() {
        if (this.state.propCard.end)
            this.state.end = { lat: parseFloat(this.state.propCard.end.location.lat), lng: parseFloat(this.state.propCard.end.location.lng) }
        else this.state.end = {}
    }

    putImage = () => {
        if (this.props.loggedInUser) {
            return (<Link to={`/user/profile/${this.state.propCard.creator}`}>
                <img className="profileImageDetail" src={this.props.loggedInUser.imageUrl} /></Link>)
        }
        else return (<button className="userImgButton" onClick={() => {

        }}><img className="profileImageDetail" src="https://lacasitacreativa.files.wordpress.com/2012/11/282416.gif" /></button>)
    }

    render() {
        
        this.state.propCard ? this.setCenter() : console.log()
        return (
            <>
                <MainNavbar />

                <div className="details">
                    <BackArrow backLink={this.props.history.goBack} color='red' />
                    <div className="detailsBody">

                        <h1>{this.state.propCard.title}</h1>

                        <div className="imageAndMapDetail">
                            <img src={this.state.propCard.imageUrl} />
                            {}
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={this.center}
                                zoom={20}
                            >
                                <Marker
                                    position={this.center}
                                    title="Principio"
                                />
                                {this.setEnd()}
                                {this.state.end ? <Marker position={this.state.end} title="Final" /> : console.log()}
                            </GoogleMap>
                        </div>

                        <div className="infoDetail">

                            <h2>{this.state.propCard.description}</h2>
                            <div className="dateAndProfileDetail">
                                <div className="dateDetails">
                                    {/* <ScheduleIcon /> {this.state.propCard.start.date.slice(0, 10)}
                                    <ClockIcon />  {this.state.propCard.start.date.slice(this.state.propCard.start.date.indexOf('T') + 1, this.state.propCard.start.date.indexOf('T') + 6)} */}
                                </div>
                                <div className="profileDetail">
                                    {this.putImage()}
                                    {/* <img className="profileImageDetail" src={this.props.loggedInUser.imageUrl} /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}


export default PlanDetails