import React from 'react'

import './InfoBar.css'

import nuknuk from '../../../images/nuknuk.png'

const InfoBar = ({ room }) => (

    <div className="infoBar">
        <div className="leftInnerContainer">
            
            <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
            <a href='/'></a>
        </div>
    </div>

)

export default InfoBar