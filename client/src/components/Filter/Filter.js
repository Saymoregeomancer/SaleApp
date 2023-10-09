import styles from "./Filter.module.css";

import { createPortal } from "react-dom";
import { useProductsContext } from "../../hooks/useProductsContext";

const Filter = () => {
  const {
    data,
    filter,
    handleClearFilter,
    handleSetSaleFilter,
    handleSetShopFilter,
  } = useProductsContext();

  return createPortal(
    <div className={`${styles.container}`}>
      <div className={styles.wrap}>
        <div
          onClick={handleClearFilter}
          title="Звичайне відображення"
          className={`${styles.button}`}
        >
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3.06 13a9 9 0 1 0 .49 -4.087"></path>
            <path d="M3 4.001v5h5"></path>
            <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          </svg>
        </div>
        <div
          onClick={handleSetShopFilter}
          title='Сортувати по магазинах'
          className={`${styles.button} ${
            !!filter.shop ? styles.buttonActive : ""
          }`}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 16 16"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"></path>
          </svg>
        </div>
        <div
          onClick={handleSetSaleFilter}
          title="Відобразити тільки зі знижками"
          className={`${styles.button} ${
            filter?.onlySale ? styles.buttonActive : ""
          }`}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
              d="M403.29 32H280.36a14.46 14.46 0 00-10.2 4.2L24.4 281.9a28.85 28.85 0 000 40.7l117 117a28.86 28.86 0 0040.71 0L427.8 194a14.46 14.46 0 004.2-10.2v-123A28.66 28.66 0 00403.29 32z"
            ></path>
            <path d="M352 144a32 32 0 1132-32 32 32 0 01-32 32z"></path>
            <path
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
              d="M230 480l262-262a13.81 13.81 0 004-10V80"
            ></path>
          </svg>
        </div>
      </div>
    </div>,
    document.getElementById("fixed-root")
  );
};
export default Filter;
