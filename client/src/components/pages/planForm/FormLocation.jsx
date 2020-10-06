import React, { useState } from 'react'

import ReactPlacesAutocomplete from '../../shared/maps/ReactPlacesAutocomplete'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

const PlanFormLocation = (props) => {
    const [open, setOpen] = useState({ value: false, btnText: 'Añadir final', toogleFun: props.hasEndToogle });


    const getCoords = (coords) => {
        console.log(coords)
        // this.setState({
        //     lat: coords[0],
        //     lng: coords[1]
        // })
    }



    return (

        <>

            <Form.Group className='px-3 pt-3 border rounded bg-light'>

                <Form.Label>Inicio</Form.Label>

                <Form.Group>
                    <ReactPlacesAutocomplete getCoords={getCoords} />
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Control type="date" name="startDate" value={props.formState.inversions} onChange={props.handleInputChange} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                            <Form.Control type="time" name="startTime" value={props.formState.inversions} onChange={props.handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>

                <Collapse in={open.value}>

                    <div className='smoother'>

                        <Form.Label>Final</Form.Label>

                        <Form.Group>
                            {/* <PlacesAutocomplete /> */}
                            <Form.Control type="text" name="endLocation" value={props.formState.length} onChange={props.handleInputChange} placeholder='Ubicación' />
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Control type="date" name="endDate" value={props.formState.inversions} onChange={props.handleInputChange} />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group>
                                    <Form.Control type="time" name="endTime" value={props.formState.inversions} onChange={props.handleInputChange} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </Collapse>

                <Button
                    variant={props.styles.button.discreet}
                    className='mb-3 d-block d-sm-inline mx-auto'
                    size='sm'
                    onClick={() => setOpen({
                        value: !open.value,
                        btnText: open.btnText.includes('Añadir') ? 'Eliminar final' : 'Añadir final',
                        toogleFun: props.hasEndToogle()
                    })}
                    aria-controls="example-collapse-text"
                    aria-expanded={open.value}>{open.btnText}</Button>

            </Form.Group>

        </>
    )
}

export default PlanFormLocation