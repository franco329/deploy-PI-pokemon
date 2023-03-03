import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";
import thunk from "redux-thunk";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;

// store Jorge Vega =

// import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from "./reducers";
// import thunkMiddleware from "redux-thunk";

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//     rootReducer,
//     composeEnhancer(applyMiddleware(thunkMiddleware))
// );

// export default store;
