import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import '../../App.css'
import '../../shared/maps/Maps.css'


class Filtro extends Component {

    constructor(props) {
        super()
    }
    render() {
        {console.log(this.props)}
        return (
            <Button className={`filter ${this.props.buttonColor}`} id={this.props.name}
                onClick={this.props.filter} >{this.props.src ? <img src={this.props.src}
                    alt={this.props.name} /> : "Todos"}</Button>
        )

    }
}

export default Filtro

