import React, { createContext, useContext, useState } from "react";

const ProductsContext = createContext();

export const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }

  return context;
};

const initState = {
  shop: null,
  onlySale: false,
};
export const ProductsContextProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState(initState);



  const handleClearFilter = () => {
    setFilter(initState);
  };

  const handleSetSaleFilter = () => {
    setFilter({
      shop: filter.shop,
      onlySale: !filter.onlySale,
    });
  };

  const handleSetShopFilter = () => {
    const shopCycle = ["atb", "silpo", "kaluna", "rukavychka"];
    const length = shopCycle.length;
    const nextIndex = shopCycle.indexOf(filter.shop) + 1;

    setFilter({
      shop: nextIndex > length ? null : shopCycle[nextIndex],
      onlySale: filter.onlySale,
    });
  };

  const contextValue = {
    data,
    setData,
    filter,
    handleClearFilter,
    handleSetSaleFilter,
    handleSetShopFilter,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
