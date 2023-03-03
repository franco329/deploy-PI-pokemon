import {
  GET_ALL_POKEMONS,
  GET_POKEMON_ID,
  PAGINATE_POKES,
  GET_TYPES,
  FILTER_SEARCH,
  FILTER_TYPES,
  ORDER_NAME,
  ORDER_ATTACK,
  CHANGE_STATE_MODAL,
} from "./types";

const initialState = {
  userName: "",
  allPokemons: [],
  copyPokemons: [],
  pokemonById: [],
  getAllTypes: [],
  stateModal: "",
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS: {
      return {
        ...state,
        allPokemons: action.payload,
        copyPokemons: action.payload,
      };
    }
    case GET_POKEMON_ID: {
      return { ...state, pokemonById: action.payload };
    }
    case PAGINATE_POKES: {
      return { ...state, copyPokemons: action.payload };
    }
    case GET_TYPES: {
      return { ...state, getAllTypes: action.payload };
    }
    case FILTER_SEARCH: {
      const dataPokes = state?.allPokemons;
      const filter = action.payload
        ? dataPokes.filter((elem) =>
            elem.name
              .toString()
              .toLowerCase()
              .includes(action.payload.toLowerCase())
          )
        : dataPokes;
      return {
        ...state,
        copyPokemons: filter,
      };
    }
    case FILTER_TYPES: {
      const dataPokes = state?.allPokemons;
      const filter =
        action.payload === "all"
          ? state.allPokemons
          : action.payload === "api"
          ? dataPokes.filter((poke) => !poke.created)
          : action.payload === "data-base"
          ? dataPokes.filter((poke) => poke.created)
          : dataPokes.filter((poke) => poke.type?.includes(action.payload));
      return {
        ...state,
        copyPokemons: filter,
      };
    }
    case ORDER_NAME: {
      const dataPokes = state?.allPokemons;
      let sortList = [];
      switch (action.payload) {
        case "all":
          sortList = state.allPokemons;
          break;
        case "az":
          sortList = [...dataPokes].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          break;
        case "za":
          sortList = [...dataPokes].sort((a, b) =>
            b.name.localeCompare(a.name)
          );
          break;
        default:
          sortList = [...state.allPokemons];
      }
      return { ...state, copyPokemons: sortList };
    }
    case ORDER_ATTACK: {
      const dataPokes = state?.allPokemons;
      let orderList = [];
      switch (action.payload) {
        case "All":
          orderList = state.allPokemons;
          break;
        case "Min":
          orderList = [...dataPokes].sort((a, b) => a.attack - b.attack);
          break;
        case "Max":
          orderList = [...dataPokes].sort((a, b) => b.attack - a.attack);
          break;
        default:
          orderList = [...state.allPokemons];
      }
      return { ...state, copyPokemons: orderList };
    }
    case CHANGE_STATE_MODAL: {
      return {
        ...state,
        stateModal: action.payload,
      };
    }
    default:
      return { ...state };
  }
}
