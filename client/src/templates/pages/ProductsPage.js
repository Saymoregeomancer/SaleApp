import { Body, Container } from "../ui";
import { ProductsList, Filter } from "../../components";
import { ProductsContextProvider } from "../../hooks/useProductsContext";
const ProductsPage = ({}) => {
  return (
    <Body>
      <Container>
        <ProductsContextProvider>
          <ProductsList />
          <Filter />
        </ProductsContextProvider>
      </Container>
    </Body>
  );
};

export default ProductsPage;
