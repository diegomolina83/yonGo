import React from 'react'

import { Row, Col, Navbar } from 'react-bootstrap'

import BackArrow from '../../../styled/BackArrow'

import './PlansViewer.css'

const PlansSwitcher = ({ allPlans, createdPlans, switcher, backLink }) => {

    return (

        <Row id='plans-switcher' className='mb-3' style={{ position: 'sticky', top: '54px', zIndex: '1', backgroundColor: 'white' }}>

            <Col xs='auto' className='d-flex align-items-center'>

                <BackArrow id='plans-back-arrow' backLink={backLink} />

            </Col>

            <Col id='created-plans' className='py-2 deselected' style={{ textAlign: 'center', cursor: 'pointer' }}
                onClick={switcher}>

                <p className='mb-0' style={{ pointerEvents: 'none', cursor: 'none' }}>

                    <span style={{ fontWeight: '700' }}>{createdPlans} </span>
                    {createdPlans !== 1 ? 'creaciones' : 'creación'}

                </p>

            </Col>

            <Col id='all-plans' className='py-2 selected' style={{ textAlign: 'center', cursor: 'pointer' }}
                onClick={switcher}>

                <p className='mb-0' style={{ pointerEvents: 'none', cursor: 'none' }}>

                    <span style={{ fontWeight: '700' }}>{allPlans} </span>
                    {allPlans !== 1 ? 'participaciones' : 'participación'}

                </p>

            </Col>

        </Row>

    )
}

export default PlansSwitcher