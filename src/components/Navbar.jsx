import React from "react";
import { Link } from "react-router";
import { HiMenu } from "react-icons/hi";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50">
      <div className="navbar bg-base-100 shadow-md border-b border-base-300 h-16 md:h-20 px-4 md:px-8">
        {/* Navbar Start - Logo & Mobile Menu */}
        <div className="navbar-start">
          {/* Mobile Hamburger Dropdown */}
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden p-2"
            >
              <HiMenu className="h-6 w-6" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-lg z-1 mt-3 w-52 p-2 shadow-xl border border-base-300"
            >
              <li>
                <Link
                  to="/"
                  className="text-neutral hover:text-primary hover:bg-base-200 font-body text-base py-3"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/browse"
                  className="text-neutral hover:text-primary hover:bg-base-200 font-body text-base py-3"
                >
                  Browse Cars
                </Link>
              </li>
              {/* Future logged-in links will appear here */}
              {/* 
                <li><Link to="/add-car">Add Car</Link></li>
                <li><Link to="/my-listings">My Listings</Link></li>
                <li><Link to="/my-bookings">My Bookings</Link></li>
                */}
              <li className="mt-2">
                <Link
                  to="/login"
                  className="btn btn-primary btn-sm rounded-full px-5 text-white hover:scale-105 transition-transform duration-300 border-0"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo and Brand Name */}
          <Link
            to="/"
            className="btn btn-ghost text-xl md:text-2xl font-heading font-bold hover:scale-105 transition-transform duration-300 normal-case"
          >
            <span className="text-2xl mr-1">🚗</span>
            <span className="text-neutral">
              Rent<span className="text-primary">Wheels</span>
            </span>
          </Link>
        </div>

        {/* Navbar Center - Desktop Navigation Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <Link
                to="/"
                className="text-neutral hover:text-primary hover:bg-base-200 font-body text-base font-medium transition-all duration-200 rounded-lg px-4"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/browse"
                className="text-neutral hover:text-primary hover:bg-base-200 font-body text-base font-medium transition-all duration-200 rounded-lg px-4"
              >
                Browse Cars
              </Link>
            </li>
            {/* Future logged-in navigation links will be conditionally rendered here */}
            {/* 
              When user is logged in, these will appear:
              <li><Link to="/add-car">Add Car</Link></li>
              <li><Link to="/my-listings">My Listings</Link></li>
              <li><Link to="/my-bookings">My Bookings</Link></li>
              */}
          </ul>
        </div>

        {/* Navbar End - Login Button / Future Avatar Dropdown */}
        <div className="navbar-end">
          {/* Login Button - Desktop & Mobile */}
          <Link
            to="/login"
            className="btn btn-primary btn-sm h-10 md:h-12 rounded-full px-5 md:px-8 text-white font-body font-medium text-sm md:text-base border-0 hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Login
          </Link>

          {/* Future: User Avatar Dropdown will replace the Login button */}
          {/* 
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="User avatar" src="user-photo-url" />
                </div>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 p-2 shadow-xl border border-base-300">
                <li className="menu-title px-4 py-2">
                  <span className="font-semibold">User Name</span>
                  <span className="text-xs text-neutral-medium">user@email.com</span>
                </li>
                <div className="divider my-0"></div>
                <li><Link to="/add-car">Add Car</Link></li>
                <li><Link to="/my-listings">My Listings</Link></li>
                <li><Link to="/my-bookings">My Bookings</Link></li>
                <div className="divider my-0"></div>
                <li><button onClick={handleLogout} className="text-error">Logout</button></li>
              </ul>
            </div>
            */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
