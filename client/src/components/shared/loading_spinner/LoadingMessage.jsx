import React from 'react'

import Spinner from 'react-bootstrap/Spinner'

const LoadingMessage = ({ children }) => {

    return (

        <div className='d-flex flex-column align-items-center justify-content-center' style={{ position: 'absolute', width: '100%', height: '100%' }}>

            <Spinner animation="border" />

            <p style={{ display: 'inline-block', textAlign: 'center', margin: 0, marginTop: '1rem' }}>{children}</p>

        </div>

    )
}

export default LoadingMessage