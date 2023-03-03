import React from "react";
import style from "./PokeModal.module.css";
import imageNotFound from "../../images/imgNotFound.png";
import { useDispatch } from "react-redux";
import { changeStateModal } from "../../redux/actions";

const PokeModal = ({ poke }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className={style.allContainer}>
        <div
          className={style.buttonClose}
          onClick={() => dispatch(changeStateModal(false))}
        >
          X
        </div>
        <div className={style.modalContainer}>
          <div className={style.statContainerTitle}>
            <img
              style={{ filter: "drop-shadow(2px 4px 12px black)" }}
              id={poke[0]?.name}
              src={poke[0]?.image ? poke[0]?.image : imageNotFound}
              alt={poke[0]?.name}
              className={style.imageTitle}
            />
            <p style={{ width: "180px", color: "black" }}>No. {poke[0]?.id}</p>
            <p style={{ marginLeft: "100px" }}>{poke[0]?.name}</p>
          </div>
          <img
            className={style.imgContent}
            src={poke[0]?.image ? poke[0]?.image : imageNotFound}
            alt={poke[0]?.name}
            style={{ filter: "drop-shadow(2px 4px 12px black)" }}
          />
          <div style={{ display: "flex", width: "100%" }}>
            <div
              style={{ background: "#dbdbd9", textAlign: "center" }}
              className={style.statsLeft}
            >
              {poke[0]?.type.map((t) => (
                <p key={t} className={style[t]}>
                  Type
                </p>
              ))}
              {poke[0]?.height && <p>Height</p>}
              {poke[0]?.weight && <p>Weight</p>}
            </div>
            <div style={{ background: "#ffffff" }} className={style.statsRight}>
              {poke[0]?.type.map((t) => (
                <p key={t} className={style[t]}>
                  {t}
                </p>
              ))}
              {poke[0]?.height && <p>{poke[0].height} cm</p>}
              {poke[0]?.weight && <p>{poke[0].weight} lbs</p>}
            </div>
          </div>
          <div className={style.baseStats}>
            <div>
              <p className={style.stats}>Hp</p>
              <p className={style.stats}>Attack</p>
              <p className={style.stats}>Defense</p>
              {poke[0]?.speed && <p className={style.stats}>Speed</p>}
            </div>
            <div>
              <p className={style.stats}>{poke[0]?.hp}</p>
              <p className={style.stats}>{poke[0]?.attack}</p>
              <p className={style.stats}>{poke[0]?.defense}</p>
              {poke[0]?.speed && (
                <p className={style.stats}>{poke[0]?.speed}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokeModal;
