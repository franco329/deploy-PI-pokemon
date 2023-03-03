import "./App.module.css";
import { Route, useLocation } from "react-router-dom";
import { Landing, Home, Form } from "./views";
import Header from "./components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllPokemons, getTypes } from "./redux/actions";
import Loader from "./components/Loader/Loader";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001/";

function App() {
  const dispatch = useDispatch();

  const location = useLocation();
  const showNavBar = location.pathname !== "/";
  const allPokemons = useSelector((state) => state.allPokemons);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!allPokemons.length)
      dispatch(getAllPokemons()).then(() => setLoading(false));
    dispatch(getTypes());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      {showNavBar && <Header />}
      <Route exact path='/' component={Landing} />
      <Route path='/home' component={Home} />
      <Route path='/create' component={Form} />
    </div>
  );
}

export default App;
