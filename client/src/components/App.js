import React, { Component } from 'react'
import Home from './pages/home/Home'
import CreatePlain from './pages/plains/CreatePlain'
import './App.css'
import Signup from '../components/pages/signup/Signup'
import {  Route } from 'react-router-dom'
import SearchLocationInput from './shared/maps/SearchLocationInput';


class App extends Component {


  render() {
    return (
      <>
        {/* <SearchLocationInput onChange={() => null} /> */}
        <Home />
        {/* <Route path="/" exact render={() => <Home />} /> */}
      </>
    );
  }
}
export default App;