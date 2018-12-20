import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Index from "./Components/Index";
import Group from "./Components/Group";
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Index} />
          <Route path="/group/:slug" component={Group} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
