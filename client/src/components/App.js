import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Maps from './shared/maps/Maps'


import authService from '../service/auth.service'

import './App.css'

class App extends Component {

  constructor() {
    super()
    this.state = {
      loggedInUser: undefined
    }
    this.authService = new authService()
  }


  componentDidMount = () => this.fetchUser()

  setTheUser = user => this.setState({ loggedInUser: user }, () => console.log('El usuario es', this.state.loggedInUser))

  fetchUser = () => {
    this.authService
      .isLoggedIn()
      .then(response => this.setState({ loggedInUser: response.data }))
      .catch(err => this.setState({ loggedInUser: null }))
  }


  logoutUser = () => {
    this.authService
      .logout()
      .then(() => this.setTheUser(null))
      .catch(err => console.log('ERRORR!!:', err))
  }


  render() {
    return (
      <>
        <h1>Movidas</h1>
        {!this.state.loggedInUser && <Link className="nav-link" to="/signup">Registro</Link>}
        {!this.state.loggedInUser && <Link className="nav-link" to="/login">Acceder</Link>}
        {this.state.loggedInUser && <div className="nav-link" onClick={this.logoutUser}>Cerrar sesión</div>}
        <Maps />

        <Switch>
          {/* <Route path="/maps" render={props => <Maps setTheUser={this.setTheUser} {...props} />} /> */}
          <Route path="/signup" render={props => <Signup setTheUser={this.setTheUser} {...props} />} />
          <Route path="/login" render={props => <Login setTheUser={this.setTheUser} {...props} />} />
        </Switch>

      </>
    );
  }
}

export default App;