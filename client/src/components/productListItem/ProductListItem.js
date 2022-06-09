import ProductItem from "../productItem/ProductItem";
import "./productListItem.sass";
import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useCallback } from "react";
import { useState } from "react";

const ProductListItem = () => {
  const { request } = useHttp();
  const { token } = useContext(AuthContext);

  const [ products, setProducts ] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      const fetched = await request("/api/link/getlinks", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      ;

        setProducts(fetched)
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  const elements = products.map((data, i) => {
    return <ProductItem key={i} prop={data}></ProductItem>;
  });

  return <div className="products-items">{elements}</div>;
};
export default ProductListItem;
