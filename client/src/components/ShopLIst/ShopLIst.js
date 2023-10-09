import styles from "./ShopLIst.module.css";
import { Widget } from "../../templates/ui";
import { shops } from "../../config";

const ShopLIst = ({}) => {
  return (
    <div className={styles.container}>
      <Widget>
        <div className={styles.shops}>
          <h3>Магазини</h3>
          <div className={styles.items}>
            {shops &&
              shops.map((shop) => {
                return (
                  <a key={shop.name} href={shop.link} className={styles.item}
                  target="_blank">
                    <div>{shop.title}</div>
                    <div className={styles.logo}>
                      <img className={styles.img} src={shop.logo}></img>
                    </div>
                  </a>
                );
              })}
          </div>
        </div>
      </Widget>
    </div>
  );
};

export default ShopLIst;
