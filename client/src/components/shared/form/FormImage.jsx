import React from 'react'

import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'

import Spinner from '../loading_spinner/LoadingMessage'

//import './FormImage.css'

const FormImage = ({ src, onChange, loading }) => {

    return (

        <Form.Group>

            <Form.Label style={{ display: 'block' }}>Imagen</Form.Label>

            <div id="form-img" className='mb-2 d-flex align-items-center' style={{ height: '100px', width: '100px', display: 'inline-block', position: 'relative' }}>

                {loading ? <><Spinner>Cargando imagen</Spinner>
                    <Image src={src} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(2)' }} /></>
                    :
                    <Image src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                }

            </div>


            <Form.Control type='file' name='imageUrl' onChange={onChange} />

        </Form.Group>
    )
}

export default FormImage