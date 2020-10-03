import React, { Component } from 'react';
import morty from '../../../images/morty.png'



class Prueba extends Component {
    

    render() {
        return (
           <img className="marker" src={morty}></img>
        );
    }
}

export default Prueba;
