import React from "react";
import ReactDOM from "react-dom";
import Results from "./Results";
import Details from "./Details";
import pf from "petfinder-client";
import "./style.css";
import { Router, Link } from "@reach/router";
const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  render() {
    return (
      <div>
        <Link to={"/"}>
          <h1>Adopt Me!</h1>
        </Link>
        <Router>
          <Results path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
