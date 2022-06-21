import {
  GET_COUNTRIES,
  GET_COUNTRY_DETAIL,
  GET_NAMES,
  GET_ACTIVITIES,
  CLEAR_COUNTRY_DETAIL,
  GET_ALL_COUNTRIES,
  FILTER,
} from "../actions/types";

const initialState = {
  allCountries: [],
  countries: [],
  countryDetail: [],
  names: [],
  activities: [],
};

export function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: payload,
      };
    case GET_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: payload,
      };
    case GET_NAMES:
      return {
        ...state,
        names: payload,
      };
    case GET_ACTIVITIES:
      return {
        ...state,
        activities: payload,
      };
    case CLEAR_COUNTRY_DETAIL:
      return {
        ...state,
        countryDetail: payload,
      };
    case GET_ALL_COUNTRIES:
      return {
        ...state,
        allCountries: payload,
      };

    default:
      return state;
  }
}
