// @flow
import "./Home.css";
import { Link } from "@reach/router";
import HeaderSVG from "./HeaderSVG";
import React from "react";
import anime from "animejs";
import routes from "./routes";

const MenuItem = ({ text, link }: { text: string, link: string }) => (
  <li className="menu__item">
    <Link to={link} className="menu__link">
      {text}
    </Link>
  </li>
);
export default class Home extends React.Component<{}> {
  componentDidMount() {
    anime({
      targets: ["#path_1", "#path_2"],
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 2000,
      delay: 100,
      fill: ["#FFF", "#AAA"],
      direction: "alternate",
      loop: true
    });
  }
  render() {
    return (
      <div className="page">
        <HeaderSVG />
        <ul className="menu">
          <MenuItem text={routes.TOURS.title} link={routes.TOURS.path} />
          <MenuItem text={routes.TICKER.title} link={routes.TICKER.path} />
        </ul>
        <svg viewBox="0 0 400 180">
          <path
            id="path_1"
            stroke="black"
            strokeWidth="2"
            d="m 0 1 h 40 v 40 Z m 41 0 h 40 v 40 Z m 41 0 h 40 v 40 Z
               m 0 41 h 40 v 40 Z m -41 0 h 40 v 40 Z m 40 41 h 40 v 40 Z"
          />
          <path
            id="path_2"
            stroke="black"
            strokeWidth="2"
            d="m 141 1 h 50 l 40 100 l 40 -100 h 50 l -70 150 h -40 Z"
          />
        </svg>
      </div>
    );
  }
}
