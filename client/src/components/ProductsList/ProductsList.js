import styles from "./ProductsList.module.css";
import ListItem from "./ListItem";
import React from "react";
import { useAuthContext } from "../../hooks/useAuthContext.hook";
import useRequest from "../../hooks/useRequestApi.hook";
import { useEffect, useState, useCallback } from "react";
import { useProductsContext } from "../../hooks/useProductsContext";

const ProductsList = ({}) => {
  const { token } = useAuthContext();
  const { requestApi } = useRequest(token);

  const { data, setData } = useProductsContext();

  const fetchData = async () => {
    try {
      const fetched = await requestApi("link/getlinks", "GET");
      setData(fetched.links);
    } catch (e) {}
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    <div className={styles.container}>
      {data &&
        data.map((link) => {
          return <ListItem key={link.id} link={link} />;
        })}
    </div>
  );
};

export default ProductsList;
