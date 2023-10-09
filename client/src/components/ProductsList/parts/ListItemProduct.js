import styles from "./ListItemProduct.module.css";
import { logos } from "../../../config";
import { useProductsContext } from "../../../hooks/useProductsContext";

const processString = (str = "") =>
  str && str.length >= 50 ? <p title={str}>{str.slice(0, 50)}...</p> : str;

const processLogo = (marketType) => {
  return <img src={logos[marketType]} alt={marketType} />;
};

const processPrice = (price, sale) => {
  const commonPrice = <p className={styles.common}>{price}грн</p>;
  if (sale) {
    return (
      <>
        <p className={styles.sale}>{price}грн</p>
        <p className={styles.newprice}>{sale}грн</p>
      </>
    );
  }
  return commonPrice;
};

const ListItemProduct = ({ data }) => {
  const { filter } = useProductsContext();
  const handleClick = () => {
    if (data && data.marketUrl) {
      const link = document.createElement("a");
      link.href = data.marketUrl;
      link.target = "_blank";
      link.click();
    }
  };


  if (filter?.shop && filter.shop !== data.marketPicture) {
    return;
  }
  if (filter.onlySale && !data.salePrice) {
    return;
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.image}>
          <img loading="lazy" src={data?.mainPicture} alt="Product" />
        </div>
        <div className={styles.title}>{processString(data?.title)}</div>
        <div className={styles.descr}>
          <div className={styles.price}>
            {processPrice(data?.price, data?.salePrice)}
          </div>
          <div onClick={handleClick} className={styles.logo}>
            {processLogo(data?.marketPicture)}
          </div>
        </div>
      </div>
      {data?.salePrice && <div className={styles.banner}>SALE</div>}
    </div>
  );
};

export default ListItemProduct;
