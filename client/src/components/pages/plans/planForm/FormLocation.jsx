import React, { useState } from 'react'

import ReactPlacesAutocomplete from '../../../shared/maps/ReactPlacesAutocomplete'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
//import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

import Button from '../../../styled/buttons/Button'




const PlanFormLocation = (props) => {
    const [open, setOpen] = useState({ value: false, btnText: 'Añadir final', toogleFun: props.hasEndToogle });


    return (

        <Form.Group className='p-3 border rounded bg-light'>

            <Form.Label>Inicio</Form.Label>

            <Form.Group>
                <ReactPlacesAutocomplete flag={"start"} getCoords={props.getCoords} />
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
                        <ReactPlacesAutocomplete flag={"end"} getCoords={props.getCoords} />
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
                variant='lightBlue'
                className='d-block d-sm-inline mx-auto add-final'
                size='sm'
                onClick={() => setOpen({
                    value: !open.value,
                    btnText: open.btnText.includes('Añadir') ? 'Eliminar final' : 'Añadir final',
                    toogleFun: props.hasEndToogle()
                })}
                aria-controls="example-collapse-text"
                aria-expanded={open.value}
                outline
            >
                {open.btnText}
            </Button>

        </Form.Group>

    )
}

export default PlanFormLocation