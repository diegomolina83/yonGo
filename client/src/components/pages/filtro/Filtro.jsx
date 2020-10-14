import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import '../../App.css'
import '../../shared/maps/Maps.css'
import CustomButton from '../../styled/buttons/Button'


const Filtro = ({ buttonColor, name, filter, src, variant }) => {



    return (
        <CustomButton variant={variant} size='sm' className={`${buttonColor}`} id={name} onClick={filter} >
            {src ? name : "Todos"}</CustomButton>
    )


}

export default Filtro

