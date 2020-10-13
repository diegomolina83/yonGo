import React, { Component } from 'react'

import { Row, Col } from 'react-bootstrap'

import TopButtons from './PlansSwitcher'
import PlanCard from './PlanCard'

import './PlansViewer.css'


class PlansViewer extends Component {

    constructor({ user, plansList, backLink }) {

        super()

        this.state = {

            shownPlans: 'all-plans',
            cardsRowHeight: 0,
            cardsPerRow: undefined,
            indexesToShow: []
        }
    }

    shownPlansSwitcher = e => {

        e.target.classList.replace('deselected', 'selected')
        document.getElementById(this.state.shownPlans).classList.replace('selected', 'deselected')

        this.setState({ shownPlans: e.target.id })
    }

    componentDidMount() {

        window.addEventListener('load', this.setCardsRowValues)
        window.addEventListener('scroll', this.setRenderedPlansIndexes)
        window.addEventListener('resize', this.setCardsRowValues)

        this.setCardsRowValues()
    }

    componentWillUnmount() {

        window.removeEventListener('load', this.setCardsRowValues)
        window.removeEventListener('scroll', this.setRenderedPlansIndexes)
        window.removeEventListener('resize', this.setCardsRowValues)
    }

    setCardsRowValues = () => {

        let cardsPerRow

        if (window.innerWidth < 576) {

            cardsPerRow = 1

        } else if (window.innerWidth < 768) {

            cardsPerRow = 2

        } else {

            cardsPerRow = 3
        }

        const cardElement = document.getElementById('plans-content').firstElementChild
        const cardOffsetHeight = cardElement.offsetHeight

        const computedMargin = window.getComputedStyle(cardElement).getPropertyValue('margin-bottom')
        const margin = Number(computedMargin.slice(0, computedMargin.indexOf('p')))

        const cardsRowHeight = cardOffsetHeight + margin

        this.setState({ cardsRowHeight: cardsRowHeight, cardsPerRow: cardsPerRow }, this.setRenderedPlansIndexes)
    }

    setRenderedPlansIndexes = () => {

        let indexesToShow
        const rowsAmountToRender = 7
        let contentPaddingTop
        const saveMarginRows = 2

        if (window.scrollY === 0) {

            document.getElementById('top-back-arrow').classList.remove('inactive')

            const plansBackArrow = document.getElementById('plans-back-arrow')
            plansBackArrow.classList.add('inactive')
            plansBackArrow.parentElement.classList.add('inactive')

            document.getElementById('plans-container').style.paddingTop = '0'

            indexesToShow = [0, this.state.cardsPerRow * rowsAmountToRender]

        } else {

            // We change back arrows display
            if (this.previousScrollValue === 0) {

                //document.getElementById('plans-container').style.paddingTop = '722px'

                document.getElementById('top-back-arrow').classList.add('inactive')

                const plansBackArrow = document.getElementById('plans-back-arrow')
                plansBackArrow.classList.remove('inactive')
                plansBackArrow.parentElement.classList.remove('inactive')
            }

            // We set indexes to show and content padding

            let firstIndexToShow = Math.floor((window.scrollY - (this.state.cardsRowHeight * saveMarginRows)) / this.state.cardsRowHeight) * this.state.cardsPerRow
            firstIndexToShow = firstIndexToShow > 0 ? firstIndexToShow : 0
            const secondIndexToShow = firstIndexToShow + this.state.cardsPerRow * rowsAmountToRender

            indexesToShow = [firstIndexToShow, secondIndexToShow]
            contentPaddingTop = (firstIndexToShow / this.state.cardsPerRow) * this.state.cardsRowHeight

            document.getElementById('plans-container').style.paddingTop = `${contentPaddingTop}px`
        }

        const contentPaddingBot = ((this.props.plansList.length - indexesToShow[1]) * this.state.cardsRowHeight) / this.state.cardsPerRow
        document.getElementById('plans-container').style.paddingBottom = `${contentPaddingBot}px`

        this.previousScrollValue = window.scrollY

        this.setState({ indexesToShow: indexesToShow })
    }

    render() {

        if (!this.props.user || !this.props.plansList || !this.props.backLink) {

            return null
        }

        const plansToShow = this.state.shownPlans === 'all-plans' ?
            this.props.plansList.slice(this.state.indexesToShow[0], this.state.indexesToShow[1]) :
            this.props.plansList.filter(elm => elm.creator === this.props.user._id).slice(this.state.indexesToShow[0], this.state.indexesToShow[1])



        return (

            <>

                <TopButtons
                    allPlans={this.props.plansList.length}
                    createdPlans={this.props.plansList.filter(elm => elm.creator === this.props.user._id).length}
                    switcher={this.shownPlansSwitcher}
                    backLink={this.props.backLink} />

                <div id='plans-container' className='justify-space-between px-3'>

                    <Row id='plans-content'>

                        {plansToShow.length ?

                            <> {

                                plansToShow.map((elm, idx) => <PlanCard key={idx} plan={elm} userId={this.props.user._id} />)

                            }</> : <p style={{ textAlign: 'center' }}>No hay planes que mostrar</p>
                        }

                    </Row>

                </div>

            </>
        )
    }
}

export default PlansViewer