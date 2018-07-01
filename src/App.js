import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Column from "./Column.js";

class App extends Component {
  render() {
    return (
      <div>
        <Column />
        <Column />
        <Column />
      </div>
    );
  }
}

export default App;
