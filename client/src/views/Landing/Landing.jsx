import style from "./Landing.module.css";
import { Link } from "react-router-dom";
import imgChar from "../../images/pokeBola_charmander.png";
import imgBulb from "../../images/pokeBola_bulbasaur.jpg";
import imgSquir from "../../images/pokeBola_squirtle.jpg";
import imgGithub from "../../images/github.png";
import imgLinkedin from "../../images/linkedin.png";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";

const Landing = () => {
  const [img, setImg] = useState(imgChar);
  const [color, setColor] = useState();

  useEffect(() => {}, [img, setImg]);

  const handleImgClick = (event) => {
    const newImgSrc = event.target.src;
    const newColor = event.target.alt;
    setImg(newImgSrc);
    setColor(newColor);
  };

  return (
    <section className={style.landing}>
      <div
        className={`${
          color === "charmander"
            ? style.red
            : color === "bulbasaur"
            ? style.green
            : color === "squirtle"
            ? style.blue
            : style.red
        } ${style.gradient}`}
      ></div>
      <Header />
      <div className={style.content}>
        <div className={style.textBox}>
          <h2>
            Hola! Mi nombre es Franco Kuperman
            <br />Y este es mi proyecto <span>Poke Api</span>
          </h2>
          <p>
            Este proyecto es fomentado por Henry, es para cumplimentar una de
            las etapas del cursado donde uno tiene que abocar lo aprendido. Es
            un proyecto desafiante, pero llega a ser muy satisfactorio. Con la
            presentacion y defensa de este proyecto estoy mas cerca de obtener
            mi certificacion en <span>Full-Stack Developer.</span>
          </p>
          <Link to='/home'>Comencemos!</Link>
        </div>
        <div className={style.imgBox}>
          <img src={img} alt='pokemon' className={style.imgPokemon} />
        </div>
      </div>
      <ul className={style.pokeBolas}>
        <li>
          <img src={imgChar} alt='charmander' onClick={handleImgClick} />
        </li>
        <li>
          <img src={imgBulb} alt='bulbasaur' onClick={handleImgClick} />
        </li>
        <li>
          <img src={imgSquir} alt='squirtle' onClick={handleImgClick} />
        </li>
      </ul>
      <ul className={style.sci}>
        <li>
          <a href='https://github.com/franco329'>
            <img src={imgGithub} alt='sciGithub' />
          </a>
        </li>
        <li>
          <a href='https://www.linkedin.com/in/franco-kuperman/'>
            <img src={imgLinkedin} alt='sciLinkedin' />
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Landing;
