import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './MainNavbar.css'

import Navbar from 'react-bootstrap/Navbar'
import NavbarLogo from '../../styled/navbar/logo'
import { Button, Nav } from 'react-bootstrap'

class MainNavbar extends Component {

    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (

            <Navbar className='p3 bg-light main-navbar' fixed='top'>

                <NavbarLogo color='red' />

                <Nav.Link as={Link} to='/' title='Go to map'>

                    <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-map-fill" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.598-.49L10.5.99 5.598.01a.5.5 0 0 0-.196 0l-5 1A.5.5 0 0 0 0 1.5v14a.5.5 0 0 0 .598.49l4.902-.98 4.902.98a.502.502 0 0 0 .196 0l5-1A.5.5 0 0 0 16 14.5V.5zM5 14.09V1.11l.5-.1.5.1v12.98l-.402-.08a.498.498 0 0 0-.196 0L5 14.09zm5 .8V1.91l.402.08a.5.5 0 0 0 .196 0L11 1.91v12.98l-.5.1-.5-.1z" />
                    </svg>

                </Nav.Link>

            </Navbar>
        )
    }
}

export default MainNavbar