import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../components/FormInput/FormInput";
import style from "./Form.module.css";

const Form = () => {
  // =============== States =================================
  const allTypes = useSelector((state) => state.getAllTypes);
  const [values, setValues] = useState({
    name: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    typeOne: "",
    typeTwo: "",
  });
  const [typeTwoError, setTypeTwoError] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  // ========================================================
  // ================== Inputs ==============================
  const inputs = [
    {
      name: "name",
      type: "text",
      placeholder: "Name",
      errorMessage:
        "The name should be 3-16 characters and shouldn't include any special character!",
      label: "Name",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      name: "image",
      type: "text",
      placeholder: "Image",
      label: "Image",
      accept: "image/*",
    },
    {
      name: "hp",
      type: "number",
      placeholder: "Hp",
      label: "Hp",
      required: true,
    },
    {
      name: "attack",
      type: "number",
      placeholder: "Attack",
      label: "Attack",
      required: true,
    },
    {
      name: "defense",
      type: "number",
      placeholder: "Defense",
      label: "Defense",
      required: true,
    },
    {
      name: "speed",
      type: "number",
      placeholder: "Speed",
      label: "Speed",
    },
    {
      name: "height",
      type: "number",
      placeholder: "Height",
      label: "Height",
    },
    {
      name: "weight",
      type: "number",
      placeholder: "Weight",
      label: "Weight",
    },
  ];
  // ========================================================
  // =============== Handlers ===============================
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("pokemons/create", values)
      .then((res) => alert("Pokemon created!"))
      .catch((error) => alert(error));
  };
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const typeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "typeOne") {
      setValues({ ...values, [name]: value });
    } else if (name === "typeTwo") {
      if (value === values.typeOne) {
        setDisableSubmit(true);
        setTypeTwoError("Type two can't be the same as type one");
      } else {
        setDisableSubmit(false);
        setTypeTwoError("");
        setValues({ ...values, [name]: value });
      }
    }
  };
  // ========================================================
  return (
    <div className={style.formContainer}>
      <form className={style.form} onSubmit={handleSubmit}>
        <h1 className={style.title}>Create new Pokemon!</h1>
        {inputs.map((input) => {
          return (
            <FormInput
              key={input.name}
              {...input}
              value={values[input.name]}
              onChange={changeHandler}
            />
          );
        })}

        <div className={style.selectTypes}>
          <p className={style.titleSelect}>Elige un tipo:</p>
          <select
            className={style.selectOptionType}
            name='typeOne'
            onChange={(event) => typeHandler(event)}
          >
            <option defaultValue>Select type one</option>
            {allTypes?.map((type) => (
              <option
                key={type.name}
                className={style.optionType}
                value={type.name}
                name={values.typeOne}
              >
                {type.name}
              </option>
            ))}
          </select>
          <p className={style.titleSelect}>Puedes elegir otro tipo:</p>
          <select
            className={style.selectOptionType}
            name='typeTwo'
            onChange={(event) => typeHandler(event)}
          >
            <option defaultValue>Select type two</option>
            {allTypes?.map((type) => (
              <option
                key={type.name}
                className={style.optionType}
                value={type.name}
                name={values.typeTwo}
              >
                {type.name}
              </option>
            ))}
          </select>
          {typeTwoError && (
            <span className={style.errorMessage}>{typeTwoError}</span>
          )}
        </div>

        <button className={style.btnSubmit} disabled={disableSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
