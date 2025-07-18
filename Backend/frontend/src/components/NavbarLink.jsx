// import React from "react";
import { Link, useLocation} from "react-router-dom";
const NavbarLink = ({ to, name }) => {
  const location = useLocation();
  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [])
  return (
    <>
      <div className={`nav-item m-0 ${String(location.pathname.toLocaleLowerCase()).startsWith(`/${String(name).toLocaleLowerCase()}`) ? "link-active" : ""} font-Oswald hover:underline hover:underline-offset-8 dark:text-white text-blue-600 lg:text-xl md:text-lg`}>
        <Link to={to}>{name}</Link>
      </div>
    </>
  );
};

export default NavbarLink;