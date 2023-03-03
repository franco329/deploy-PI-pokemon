import style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={style.containerLoader}>
      <div className={style.dotSpinner}>
        <div className={style.dotSpinner__dot}></div>
        <div className={style.dotSpinner__dot}></div>
        <div className={style.dotSpinner__dot}></div>
        <div className={style.dotSpinner__dot}></div>
        <div className={style.dotSpinner__dot}></div>
        <div className={style.dotSpinner__dot}></div>
        <div className={style.dotSpinner__dot}></div>
        <div className={style.dotSpinner__dot}></div>
      </div>
    </div>
  );
};
export default Loader;
