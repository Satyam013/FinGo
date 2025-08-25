// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token); // true if token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Fingo
      </Link>

      <div className="space-x-4">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>

        {loggedIn ? (
          <>
            <Link to="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-800"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-green-600 px-3 py-1 rounded hover:bg-green-800"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
