import React, { Component } from 'react'
import './MainNavbar.css'

import Navbar from 'react-bootstrap/Navbar'
import NavbarLogo from '../../styled/navbar/logo'

class MainNavbar extends Component {

    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (

            <Navbar className='p3 bg-light main-navbar' fixed='top'>

                <NavbarLogo color='red' />

            </Navbar>
        )
    }
}

export default MainNavbar