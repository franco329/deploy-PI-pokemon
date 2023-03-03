import style from "./Paginate.module.css";

const Paginate = ({
  handleNextbtn,
  handlePrevbtn,
  currentPage,
  pages,
  pageDecrementBtn,
  pageIncrementBtn,
  renderPageNumbers,
}) => {
  return (
    <>
      <div className={style.paginate}>
        <ul className={style.pageNumbers}>
          <li>
            <button
              onClick={handlePrevbtn}
              disabled={currentPage === pages[0] ? true : false}
            >
              Prev
            </button>
          </li>
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}

          <li>
            <button
              onClick={handleNextbtn}
              disabled={currentPage === pages[pages.length - 1] ? true : false}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Paginate;
