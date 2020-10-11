import React from 'react'

import Spinner from 'react-bootstrap/Spinner'

const LoadingMessage = ({ message }) => {

    return (

        <div className='d-flex flex-column align-items-center' style={{ position: 'absolute', top: '50%', left: '50%', width: '200px', transform: 'translate(-100px)' }}>

            <Spinner animation="border" />

            <p style={{ display: 'inline-block', textAlign: 'center', margin: 0, marginTop: '1rem' }}>{message}</p>

        </div>

    )
}

export default LoadingMessage