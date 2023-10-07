import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthPage, CreateLinkPage, ProductsPage } from "../templates/pages";

import {Navigation} from "../components/";

import { useAuthContext } from "../hooks/useAuthContext.hook";

const AppsRoutes = () => {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) {
    return (
      <Router>
        <Navigation></Navigation>
        <Routes>
          <Route path="/allProducts" element={<ProductsPage />} />
          <Route path="/createLink" element={<CreateLinkPage />} />
        </Routes>
      </Router>
    );
  }
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="*" element={<AuthPage />} />
      </Routes>
    </Router>
  );
};
export default AppsRoutes;
