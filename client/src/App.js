import AppsRoutes from "./routes/routes";
import "./appStyle.sass";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { token, login, logout, userId } = useAuth();

  const isAuthenticated = !!token;
  // console.log('app',isAuthenticated);

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
      }}
    >
      <AppsRoutes/>
    </AuthContext.Provider>
  );
}

export default App;
