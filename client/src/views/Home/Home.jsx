import CardContainer from "../../components/CardsContainer/CardContainer";
import style from "../../components/Paginate/Paginate.module.css";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Paginate from "../../components/Paginate/Paginate";
import {
  filterSeach,
  filterTypes,
  orderName,
  orderAttack,
  getAllPokemons,
} from "../../redux/actions";
import PokeModal from "../../components/PokeModal/PokeModal";

const Home = () => {
  const dispatch = useDispatch();

  const copyPokemons = useSelector((state) => state.copyPokemons);
  useEffect(() => {
    if (!copyPokemons.length) dispatch(getAllPokemons());
  }, [dispatch]);
  // ================ Pagination =============================================
  const [currentItems, setCurrentItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const [pageNumberLimit, setPageNumberLimit] = useState(10);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  const pages = [];
  for (let i = 1; i < Math.ceil(copyPokemons?.length / itemsPerPage); i++) {
    pages.push(i);
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirsttItem = indexOfLastItem - itemsPerPage;
  const renderPageNumbers = pages.map((number) => {
    const isActive = currentPage === number;
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={isActive ? style.active : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }
  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }
  // ==================== Search Input =======================================
  const handleBusqueda = (event) => {
    dispatch(filterSeach(event.target.value));
  };
  // ==================== Filter Types =======================================
  const handlerFilter = (event) => {
    dispatch(filterTypes(event.target.value.toString()));
  };
  // ==================== Order Buttons ======================================
  const handleNameSort = (event) => {
    const { value } = event.target;
    dispatch(orderName(value));
  };
  const handleAttackSort = (event) => {
    const { value } = event.target;
    dispatch(orderAttack(value));
  };
  // ======================== Modal ==========================================
  const [estadoModal, cambiarEstadoModal] = useState(false);
  const [pokeDetail, setPokeDetail] = useState(null);

  const pokeId = useSelector((state) => state.pokemonById);
  const changeModal = useSelector((state) => state.stateModal);
  useEffect(() => {
    if (pokeId) {
      setPokeDetail(pokeId);
      cambiarEstadoModal(changeModal);
    }
  }, [pokeId, changeModal]);
  // =========================================================================

  useEffect(() => {
    setCurrentItems(copyPokemons?.slice(indexOfFirsttItem, indexOfLastItem));
  }, [dispatch, indexOfFirsttItem, indexOfLastItem, copyPokemons]);
  return (
    <div className={styles.home}>
      <SearchBar
        handleBusqueda={handleBusqueda}
        handlerFilter={handlerFilter}
        handleNameSort={handleNameSort}
        handleAttackSort={handleAttackSort}
      />
      <Paginate
        handleNextbtn={handleNextbtn}
        handlePrevbtn={handlePrevbtn}
        currentPage={currentPage}
        pages={pages}
        pageDecrementBtn={pageDecrementBtn}
        pageIncrementBtn={pageIncrementBtn}
        renderPageNumbers={renderPageNumbers}
      />
      <CardContainer currentItems={currentItems} />
      <Paginate
        handleNextbtn={handleNextbtn}
        handlePrevbtn={handlePrevbtn}
        currentPage={currentPage}
        pages={pages}
        pageDecrementBtn={pageDecrementBtn}
        pageIncrementBtn={pageIncrementBtn}
        renderPageNumbers={renderPageNumbers}
      />
      {estadoModal && <PokeModal poke={pokeDetail} />}
    </div>
  );
};

export default Home;
