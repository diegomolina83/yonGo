import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.css'

import Home from './pages/home/Home'
import PlanForm from './pages/planForm/PlanForm';
import PlanDetails from './pages/plains/PlanDetails'
import authService from '../service/auth.service'


class App extends Component {

  constructor() {

    super()
    this.state = {
      loggedInUser: undefined
    }

    this.styles = {
      button: { default: 'light', active: 'secondary', submit: 'primary', discreet: 'outline-secondary' }
    }
    this.authService = new authService()
  }


  componentDidMount = () => {

    this.fetchLoggedInUser()
  }


  fetchLoggedInUser = () => {
    this.authService
      .isLoggedIn()
      .then(response => {

        this.setState({ loggedInUser: response.data })
      })
      .catch(err => this.setState({ loggedInUser: null }))
  }


  setUser = user => this.setState(
    { loggedInUser: user },
    () => console.log('El usuario es', this.state.loggedInUser))


  logoutUser = () => {
    this.authService
      .logout()
      .then(() => this.setUser(null))
      .catch(err => console.log('ERRORR!!:', err))
  }


  render() {
    return (
      <>
        <Switch>
          <Route path='/' exact render={props => <Home {...props} loggedInUser={this.state.loggedInUser} setUser={this.setUser} logoutUser={this.logoutUser} />} />
          <Route path="/plans/new" render={props => this.state.loggedInUser ?
            <PlanForm loggedInUser={this.state.loggedInUser} history={props.history} styles={this.styles} /> :
            <Redirect to="/" />} />
          <Route path="/plans/details/:plan" render={props => <PlanDetails {...props} />} />
        </Switch>
      </>
    )
  }
}
export default App;