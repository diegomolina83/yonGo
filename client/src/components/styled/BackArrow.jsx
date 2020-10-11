import React from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

const StyledIcon = styled.svg`
    width: 1.5em;
    height: 1.5em;
    color: rgb(70, 70, 70);
    
    @media (min-width: 576px) {

        width: 2em;
        height: 2em
    }
}`

const BackArrow = ({ backLink, className }) => {


    return (

        <Link className={className} onClick={backLink} to='#'>

            <StyledIcon viewBox="0 0 16 16" className="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </StyledIcon>

        </Link>
    )
}

export default BackArrow