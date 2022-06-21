import React from "react";

import style from "./CountryCard.module.css";

function CountryCard({ name, continent, image, population }) {
  return (
    <div className={style.card}>
      <img src={image} alt={name} className={style.image} />
      <h3 className={style.title}>{name}</h3>
      <p className={style.text}>Continent: {continent}</p>
      <p className={style.text}>Population: {population}</p>
    </div>
  );
}

export default CountryCard;
