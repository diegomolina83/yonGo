import React, { useState } from 'react'

import SearchLocationInput from '../../shared/maps/SearchLocationInput'

import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

const PlanFormLocation = (props) => {
    const [open, setOpen] = useState({ value: false, btnText: 'Añadir final', toogleFun: props.hasEndToogle });

    return (

        <>

            <Form.Group className='px-3 pt-3 border rounded bg-light'>

                <Form.Label>Inicio</Form.Label>

                <Form.Group>
                    <SearchLocationInput formState={props.formState} handleInputChange={props.handleInputChange} />
                    {/* <Form.Control type="text" name="startLocation" value={props.formState.length} onChange={props.handleInputChange} placeholder='Ubicación' /> */}
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
            </Form.Group>

            <Collapse in={open.value}>
                <Form.Group className='px-3 pt-3 border rounded bg-light'>

                    <Form.Label>Final</Form.Label>

                    <Form.Group>
                        <SearchLocationInput />
                        {/* <Form.Control type="text" name="endLocation" value={props.formState.length} onChange={props.handleInputChange} placeholder='Ubicación' /> */}
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

                </Form.Group>
            </Collapse>

            <Button
                className='mb-3'
                variant={props.styles.button.discreet}
                onClick={() => setOpen({
                    value: !open.value,
                    btnText: open.btnText.includes('Añadir') ? 'Eliminar final' : 'Añadir final',
                    toogleFun: props.hasEndToogle()
                })}
                aria-controls="example-collapse-text"
                aria-expanded={open.value}>{open.btnText}</Button>
        </>
    )
}

export default PlanFormLocation