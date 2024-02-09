import React from "react";
import { Link, useLocation } from "react-router-dom";
const NavbarLink = ({ to, name }) => {
  const location = useLocation();
  return (
    <>
      <div className={`nav-item m-0 ${String(location.pathname) === String(to) ? "link-active" : ""} font-Oswald hover:underline hover:underline-offset-8 dark:text-white text-purple-600 lg:text-xl md:text-lg`}>
        <Link to={to}>{name}</Link>
      </div>
    </>
  );
};

export default NavbarLink;