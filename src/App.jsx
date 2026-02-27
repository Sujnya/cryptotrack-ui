import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setUserLoggedIn(!!token);
    setCheckingAuth(false);
  }, []);

  if (checkingAuth) {
    return null;
  }

  if (!userLoggedIn) {
    return (
      <>
        {showLogin ? <Login /> : <Register />}

        <div className="text-center mt-3">
          {showLogin ? (
            <p>
              Don’t have an account?{" "}
              <button onClick={() => setShowLogin(false)}>Register</button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button onClick={() => setShowLogin(true)}>Login</button>
            </p>
          )}
        </div>
      </>
    );
  }

  return <Dashboard />;
}

export default App;