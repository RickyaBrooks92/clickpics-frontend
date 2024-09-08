import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");

    window.location.href = "/";
  };

  return (
    <div>
      <h1>Welcome to ClickPics</h1>

      {isLoggedIn ? (
        <div>
          <button onClick={() => (window.location.href = "/create-event")}>
            Create Event
          </button>
          <button onClick={() => (window.location.href = "/upload-image")}>
            Upload Image
          </button>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Please log in or register to create events and upload images.</p>
          <Link to="/register">
            <button>Register</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
