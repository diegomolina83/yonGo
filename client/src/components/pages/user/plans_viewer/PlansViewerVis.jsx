import React, { useState, useEffect } from 'react'

import { Row, Col } from 'react-bootstrap'

import TopButtons from './PlansSwitcher'
import PlanCard from './PlanCard'

import './PlansViewer.css'


const PlansViewer = ({ user, plansList, backLink }) => {

    const [shownPlans, setShownPlan] = useState('all-plans')

    const plansToRender = shownPlans === 'all-plans' ? plansList : plansList.filter(elm => elm.creator === user._id)

    const plansHandler = (e) => {

        // Clicked btn class change
        e.target.classList.replace('deselected', 'selected')

        // Previous btn class change
        document.getElementById(shownPlans).classList.replace('selected', 'deselected')

        // State update
        setShownPlan(e.target.id)
    }

    // // We set the height of the cards window
    const setContainerHeight = () => {

        document.getElementById('plans-container').height = document.getElementById('plans-container') ? 200 : null

        // const windowHeight = window.innerHeight
        // const plansContainerY = document.getElementById('plans-container') ? document.getElementById('plans-container').getBoundingClientRect().top : null

        // const containerHeight = windowHeight - plansContainerY
    }

    return (

        <>

            <TopButtons allPlans={plansList.length} createdPlans={plansList.filter(elm => elm.creator === user._id).length} switcher={plansHandler} backLink={backLink} />

            <div id='plans-container' className='justify-space-between'>

                <Row id='plans-content'>

                    {plansList.length ?

                        <> {

                            plansToRender.map((elm, idx) => <PlanCard key={idx} plan={elm} />)

                        }</> : <p style={{ textAlign: 'center' }}>No hay planes que mostrar</p>
                    }

                </Row>

            </div>

        </>
    )
}

export default PlansViewer