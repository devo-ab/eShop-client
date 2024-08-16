import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);

  const navLinks = (
    <div className="md:space-x-5  md:space-y-0 flex flex-col md:flex-row items-center">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-red-600 md:text-lg font-medium text-center" : "text-center font-medium"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/all-product"
        className={({ isActive }) =>
          isActive ? "text-red-600 md:text-lg font-medium text-center" : "text-center font-medium"
        }
      >
        All Product
      </NavLink>
    </div>
  );

  const handleSingOut = () => {
    logOut()
    .then((result) => {
        console.log(result)
        toast("Sign Out successfully");
      })
      .catch((error) => {
        console.log(error)
        toast("Something wrong, please try again");
      });
   };


  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <div className="flex gap-2 items-center">
          <img className="w-8 h-8 rounded-2xl" src="/eShop.jpg" alt="" />
          <a className="text-xl font-bold text-re">eShop</a>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {/* <Link to="/login" className="btn font-medium">LogIn</Link> */}
        <div>
            {
                user && (<div role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <div data-tooltip-id="my-tooltip" data-tooltip-content={user.displayName}>
                      <img src={user.photoURL} alt="" />
                    </div>
                </div>
              </div>)
            }
        </div>
        <div>
          {user ? (
            <button onClick={handleSingOut} className="btn bg-red-600 text-white">Sign Out</button>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn bg-red-400 text-white">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
      <Tooltip id="my-tooltip" />
      <ToastContainer />
    </div>
  );
};

export default Navbar;
