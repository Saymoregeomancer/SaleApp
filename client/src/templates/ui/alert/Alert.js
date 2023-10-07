import styles from "./Alert.module.css";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Alert = ({ message, type = "error" }) => {
  const [isVisible, setIsVisible] = useState(!!message);

  let typeClass = "";
  let icon = "";

  switch (type) {
    case "success":
      typeClass = styles.success;
      icon = "✔";
      break;
    case "error":
      typeClass = styles.error;
      icon = "⚠";
      break;
  }

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      setIsVisible(false);
    }
  }, [message]);

  return createPortal(
    isVisible && (
      <div className={`${styles.container} ${typeClass}`}>
        <div className={styles.wrap}>{message}</div>
      </div>
    ),
    document.getElementById("modal-root")
  );
};

export default Alert;
