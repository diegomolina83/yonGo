import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.css'

import Home from './pages/home/Home'

import PlanDetails from './pages/plains/PlanDetails'
import PlanForm from './pages/plans/planForm/PlanForm';
import PlanEdition from './pages/plans/planForm/PlanForm'

import UserProfile from './pages/user/profile/Profile'
import UserSettings from './pages/user/edit/UserSettings'

import authService from '../service/auth.service'

import AppContext from './context/AppContext'


class App extends Component {

  constructor() {

    console.log('Montando App.js')

    super()
    this.state = {
      loggedInUser: undefined,

      styles: {
        button: { default: 'light', active: 'secondary', submit: 'primary', discreet: 'outline-secondary' }
      }
    }

    this.styles = {
      button: { default: 'light', active: 'secondary', submit: 'primary', discreet: 'outline-secondary' }
    }

    this.customStyles = {

      colors: {

        lightGrey: '#e9e9eb',
        grey: '#e1e1e3',
        darkGrey: '#222223',
        lightBlue: '#4e81d3',
        blue: '#43506c',
        darkBlue: '#303647',
        yellow: '#fbff8e',
        red: '#ef4b4c'
      }
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

    console.log('Render de App.js')

    return (
      <>

        <AppContext.Provider value={this.state}>

          <Switch>

            <Route path='/' exact render={props => <Home {...props} loggedInUser={this.state.loggedInUser} setUser={this.setUser} logoutUser={this.logoutUser} />} />

            <Route path="/plans/new" render={props => this.state.loggedInUser ?
              <PlanForm loggedInUser={this.state.loggedInUser} history={props.history} styles={this.styles} /> :
              <Redirect to="/" />} />

            <Route path="/plans/details/:plan" render={props => <PlanDetails {...props} loggedInUser={this.state.loggedInUser} />} />
            <Route path="/plans/edit/:planId" render={props => <PlanEdition loggedInUser={this.state.loggedInUser} styles={this.styles} {...props} />} />

            <Route path="/user/profile/:userId" render={props => <UserProfile styles={this.customStyles} {...props} />} />
            <Route path="/user/settings/:userId" render={props => <UserSettings styles={this.customStyles} {...props} />} />

          </Switch>

        </AppContext.Provider>

      </>
    )
  }
}
export default App;