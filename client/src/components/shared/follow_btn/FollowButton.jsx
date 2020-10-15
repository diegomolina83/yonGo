import React, { Component } from 'react'

import Button from '../../styled/buttons/Button'

import AppContext from '../../context/AppContext'

import UserService from '../../../service/user.service'

// import './FollowButton.css'

// Receives as props targetUserId, loggedInUserId

class FollowButton extends Component {

    constructor() {

        super()
        this.state = {

            mounted: false
        }

        this.userService = new UserService()
    }

    componentDidMount() {

        this.userService.isFollowing(this.props.targetUserId, this.props.loggedInUserId)
            .then(response => {
                console.log('Estás siguiendo a este usuario? ', response.data);
                this.setState({ isFollowing: response.data, mounted: true })
            })
            .catch(err => console.log({ err }))
    }

    handleFollow = () => {

        this.userService.handleFollow(this.props.targetUserId, this.props.loggedInUserId, this.state.isFollowing)
            .then(() => this.setState({ isFollowing: !this.state.isFollowing }))
            .catch(err => console.log({ err }))
    }

    render() {

        return (

            <>
                {this.state.mounted &&
                    <>
                        {this.state.isFollowing ?
                            <Button
                                variant={this.props.variant}
                                size={this.props.size}
                                onClick={this.handleFollow}>

                                Seguir

                            </Button>
                            :
                            <Button
                                outline
                                variant={this.props.variant}
                                size={this.props.size}
                                onClick={this.handleFollow}>

                                Dejar de seguir

                        </Button>
                        }
                    </>}
            </>
        )
    }
}


export default FollowButton