import React from 'react'



function PlanDetails(props) {
    const propCard = props.location.cardProps.cardProps.properties
    return (
        <>
            <h1>{propCard.title}</h1>
            <h2>{propCard.description}</h2>
            <h2>{propCard.requirements}</h2>

        </>
    )
}


export default PlanDetails