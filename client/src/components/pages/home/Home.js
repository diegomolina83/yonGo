import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Maps from './shared/maps/Maps'


class Home extends Component {

    constructor() {
        super()
        this.state = {
            loggedInUser: undefined
        }
        this.authService = new authService()
    }




    render() {
        return (
            <>
                <Switch>
                    <Route path="/maps" render={props => <Maps setTheUser={this.setTheUser} {...props} />} />
                </Switch>

            </>
        );
    }
}

export default Home;