import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getActivities,
  getCountries,
  clearDetail,
  getAllCountries,
} from "../../redux/actions";
import CountryCard from "../country-card/CountryCard";

import style from "./Countries.module.css";

function Countries() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const activities = useSelector((state) => state.activities);

  const [input, setInput] = useState("");

  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState("name");
  const [order, setOrder] = useState("ASC");
  const [continent, setContinent] = useState("");
  const [activity, setActivity] = useState("");

  const handleInput = (e) => {
    setInput(e.target.value);
    setPage(0);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const handleContinent = (e) => {
    setContinent(e.target.value);
    setPage(0);
  };

  const handleOrder = (e) => {
    const filters = e.target.value.split(" ");
    setOrder(filters[1]);
    setFilter(filters[0]);
    setPage(0);
  };

  const handleActivity = (e) => {
    setActivity(e.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getCountries(page, filter, order, continent, input, activity));
    dispatch(getActivities());
    dispatch(clearDetail());
  }, [dispatch, page, continent, order, filter, input, activity]);

  return (
    <div className={style.container}>
      <div className={style.filters}>
        <input
          type="text"
          className={style.search}
          placeholder="Search by name"
          value={input}
          onChange={(e) => handleInput(e)}
        />
        <h3>Filters</h3>
        <div>
          <p>Continent</p>
          <select
            className={style.selection}
            onChange={(e) => handleContinent(e)}
          >
            <option value="">All</option>
            <option value="Americas">Americas</option>
            <option value="Africa">Africa</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="Asia">Asia</option>
          </select>
        </div>
        <div>
          <p>Activities</p>
          <select
            className={style.selection}
            onChange={(e) => handleActivity(e)}
          >
            <option value="">None</option>
            {activities ? (
              activities.map((activity) => (
                <option value={activity} key={activity}>
                  {activity}
                </option>
              ))
            ) : (
              <></>
            )}
          </select>
        </div>
        <p>Order</p>
        <div>
          <select className={style.selection} onChange={(e) => handleOrder(e)}>
            <option value="name ASC">AZ - Sort ascending</option>
            <option value="name DESC">ZA - Sort descending</option>
            <option value="population DESC">High to Low population</option>
            <option value="population ASC">Low to High population</option>
          </select>
        </div>
      </div>
      <div className={style.view}>
        <button
          className={style.paginationLeft}
          disabled={page <= 0}
          onClick={prevPage}
        >
          &lt;
        </button>
        <div className={style.countries}>
          {allCountries.length ? (
            allCountries.map((country) => (
              <NavLink
                to={`/country/${country.id}`}
                key={country.id}
                style={{ textDecoration: "none" }}
              >
                <CountryCard
                  name={country.name}
                  image={country.image}
                  continent={country.continent}
                  population={country.population}
                />
              </NavLink>
            ))
          ) : (
            <p className={style.none}>Not countries found</p>
          )}
        </div>
        <button
          className={style.paginationRight}
          disabled={allCountries.length < 12}
          onClick={nextPage}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Countries;
