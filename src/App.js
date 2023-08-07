import './App.css';
import Navbar from './component/Navbar';
import React, { PureComponent } from 'react'
import News from './component/News';

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Navbar/>
        <News/>
      </div>
    )
  }
}

