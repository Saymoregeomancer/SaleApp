import styles from "./ListItemLoader.module.css";

const ListItemLoader = ({}) => {
  return (
    <div className={styles.card}>
      <div className={styles.wrap}>
        <div className={styles.image}>
          <div className={styles.mounth}></div>
          <div className={styles.sun}></div>
        </div>
        <div className={styles.title}>Назва продукту</div>
        <div className={styles.descr}>
          <p className={styles.price}>ціна</p>
          <div className={styles.logo}>
            <p className={styles.logoName}>магазин</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItemLoader;
