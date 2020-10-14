import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import '../../App.css'
import '../../shared/maps/Maps.css'


class Filtro extends Component {

    constructor() {
        super()
    }
    render() {

        return (
            <Button className={`filter ${this.props.buttonColor}`} id={this.props.name} onClick={this.props.filter} >
                {this.props.src ? this.props.name : "Todos"}</Button>
        )

    }
}

export default Filtro

