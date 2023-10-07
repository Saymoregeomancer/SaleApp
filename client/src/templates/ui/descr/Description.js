import styles from "./Description.module.css";

import { Widget } from "../";

const Description = ({ children = null }) => {
  if (!children) {
    return;
  }

  return (
    <div className={styles.container}>
      <Widget>{children}</Widget>
    </div>
  );
};

export default Description;
