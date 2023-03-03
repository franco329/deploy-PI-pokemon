import { useDispatch } from "react-redux";
import { changeStateModal, getPokemonById } from "../../redux/actions";
import style from "./Card.module.css";

const Card = ({ id, name, image, type }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className={style.show}>
        <div className={style.statContainerTitle}>
          <img className={style.imageTitle} src={image} alt={name} />
          <p style={{ width: "150px", color: "black" }}>
            No. {id.toString().substring(0, 6)}
          </p>
          <p style={{ marginRight: "20px" }}>{name}</p>
        </div>
        <img
          className={style.imgBig}
          src={image}
          alt={name}
          onClick={() => {
            dispatch(getPokemonById(id));
            dispatch(changeStateModal(true));
          }}
        />

        <div style={{ display: "flex", width: "100%" }}>
          <div
            className={style.statsLeft}
            style={{ background: "#dbdbd9", textAlign: "center" }}
          >
            {Array.isArray(type) &&
              type.map((t) => (
                <p key={t} className={style[t]}>
                  Type
                </p>
              ))}
          </div>

          <div className={style.statsRight} style={{ background: "#ffffff" }}>
            {Array.isArray(type) &&
              type.map((t) => (
                <p key={t} className={style[t]}>
                  {t}
                </p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
