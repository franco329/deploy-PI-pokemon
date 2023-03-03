import { Link } from "react-router-dom";
import style from "./Header.module.css";
import bgLogo from "../../images/logo_pokeApi.png";

const Header = () => {
  return (
    <>
      <header>
        <Link to='/'>
          <img src={bgLogo} alt='background logo' className={style.logo} />
        </Link>
        <ul>
          <li>
            <Link to='/home'>Home</Link>
          </li>
          <li>
            <Link to='/create'>Create Pokemon</Link>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
