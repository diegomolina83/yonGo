import React from 'react'
import styled from 'styled-components'

import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'

const StyledLogo = styled.a`

    font-family: 'Sansita Swashed', cursive;
    font-weight: 700;
    font-size: 1.25em;
    color: #3d4046;

    :hover{

        text-decoration:none;
        color: black
    }

    @media (min-width: 576px){

        font-size: 1.5em;
    }
`

const NavbarLogo = () => {

    return (

        <StyledLogo as={Link} to="/" className='p-0 m-0'>yonGo</StyledLogo>
    )
}

export default NavbarLogo