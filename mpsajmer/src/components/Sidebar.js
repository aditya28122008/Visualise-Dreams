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
    fetchUser,
    authenticated,
    blogAdminAccess,
    libraryAdminAccess,
  } = usContext;
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div
        className="left-nav top-12 h-screen md:w-[20%] md:block bg-white dark:bg-gray-800 shadow-2xl w-[70%] transition-all z-[2] duration-300 fixed py-4 text-black -translate-x-full"
        id="sidebar"
      >
        <div className="sideMenuBase py-8 px-4 md:px-2 flex flex-col space-y-1">
          {authenticated ? (
            <>
              <div className="top-img-container">
                <img
                  src={`${vars.host}${user.profile}`}
                  alt=""
                  className="rounded-full lg:h-40 md:h-28 md:w-28 lg:w-40 md: h-20 w-20 mx-auto"
                />
                <div className="user-fNam-lName dark:text-white w-fit whitespace-nowrap mx-auto my-2 text-lg lg:text-3xl font-DancingScript">
                  {user.first_name} {user.last_name}
                </div>
                <div className="" onClick={() => props.sideShow()}>
                  <SideNavLink
                    to={`/edit-profile`}
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H322.8c-3.1-8.8-3.7-18.4-1.4-27.8l15-60.1c2.8-11.3 8.6-21.5 16.8-29.7l40.3-40.3c-32.1-31-75.7-50.1-123.9-50.1H178.3zm435.5-68.3c-15.6-15.6-40.9-15.6-56.6 0l-29.4 29.4 71 71 29.4-29.4c15.6-15.6 15.6-40.9 0-56.6l-14.4-14.4zM375.9 417c-4.1 4.1-7 9.2-8.4 14.9l-15 60.1c-1.4 5.5 .2 11.2 4.2 15.2s9.7 5.6 15.2 4.2l60.1-15c5.6-1.4 10.8-4.3 14.9-8.4L576.1 358.7l-71-71L375.9 417z" />
                      </svg>
                    }
                    name="Edit Profile"
                  />
                  <SideNavLink
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" />
                      </svg>
                    }
                    name="My Profile"
                    to={`/profile/${user.username}`}
                  />
                  {(blogAdminAccess || libraryAdminAccess) && (
                    <SideNavLink
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7H162.5c0 0 0 0 .1 0H168 280h5.5c0 0 0 0 .1 0H417.3c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2H224 204.3c-12.4 0-20.1 13.6-13.7 24.2z" />
                        </svg>
                      }
                      name={"Admin"}
                      to={`/admin`}
                    />
                  )}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {authenticated && (
            <hr className="h-[0.14rem] md:mx-2 bg-purple-600 rounded-md my-2" />
          )}

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
        <hr className="h-[0.18rem] bg-purple-600 rounded-md md:mx-6 md:hidden" />
        <div className="actualNav text-black py-10 px-4 flex flex-col"></div>
      </div>
    </>
  );
};

export default Sidebar;
