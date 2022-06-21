import {
  GET_COUNTRIES,
  GET_COUNTRY_DETAIL,
  GET_NAMES,
  GET_ACTIVITIES,
  CLEAR_COUNTRY_DETAIL,
  GET_ALL_COUNTRIES,
  FILTER,
} from "./types";
import axios from "axios";

export function getCountries(page, filter, order, continent, input, activity) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/countries?name=${input}&page=${page}&filter=${filter}&order=${order}&continent=${continent}&activity=${activity}`
      );
      return dispatch({ type: GET_COUNTRIES, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getCountryDetail(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/countries/${id}`);
      return dispatch({ type: GET_COUNTRY_DETAIL, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getNames() {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/names");
      return dispatch({ type: GET_NAMES, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function createActivity(name, difficulty, duration, season, selection) {
  return async (dispatch) => {
    try {
      await axios.post("http://localhost:3001/activity", {
        name: name,
        difficulty: difficulty,
        duration: duration,
        season: season,
        countryId: selection,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getActivities() {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/activity");
      return dispatch({ type: GET_ACTIVITIES, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  };
}

export function clearDetail() {
  return async (dispatch) => {
    try {
      return dispatch({ type: CLEAR_COUNTRY_DETAIL, payload: [] });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getAllCountries() {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/all");
      return dispatch({ type: GET_ALL_COUNTRIES, payload: response.data });
    } catch (error) {}
  };
}
