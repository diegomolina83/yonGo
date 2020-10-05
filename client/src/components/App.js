import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.css'

import Home from './pages/home/Home'
import PlanForm from './pages/planForm/PlanForm';



class App extends Component {

  constructor() {

    super()
    this.styles = {

      button: { default: 'light', active: 'secondary', submit: 'success', cancel: 'outline-secondary' }
    }
  }

  render() {
    return (
      <>
        {/* <SearchLocationInput onChange={() => null} /> */}
        {/* <Home /> */}
        {/* <Route path="/" exact render={() => <Home />} /> */}
        <Switch>
          <Route path='/' exact render={props => <Home {...props}/>} />
          <Route path='/plans/new' render={() => <PlanForm styles={this.styles} />} />
        </Switch>
      </>
    )
  }
}
export default App;