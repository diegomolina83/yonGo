import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import LogForm from '../log/LogForm'
import SimpleMap from '../../shared/maps/Maps'
import ReactPlacesAutocomplete from '../../shared/maps/ReactPlacesAutocomplete'

import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import CustomButton from '../../styled/buttons/Button'
import Modal from 'react-bootstrap/Modal'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Collapse from 'react-bootstrap/Collapse'

import '../../App.css'

import authService from '../../../service/auth.service'


class Home extends Component {

    constructor() {
        super()
        this.state = {
            loggedInUser: undefined,
            signup: false,
            login: false,
            lat: null,
            lng: null,
            logModal: false,
            logType: undefined,

            logExpand: false,
            filterExpand: false
        }
        this.authService = new authService()
    }

    componentDidMount() {

        if (!this.props.loggedInUser) {

            setTimeout(() => {

                this.setState({ logExpand: true })

            }, 1500)
        }
    }

    getCoords = (coords) => {

        this.setState({
            lat: coords[0],
            lng: coords[1]
        })
        this.change()
    }

    change() {

        this.setState({
            lat: null,
            lng: null
        })
    }

    // putImage = () => {
    //     if (this.props.loggedInUser) {
    //         return (<button className="userImgButton" onClick={() => {
    //             let filterButton = document.getElementsByClassName('menuButtons')
    //             for (let item of filterButton) {
    //                 item.classList.contains('hide') ? item.classList.remove('hide') : item.classList.add('hide')
    //             }
    //         }}><img className="userImg" src={this.props.loggedInUser.imageUrl} /></button>)
    //     }
    //     else return (<img className="userImg" src="https://lacasitacreativa.files.wordpress.com/2012/11/282416.gif" />)
    // }

    putImage = () => {

        if (this.props.loggedInUser) {
            return (<button className="userImgButton" onClick={() => { this.setState({ logExpand: !this.state.logExpand }) }}>
                <img className="userImg" src={this.props.loggedInUser.imageUrl} />
            </button>)
        }
        else return (<img className="userImg" src="https://lacasitacreativa.files.wordpress.com/2012/11/282416.gif" />)
    }




    render() {

        return (
            <>
                <h1 className="logo">yonGo</h1>

                <div className="principalButtons">

                    <Row className='flex-column'>

                        <Col className='mb-2 px-0'>
                            {this.putImage()}
                        </Col>

                        <Col className='d-flex justify-content-center px-0 mb-2'>

                            <Collapse in={this.state.logExpand}>

                                <div id="smoother">
                                    <ButtonGroup vertical>

                                        {this.props.loggedInUser ?
                                            <>
                                                <CustomButton variant='darkBlue' size='sm'>
                                                    <Link to={`user/profile/${this.props.loggedInUser._id}`} style={{ color: 'white', textDecoration: 'none' }}>
                                                        Perfil
                                                    </Link>
                                                </CustomButton>

                                                <CustomButton variant='darkBlue' size='sm'>
                                                    <Link to="/plans/new" style={{ color: 'white', textDecoration: 'none' }}>
                                                        Nuevo plan
                                                    </Link>
                                                </CustomButton>

                                                <CustomButton variant='blue' size='sm' onClick={this.props.logoutUser}>Cerrar sesión</CustomButton>
                                            </>
                                            :
                                            <>
                                                <CustomButton variant='darkBlue' size='sm' onClick={() => this.setState({ logModal: true, logType: 'Login' })}>Login</CustomButton>
                                                <CustomButton variant='darkBlue' size='sm' onClick={() => this.setState({ logModal: true, logType: 'Sign up' })}>Registro</CustomButton>
                                            </>
                                        }

                                    </ButtonGroup>
                                </div>

                            </Collapse>

                        </Col>

                        

                    </Row>

                    {/* {!this.props.loggedInUser && <Button className="menuButtons" onClick={() => this.setState({ logModal: true, logType: 'Login' })}>Login</Button>}
                    {!this.props.loggedInUser && <Button className="menuButtons" onClick={() => this.setState({ logModal: true, logType: 'Sign up' })}>Registro</Button>}
                    {this.props.loggedInUser && <Button className="menuButtons" onClick={this.props.logoutUser}>Cerrar sesión</Button>}
                    {this.props.loggedInUser && <Link className='btn btn-primary mr-1 menuButtons' to={{
                        pathname: `user/profile/${this.props.loggedInUser._id}`
                    }}>Perfil</Link>}
                    {this.props.loggedInUser && <Link className="menuButtons" to="/plans/new"><Button>Nuevo plan</Button></Link>} */}

                </div>

                <div className='searchBarMap-container'>

                    <ReactPlacesAutocomplete newClass={"searchBarMap"} getCoords={this.getCoords} flag={"map"} />

                </div>

                <SimpleMap coords={Object.create({ lat: this.state.lat, lng: this.state.lng })} />

                <Modal show={this.state.logModal} onHide={() => this.setState({ logModal: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.logType}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LogForm close={() => this.setState({ logModal: false })} setTheUser={this.props.setUser} {...this.props} logType={this.state.logType} />
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default Home