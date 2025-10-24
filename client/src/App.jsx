import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useCurrentUser from "./hooks/useCurrentUser.jsx";

import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin.jsx";
import Landingpage from "./pages/Landingpage.jsx";
// import Dashboard from "./pages/Dashboard.jsx";
// import Forgotpassword from "./pages/Forgotpassword.jsx";

function App() {
  useCurrentUser();
  const userData = useSelector((state) => state.user.user);
  console.log("App.jsx", userData);

  return (
    <Routes>
      {/* <Route
        path="/"
        element={userData ? <Dashboard /> : <Navigate to="/landingpage" />}
      /> */}
      <Route
        path="/signup"
        element={!userData ? <Signup /> : <Navigate to="/" />}
      />
      <Route
        path="/signin"
        element={!userData ? <Signin /> : <Navigate to="/" />}
      />
      <Route
        path="/landingpage"
        element={!userData ? <Landingpage /> : <Navigate to="/" />}
      />
      {/* <Route
        path="/forgot-password"
        element={!userData ? <Forgotpassword /> : <Navigate to="/" />}
      /> */}
    </Routes>
  );
}

export default App;
