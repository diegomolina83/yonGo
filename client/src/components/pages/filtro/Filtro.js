import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import '../../App.css'


class Filtro extends Component {

    constructor(props) {
        super()
    }

    render() {
        return (
            <Button className="filter" id={this.props.name} onClick={this.props.filter} >{this.props.name}</Button>
        )

    }
}

export default Filtro