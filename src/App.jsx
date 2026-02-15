import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserLoggedIn(true);
    }
  }, []);

  if (userLoggedIn) {
    return <Dashboard />;
  }

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

export default App;
