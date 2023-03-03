import Card from "../Card/Card";
import style from "./CardContainer.module.css";
import imageNotFound from "../../images/imgNotFound.png";
import poke_error from "../../images/imgError.jpg";

const CardContainer = ({ currentItems }) => {
  return (
    <>
      <div className={style.appContainer}>
        {!currentItems?.length ? (
          <img className={style.imgError} src={poke_error} alt='img error' />
        ) : (
          currentItems?.map((pokemon) => {
            return (
              <div key={pokemon.name} className={style.pokemonContainer}>
                <div className={style.allContainer}>
                  <Card
                    key={pokemon.id}
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.image ? pokemon.image : imageNotFound}
                    type={pokemon.type}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default CardContainer;
