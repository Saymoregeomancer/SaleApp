import styles from "./ListItem.module.css";
import ListItemLoader from "./parts/ListItemLoader";
import ListItemProduct from "./parts/ListItemProduct";
import useRequest from "../../hooks/useRequestApi.hook";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext.hook";
import { useProductsContext } from "../../hooks/useProductsContext";
const ListItem = ({ link }) => {
  const { token } = useAuthContext();
  const { requestApi, isLoading, isError } = useRequest(token);

  const [data, setData] = useState(null);

  const fetchItem = async (event) => {
    try {
      const response = await requestApi("link/getItem", "POST", {
        url: link.url,
      });
      setData(response);
    } catch (e) {
      return null;
      // console.log(e);
    }
  };

  useEffect(() => {
    fetchItem(token);
  }, [link]);

  return isLoading ? (
    <ListItemLoader />
  ) : (
    data && <ListItemProduct data={data} />
  );
};

export default ListItem;
