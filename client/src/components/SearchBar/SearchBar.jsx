import { useSelector } from "react-redux";
import style from "./SearchBar.module.css";

const SearchBar = ({
  handleBusqueda,
  handlerFilter,
  handleNameSort,
  handleAttackSort,
}) => {
  const allTypes = useSelector((state) => state.getAllTypes);

  return (
    <div className={style.searchBar}>
      <div className={style.filterContainer}>
        <h4>Filters</h4>
        <button name='all' value='all' onClick={handlerFilter}>
          All
        </button>
        <select onChange={(event) => handlerFilter(event)}>
          <option value='all'>Types</option>
          {allTypes &&
            allTypes?.map((type, index) => (
              <option value={type.name} key={index}>
                {type.name}
              </option>
            ))}
        </select>
        <button name='api' value='api' onClick={handlerFilter}>
          API
        </button>
        <button name='data-base' value='data-base' onClick={handlerFilter}>
          Data Base
        </button>
      </div>
      <div className={style.orderContainerName}>
        <h4>Order by Name</h4>
        <select className={style.menu} onChange={handleNameSort}>
          <option value='all'>All</option>
          <option value='az'>A - Z</option>
          <option value='za'>Z - A</option>
        </select>
      </div>
      <div className={style.orderContainerAttack}>
        <h4>Order by Attack</h4>
        <select onChange={handleAttackSort}>
          <option value={"All"}>All</option>
          <option value={"Min"}>Min</option>
          <option value={"Max"}>Max</option>
        </select>
      </div>
      <form>
        <div className={style.searchInput}>
          <input
            type='search'
            className={style.inputBusqueda}
            placeholder='Search pokemon name'
            onChange={handleBusqueda}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
