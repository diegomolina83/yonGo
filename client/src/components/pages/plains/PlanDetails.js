import React from 'react'
// import BackArrow from '../../styled/BackArrow'


function PlanDetails(props) {
    const propCard = props.location.cardProps.cardProps.properties

    return (
        <>
            {/* <BackArrow backLink={props.history.goBack} color='red' /> */}
            <h1>{propCard.title}</h1>
            <h2>{propCard.description}</h2>
            <h2>{propCard.requirements}</h2>

        </>
    )
}


export default PlanDetails