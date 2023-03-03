import style from "./FormInput.module.css";

const FormInput = (props) => {
  const { label, errorMessage, onChange, ...inputProps } = props;
  return (
    <div className={style.formInput}>
      <label className={style.label}>{label}</label>
      <input className={style.input} {...inputProps} onChange={onChange} />
      <span className={style.span}>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
