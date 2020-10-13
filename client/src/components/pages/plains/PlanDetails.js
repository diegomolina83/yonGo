import React, { Component } from 'react'
import BackArrow from '../../styled/BackArrow'
import MainNavbar from '../../shared/navbar/MainNavbar'
import GoogleMapReact from 'google-map-react';

import '../../App.css'
import ScheduleIcon from '../../../components/shared/Icons/ScheduleIcon'
import ClockIcon from '../../../components/shared/Icons/ClockIcon'
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api'


const containerStyle = {
    width: '600px',
    height: '400px'
}


class PlanDetails extends Component {

    constructor(props) {
        super()
        this.propCard = props.location.cardProps.cardProps
        this.center = { lat: parseFloat(this.propCard.start.location.lat), lng: parseFloat(this.propCard.start.location.lng) }
        this.end = {}
    }

    setEnd() {
        if (this.propCard.end)
            this.end = { lat: parseFloat(this.propCard.end.location.lat), lng: parseFloat(this.propCard.end.location.lng) }
        else this.end = {}
    }

    render() {
        console.log(this.props.loggedInUser)
       
        return (
            <>
                <MainNavbar />
                <div className="details">
                    <BackArrow backLink={this.props.history.goBack} color='red' />
                    <div className="detailsBody">
                        <h1>{this.propCard.title}</h1>
                        <img src={this.propCard.imageUrl} />
                        <p>
                            <ScheduleIcon /> {this.propCard.start.date.slice(0, 10)}
                        </p>
                        <ClockIcon />  {this.propCard.start.date.slice(this.propCard.start.date.indexOf('T') + 1, this.propCard.start.date.indexOf('T') + 6)}
                        <p>{this.propCard.category}</p>
                        <h2>{this.propCard.description}</h2>
                        <h2>{this.propCard.requirements}</h2>
                        <img src={this.props.loggedInUser.imageUrl}/>

                    </div>

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
                        {this.end ? <Marker position={this.end} title="Final" /> : console.log()}


                    </GoogleMap>


                </div>

            </>
        )
    }
}


export default PlanDetails