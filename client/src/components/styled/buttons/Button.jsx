import React from 'react'

import styled from 'styled-components'

const StyledBtn = styled.button`

    background-color: ${({ bgColor }) => bgColor};
    color: ${({ color }) => color};
    border: solid 1px ${({ borderColor }) => borderColor};
    transition: all;
    transition-duration: .5s;

    :hover{

        filter: brightness(.9);
        color: ${props => props.color}
    }

    :active{

        filter: brightness(.7)
    }

`
const SmallButton = ({ children, variant, outline, size, onClick, className, ariaControls, ariaExpanded, type, style }) => {

    let sizeClass

    let bgColor
    let color

    // switch for sizes
    switch (size) {
        case 'sm':
            sizeClass = 'btn btn-sm'
            break;

        case 'lg':
            sizeClass = 'btn btn-lg'
            break;

        default:
            sizeClass = 'btn'
            break;
    }


    // switch for colors    

    switch (variant) {

        case 'light':
            bgColor = '#f8f8f8'
            color = 'black'
            break;

        case 'lightGrey':
            bgColor = '#e9e9e9'
            color = 'black'
            break;

        case 'grey':
            bgColor = '#e1e1e1'
            color = 'black'
            break;

        case 'yellow':
            bgColor = '#fbff8e'
            color = 'black'
            break;

        case 'red':
            bgColor = '#ef4b4c'
            color = 'white'
            break;

        case 'lightBlue':
            bgColor = '#5f7ab8'
            color = 'white'
            break;

        case 'blue':
            bgColor = '#43506c'
            color = 'white'
            break;

        case 'darkBlue':
            bgColor = '#303647'
            color = 'white'
            break;

        case 'darkGrey':
            bgColor = '222222'
            color = 'white'

        default:
            bgColor = 'black'
            color = 'white'
            break;
    }

    const borderColor = bgColor

    if (outline) {

        color = borderColor
        bgColor = 'none'
    }

    // switch for border


    // array with all the classes
    const classesArray = []
    classesArray.push(className, sizeClass)

    // button type
    const btnType = type ? type : 'button'

    return (

        <StyledBtn
            className={classesArray.join(' ')}
            bgColor={bgColor}
            color={color}
            borderColor={borderColor}
            onClick={onClick}
            aria-controls={ariaControls}
            aria-expanded={ariaExpanded}
            type={btnType}
            style={style}
        >
            {children}
        </StyledBtn>
    )
}

export default SmallButton