import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllProducts from "../pages/AllProducts";
import CreateLink from "../pages/CreateLink";
import AuthPage from "../pages/AuthPage";
import Navigation from "../components/navigation/Navigation";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AppsRoutes = () => {
  const isAuth = useContext(AuthContext);

  if (isAuth.isAuthenticated) {
    return (
      <Router>
        <Navigation></Navigation>
        <Routes>
          <Route path="/allProducts" element={<AllProducts />} />
          <Route path="/createLink" element={<CreateLink></CreateLink>} />
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
