import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryDetail } from "../../redux/actions";
import ActivityCard from "../activity/ActivityCard";
import Nav from "../navbar/Nav";

import style from "./CountryDetail.module.css";

function CountryDetail(props) {
  const dispatch = useDispatch();
  const countryDetail = useSelector((state) => state.countryDetail);

  useEffect(() => {
    dispatch(getCountryDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  const randomKey = () => {
    const letters = "abcdef";
    const numbers = "012345";
    let key = "";
    for (let i = 0; i < 3; i++) {
      key +=
        letters[Math.floor(Math.random() * 6)] +
        numbers[Math.floor(Math.random() * 6)];
    }
    return key;
  };

  return (
    <>
      <Nav />
      <div className={style.container}>
        <div className={style.detail}>
          <h2 className={style.title}>{countryDetail.name}</h2>
          <img
            className={style.image}
            src={countryDetail.image}
            alt={countryDetail.name}
          />
          <p className={style.info}>Continent: {countryDetail.continent}</p>
          <p>Capital: {countryDetail.capital}</p>
          <p>Sub Region: {countryDetail.subregion}</p>
          <p>Area: {countryDetail.area} km²</p>
          <p>Population: {countryDetail.population}</p>
        </div>

        <div className={style.act}>
          <h2 className={style.title}>Activities</h2>
          <div className={style.cards}>
            {countryDetail.activities && countryDetail.activities.length ? (
              countryDetail.activities.map((act) => (
                <ActivityCard
                  key={randomKey()}
                  name={act.name}
                  difficulty={act.difficulty}
                  duration={act.duration}
                  season={act.season}
                />
              ))
            ) : (
              <p className={style.title}>No activities avaliable</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CountryDetail;
