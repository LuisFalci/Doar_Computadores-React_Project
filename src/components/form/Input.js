import styles from "./Input.module.css";

const Input = ({ text, type, name, placeholder, handleOnChange, value }) => {
  return (
    <>
      <label>
        <span>{text}:</span>
        <input
          type={type}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={handleOnChange}
          value={value}
        />
      </label>
    </>
  );
};

export default Input;
