import AppsRoutes from "./routes/routes";
import "./appStyle.sass";

import { AuthContextProvider } from "./hooks/useAuthContext.hook";

function App() {
  return (
    <AuthContextProvider>
      <AppsRoutes />
      <div id="modal-root"></div>
      <div id="fixed-root"></div>
    </AuthContextProvider>
  );
}

export default App;
