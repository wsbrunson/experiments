// @flow
import "./App.css";
import * as React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Location, Router } from "@reach/router";
import Home from "./Home";
import Ticker from "./Ticker";
import Tours from "./Tours";

type TypeFadeProps = {
  children: React.Node
};

const FadeTransitionRouter = (props: TypeFadeProps) => (
  <Location>
    {({ location }) => (
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={500}>
          <Router location={location}>{props.children}</Router>
        </CSSTransition>
      </TransitionGroup>
    )}
  </Location>
);

const App = () => (
  <FadeTransitionRouter>
    <Home path="/" />
    <Tours path="/tours" />
    <Ticker path="/ticker" />
  </FadeTransitionRouter>
);

export default App;
