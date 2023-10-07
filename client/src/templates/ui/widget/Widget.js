import styles from "./Widget.module.css";

const Widget = ({ children = null, style = {} }) => {
  return (
    <div className={styles.widget} style={style}>
      {children}
    </div>
  );
};

export default Widget;
