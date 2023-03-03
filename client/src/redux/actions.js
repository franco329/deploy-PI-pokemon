import axios from "axios";
import {
  GET_ALL_POKEMONS,
  GET_POKEMON_ID,
  PAGINATE_POKES,
  GET_TYPES,
  ORDER_NAME,
  ORDER_ATTACK,
  FILTER_SEARCH,
  FILTER_TYPES,
  CHANGE_STATE_MODAL,
} from "./types";

export const getAllPokemons = () => {
  return async function (dispatch) {
    const res = await axios.get("/pokemons");
    dispatch({ type: GET_ALL_POKEMONS, payload: res?.data });
  };
};
export const getPokemonById = (id) => {
  return async function (dispatch) {
    try {
      const res = (await axios.get(`/pokemons/${id}`)).data;
      dispatch({ type: GET_POKEMON_ID, payload: res });
    } catch (error) {
      alert("Error getting pokemon:", error.message);
    }
  };
};
export const paginatePokes = (data) => {
  return function (dispatch) {
    dispatch({ type: PAGINATE_POKES, payload: data });
  };
};
export const getTypes = () => {
  return async function (dispatch) {
    try {
      const res = await (await axios.get("/types")).data;
      dispatch({ type: GET_TYPES, payload: res });
    } catch (error) {
      alert("Error getting pokemon types:", error.message);
    }
  };
};
export const orderName = (event) => {
  return function (dispatch) {
    dispatch({ type: ORDER_NAME, payload: event });
  };
};
export const orderAttack = (event) => {
  return function (dispatch) {
    dispatch({ type: ORDER_ATTACK, payload: event });
  };
};
export const filterSeach = (event) => {
  return function (dispatch) {
    dispatch({ type: FILTER_SEARCH, payload: event });
  };
};
export const filterTypes = (event) => {
  return function (dispatch) {
    dispatch({ type: FILTER_TYPES, payload: event });
  };
};
export const changeStateModal = (state) => {
  return function (dispatch) {
    dispatch({ type: CHANGE_STATE_MODAL, payload: state });
  };
};
