import React, { Component } from "react";
import "./App.scss";

export class App extends Component {
  render() {
    return (
      <div className="root-app">
        <h1>REACT APPLICATION BOILERPLATES</h1>
        <h2>Techonologies included in this application</h2>
        <h3>Client:</h3>
        <ul>
          <li>React</li>
          <li>Custom Webpack</li>
          <li>Scss Compatible</li>
        </ul>

        <h3>Server:</h3>
        <ul>
          <li>Express</li>
          <li>Mongodb</li>
          <li>Passport (JWT, Local)</li>
          <li>Jest Test suite (including supertest helpers)</li>
        </ul>
      </div>
    );
  }
}

export default App;
