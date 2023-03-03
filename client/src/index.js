// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
// import store from "./redux/store";

// ReactDOM.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>,
//   document.getElementById("root")
// );

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { createRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    rootElement
  );
} else {
  createRoot(rootElement).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
