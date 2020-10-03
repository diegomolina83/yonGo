import React, { Component } from 'react'
import Home from './pages/home/Home'
import './App.css'
import SearchLocationInput from './shared/maps/SearchLocationInput';


class App extends Component {

  render() {
    return (
      <>
        <Home />
        {/* <SearchLocationInput onChange={() => null} /> */}
      </>
    );
  }
}

export default App;