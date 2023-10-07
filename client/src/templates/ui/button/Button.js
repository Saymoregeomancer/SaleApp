import styles from "./Button.module.css";

const Button = ({ children, onClick }) => {
  const handleClick = () => {
    if (!onClick) {
      return;
    }
    onClick();
  };
  return <button onClick={handleClick} className={styles.button}>{children}</button>;
};

export default Button;
