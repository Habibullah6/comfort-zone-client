import React, { useContext } from "react";
import { Link } from "react-router-dom";
import shoeLogo from "../../../assets/shoeLogo.png";
import { AuthContext } from "../../../context/AuthProvider";
const Navbar = () => {
  const { user, userLogout } = useContext(AuthContext);

  const menuItems = (
    <>
      <li>
        <Link to="/">Home</Link>{" "}
      </li>

      <li>
        <Link to="/faqs">FAQs</Link>{" "}
      </li>

      {user ? (
        <>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <button onClick={userLogout} className="btn btn-outline">
              Logout
            </button>{" "}
          </li>
        </>
      ) : (
        <li>
          <Link to="/login">Login</Link>{" "}
        </li>
      )}
    </>
  );

  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
        <label
        
        tabIndex={0}
        className=" drawer-button btn btn-ghost lg:hidden text-4xl ml-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>
          <ul
            tabIndex={1}
            className="menu menu-compact dropdown-content mt-3 p-2 bg-accent text-white rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/">
          <div className="flex items-center">
            <img src={shoeLogo} alt="#" style={{ width: "50px" }} />
            <p className="font-bold text-primary">COMFORT ZONE</p>
          </div>
        </Link>
      </div>

      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-lg">{menuItems}</ul>
      </div>

      <label
        htmlFor="my-drawer-2"
        tabIndex={2}
        className=" drawer-button btn btn-ghost lg:hidden text-4xl ml-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>
    </div>
  );
};

export default Navbar;
