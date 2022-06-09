import "./navigation.sass";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Fade } from "react-awesome-reveal";

const Navigation = () => {
  const auth = useContext(AuthContext);
  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
  };

  return (
    <Fade direction="down" duration={1500}>
      <div className="container">
        <ul className="nav">
          <li className="nav_link ">
            <NavLink to="/allProducts">All Products</NavLink>
          </li>
          <li className="nav_link ">
            <NavLink to="/createLink">Create link</NavLink>
          </li>
          <li className="nav_link ">
            <NavLink onClick={logoutHandler} to="/">
              Log out
            </NavLink>
          </li>
        </ul>
      </div>
    </Fade>
  );
};
export default Navigation;
