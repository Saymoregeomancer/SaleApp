import styles from "./Input.module.css";

const Input = ({
  placeholder = null,
  value = null,
  onChange = null,
  name = "text",
  error = false,
}) => {
  const handleChange = (e) => {
    onChange(e);
  };
  return (
    <>
      <input
        type="text"
        name={name}
        value={value}
        onChange={(e) => handleChange(e)}
        className={`${styles.input} ${error ? styles.error : ""}`}
        placeholder={placeholder}
        title={error ? error : null}
      ></input>
    </>
  );
};

export default Input;
