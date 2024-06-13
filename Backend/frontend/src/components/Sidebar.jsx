/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import SideNavLink from "./SideNavLink";
import vars from "../vars";
import { FaHome, FaCheckCircle } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import userContext from "../context/users/userContext";
import { toast } from "react-toastify";
import { FaPencilAlt } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { TbCategoryFilled } from "react-icons/tb";

const Sidebar = (props) => {
  const usContext = useContext(userContext);
  const [blogLen, setBlogLen] = useState("");
  const { blogAdminAccess, libraryAdminAccess } = usContext;
  useEffect(() => {
    getPostsLength();
  }, []);
  const getPostsLength = async () => {
    try {
      const response = await fetch(`${vars.host}/api/get-post-length/`);
      const json = await response.json();
      setBlogLen(json["length"]);
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  return (
    <>
      <div
        className="left-nav top-12 h-screen md:w-[20%] md:block bg-white dark:bg-gray-800 shadow-2xl w-[70%] transition-all overflow-y-auto z-[2] duration-300 fixed py-4 text-black -translate-x-full"
        id="sidebar"
      >
        <div className="sideMenuBase py-8 px-4 md:px-2 flex flex-col space-y-1">
          <div className="md:hidden" onClick={() => props.sideShow()}>
            <SideNavLink
              name={`Blogs (${blogLen})`}
              to="/"
              icon={<FaHome className="text-3xl" />}
            />
            <SideNavLink
              name="E Library"
              to="/elibrary"
              icon={<IoLibrary className="text-3xl" />}
            />
          </div>
        </div>
        <hr className="h-[0.18rem] bg-blue-600 rounded-md md:mx-6 md:hidden" />
        {(blogAdminAccess || libraryAdminAccess) && (
          <div className="actualNav text-black py-10 px-4 flex flex-col">
            <p className="dark:text-gray-200 text-black text-4xl font-bold text-center font-DancingScript">
              Admin:-
            </p>
            <div onClick={() => props.sideShow()}>
              <p className="dark:text-gray-300 text-black text-xl font-bold text-center font-Oswald">
                Blogs:
              </p>
              {blogAdminAccess && (
                <>
                  <SideNavLink
                    name="Allowed Posts"
                    to="/admin/a-posts"
                    icon={
                      <FaCheckCircle className="text-3xl text-green-600 bg-white rounded-full" />
                    }
                  />
                  <SideNavLink
                    name="Blocked Posts"
                    to="/admin/b-posts"
                    icon={
                      <IoIosCloseCircle className="text-3xl text-red-600 dark:text-red-500 bg-white rounded-full" />
                    }
                  />
                  <SideNavLink
                    name="Manage Categories"
                    to="/admin/m-categories"
                    icon={
                      <TbCategoryFilled className="text-3xl text-green-600 dark:text-red-500 rounded-full" />
                    }
                  />
                  <SideNavLink
                    name="Add Post"
                    to="/admin/addblog"
                    icon={
                      <FaPencilAlt className="text-3xl text-black-600 dark:text-red-500" />
                    }
                  />
                  <hr className="h-[0.18rem] bg-blue-600 rounded-md md:mx-6 md:hidden" />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
