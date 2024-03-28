import React, { useContext, useEffect } from "react";
import SideNavLink from "./SideNavLink";
// import BlogIcon from '../static/images/blogIco.svg'
// import HomeIcon from "../static/images/home.svg";
// import LibraryIcon from "../static/images/e-library.png";
import vars from "../vars";
import userContext from "../context/users/userContext";
// import EditIcon from "./EditIcon";
// import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const usContext = useContext(userContext);
  const {
    user,
    authenticated
  } = usContext;
  useEffect(() => {
    // fetchUser();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div
        className="left-nav top-12 h-screen md:w-[20%] md:block bg-white dark:bg-gray-800 shadow-2xl w-[70%] transition-all z-[2] duration-300 fixed py-4 text-black -translate-x-full"
        id="sidebar"
      >
        <div className="sideMenuBase py-8 px-4 md:px-2 flex flex-col space-y-1">
          <div className="md:hidden" onClick={() => props.sideShow()}>
            <SideNavLink
              name="Blogs"
              to="/"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                </svg>
              }
            />
            <SideNavLink
              name="E Library"
              to="/elibrary"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M160 96a96 96 0 1 1 192 0A96 96 0 1 1 160 96zm80 152V512l-48.4-24.2c-20.9-10.4-43.5-17-66.8-19.3l-96-9.6C12.5 457.2 0 443.5 0 427V224c0-17.7 14.3-32 32-32H62.3c63.6 0 125.6 19.6 177.7 56zm32 264V248c52.1-36.4 114.1-56 177.7-56H480c17.7 0 32 14.3 32 32V427c0 16.4-12.5 30.2-28.8 31.8l-96 9.6c-23.2 2.3-45.9 8.9-66.8 19.3L272 512z" />
                </svg>
              }
            />
          </div>
        </div>
        <hr className="h-[0.18rem] bg-blue-600 rounded-md md:mx-6 md:hidden" />
        <div className="actualNav text-black py-10 px-4 flex flex-col"></div>
      </div>
    </>
  );
};

export default Sidebar;