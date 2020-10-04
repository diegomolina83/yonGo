import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.css'

import Home from './pages/home/Home'
import SearchLocationInput from './shared/maps/SearchLocationInput';
import PlanForm from './pages/planForm/PlanForm';
import BooTest from './pages/planForm/ReactBooTest';


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
        <Switch>
          <Route path='/' exact render={() => <Home />} />
          <Route path='/plans/new' render={() => <PlanForm styles={this.styles} />} />
          <Route path='/testing' render={() => <BooTest />} />
        </Switch>
      </>
    )
  }
}

export default App;