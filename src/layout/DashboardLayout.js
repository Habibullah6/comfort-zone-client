import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Navbar from "../pages/Shared/Navbar/Navbar";
const DashboardLayout = () => {
  const {user} = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email)
  return (
    <div className="px-5">
      <Navbar></Navbar>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content bg-accent text-white p-5">
          {/* <!-- Page content here --> */}

          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content bg-primary">
            {/* <!-- Sidebar content here --> */}
            <li className="text-white font-bold text-xl">
              <Link to="/dashboard">My Purchase</Link>
            </li>
            <li className="text-white font-bold text-xl">
              <Link to='/dashboard/review'>Write A Review</Link>
            </li>

            {
              isAdmin && <>
                <li className="text-white font-bold text-xl">
              <Link to="/dashboard/allUsers">All Users</Link>{" "}
            </li>

           

           <li className="text-white font-bold text-xl">
            <Link to='/dashboard/manageProduct'>Manage Product</Link>
           </li>

           <li className="text-white font-bold text-xl">
            <Link to="/dashboard/addProduct">Add A Product</Link>
           </li>
              
              </>
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
