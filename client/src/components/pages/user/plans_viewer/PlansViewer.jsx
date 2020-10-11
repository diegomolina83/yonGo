import React, { Component } from 'react'

import { Row, Col } from 'react-bootstrap'

import TopButtons from './PlansSwitcher'
import PlanCard from './PlanCard'

import './PlansViewer.css'


class PlansViewer extends Component {

    constructor({ user, plansList }) {
        super()
        this.state = {

            user: user,

            userPlans: plansList,

            currentShownPlans: 'all-plans',

            plansContainerHeight: 0,

            currentShownPlans: 'all-plans'

        }
    }

    componentDidMount() {

        window.addEventListener("resize", this.setPlansScrollSize)
    }

    componentWillUnmount() {
        window.addEventListener("resize", null);
    }

    plansHandler = (e) => {

        // Clicked btn class change
        e.target.classList.replace('deselected', 'selected')

        // Clicked btn class change
        document.getElementById(this.state.currentShownPlans).classList.replace('selected', 'deselected')

        // State update
        this.setState({ currentShownPlans: e.target.id })

    }

    setPlansScrollSize = () => {

        const windowHeight = window.innerHeight
        const plansContainerY = document.getElementById('plans-container').getBoundingClientRect().top

        this.setState({ plansContainerHeight: windowHeight - plansContainerY })
    }

    plansHandler = (e) => {

        // Clicked btn class change
        e.target.classList.replace('deselected', 'selected')

        // Clicked btn class change
        document.getElementById(this.state.currentShownPlans).classList.replace('selected', 'deselected')

        // State update
        this.setState({ currentShownPlans: e.target.id })

    }

    scrolleo = e => {

        console.log(e.target);

        const scrollContent = document.getElementById('plans-content')

        // .scrollHeight = e.target.offsetHeight + e.target.scrollTop (the maximun one)
        console.log('scrollHeight', scrollContent.scrollHeight) // The height of the content defined by its own content
        console.log('e.target.scrollTop: ', e.target.scrollTop);    // Scroll value in y
        console.log('e.target.offsetHeight: ', e.target.offsetHeight);  // The height of the container (setted in the styles)

        // console.log('parent.getBoundingClientRect()', scrollContent.getBoundingClientRect());

        // console.log('window.innerHeight: ', window.innerHeight);
    }

    render() {

        let plansToRender = this.state.currentShownPlans === 'all-plans' ? this.state.userPlans : this.state.userPlans.filter(elm => elm.creator === this.props.match.params.userId)

        plansToRender = plansToRender.slice(0, 20)

        return (

            <>

                <TopButtons plansHandler={this.plansHandler} />

                <div id='plans-container' className='hidden-scroll justify-space-between' onScroll={this.scrolleo} onPointerEnter={this.showPlansScroll} onPointerLeave={this.showPlansScroll} style={{ height: `${this.state.plansContainerHeight}px` }}>

                    <Row id='plans-content'>

                        {this.state.userPlans.length ?

                            <> {

                                plansToRender.map((elm, idx) => <PlanCard key={idx} plan={elm} />)

                            }</> : <p style={{ textAlign: 'center' }}>No hay planes que mostrar</p>
                        }

                    </Row>

                </div>

            </>
        )
    }
}

export default PlansViewer