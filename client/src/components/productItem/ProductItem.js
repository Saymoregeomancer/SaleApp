import trash from "../resourses/trash.svg";

import "./productItem.sass";
import silpo from "../resourses/silpo.png";
import atb from "../resourses/atb.png";



import { useHttp } from "../../hooks/http.hook";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const ProductItem = ({ prop }) => {
  const { request } = useHttp();
  const { token } = useContext(AuthContext);

  const { mainPicture, marketPicture, title, price, salePrice, marketUrl, id } =
    prop;

  let market;

  switch (marketPicture) {
    case "silpo":
      market = silpo;
      break;
    case "atb":
      market = atb;
      break;
  }

  let salePriceClass =
    salePrice == null ? "products-item-price" : "products-item-price_sale";






  return (
    <div className="products-item">
      <img src={mainPicture} alt="" className="products-item_image"></img>
      <h2 className="products-item_title">{title}</h2>

      <div className={salePriceClass}>
        <span>{price/100} грн.</span>
        <span>{salePrice/100} грн.</span>
      </div>
      <a href={marketUrl} className="products-item_button">
        More
      </a>
      <img src={market} alt="" className="products-item_market"></img>
    </div>
  );
};
export default ProductItem;
