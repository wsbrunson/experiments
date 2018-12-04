// @flow
import "./Tours.css";
import React from "react";
import toursData from "./toursData";

type TypeTourItemProps = {
  title: string,
  subtitle: string,
  image: string,
  imagePosition: "top" | "bottom"
};

const TourItem = ({ title, image, imagePosition }: TypeTourItemProps) => (
  <li className="tour">
    <h3 className="tour__title">{title}</h3>
    <div className="tour__imageWrapper">
      <img
        className={`tour__image tour__image--${imagePosition}`}
        src={image}
        alt={title}
      />
    </div>
  </li>
);

const mapTourItem = (tourName: string) => <TourItem {...toursData[tourName]} />;

const Tours = () => (
  <div className="page">
    <h1 className="tours__title">Tours</h1>
    <ul className="tours__list">{Object.keys(toursData).map(mapTourItem)}</ul>
  </div>
);

export default Tours;
