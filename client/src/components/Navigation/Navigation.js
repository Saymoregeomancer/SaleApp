import styles from "./Navigation.module.css";
import { NavLink, useLocation } from "react-router-dom";

import { useAuthContext } from "../../hooks/useAuthContext.hook";
import { Fade } from "react-awesome-reveal";

import { Widget } from "../../templates/ui";

const links = [
  { path: "/allProducts", title: "Перегляд товарів" },
  { path: "/createLink", title: "Додати посилання" },
];

const Navigation = () => {
  const location = useLocation();
  const { logout } = useAuthContext();
  const logoutHandler = () => {
    logout();
  };

  return (
    <div className={styles.container}>
      <Fade direction="down" duration={1500}>
        <Widget>
          <ul className={styles.nav}>
            {links.map((link) => {
              return (
                <li
                  key={link.path}
                  className={`${styles.navItem} ${
                    location.pathname === link.path ? styles.active : ""
                  }`}
                >
                  <NavLink to={link.path}>{link.title}</NavLink>
                </li>
              );
            })}

            <li className={styles.navItem}>
              <NavLink onClick={logoutHandler} to="/">
                Вийти
              </NavLink>
            </li>
          </ul>
        </Widget>
      </Fade>
    </div>
  );
};
export default Navigation;
