/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import userContext from "../context/users/userContext";
import AdminSidebar from "./AdminSidebar";
import { FaBlogger, FaBook, FaUser } from "react-icons/fa";
import loaderContext from "../context/loadingBar/loderContext";
import { Link } from "react-router-dom";

const AdminOptions = () => {
  const usCon = useContext(userContext);
  const { blogAdminAccess, libraryAdminAccess, userAdminAccess } = usCon;
  const loadCon = useContext(loaderContext);
  const { setProgress } = loadCon;

  useEffect(() => {
    setProgress(100);
    document.title = 'Admin | MPS Ajmer'
  }, []);
  const divStyle = {
    borderWidth: "1px",
  };
  return (
    <>
      <>
        {libraryAdminAccess || blogAdminAccess || userAdminAccess ? (
          <>
            <AdminSidebar />
            <div className="main flex md:justify-end justify-center">
              <div className="right-main-content overflow-x-auto md:w-[75%]">
                <h1 className="text-2xl font-bold mb-4 mt-3 text-center md:text-4xl lg:text-6xl font-DancingScript">
                  Can do whatever wanna do...!
                  <div className="relative">
                    <div className="absolute text-base font-normal -top-2 text-gray-600 dark:text-gray-400 italic font-mono right-[16rem]">
                      Its the Super Admin
                    </div>
                  </div>
                </h1>
                <div className="flex space-x-2 my-8 justify-between md:flex-row flex-col items-center md:space-y-0 space-y-4">
                  {blogAdminAccess && (
                    <Link to={"/admin/a-posts"}>
                      <div
                        className="border-gray-600 px-2 rounded-md h-20 md:h-auto min-w-fit"
                        style={divStyle}
                      >
                        <p className="upper text-2xl text-blue-600 dark:text-blue-400 hover:text-black dark:hover:text-white cursor-pointer flex flex-nowrap items-center space-x-2 justify-center">
                          Blog <FaBlogger className="mt-2 ml-2" />
                        </p>
                        <div className="lower">
                          Be Clear and Concise: Crafting Content that Resonates
                          with Your Audience
                        </div>
                      </div>
                    </Link>
                  )}
                  {libraryAdminAccess && (
                    <Link to={"/admin/eb/all-bk"}>
                      <div
                        className="border-gray-600 px-2 rounded-md h-20 md:h-auto min-w-fit"
                        style={divStyle}
                      >
                        <p className="upper text-2xl text-green-600 dark:text-green-400 hover:text-black dark:hover:text-white cursor-pointer flex flex-nowrap items-center space-x-2 justify-center">
                          Elibrary <FaBook className="mt-2 ml-2" />
                        </p>
                        <div className="lower">
                          Dive into Knowledge: Explore a World of Information
                          and Resources
                        </div>
                      </div>
                    </Link>
                  )}
                  {userAdminAccess && (
                    <Link to={'/admin/all-users'}>
                      <div
                        className="border-gray-600 px-2 rounded-md h-20 md:h-auto min-w-fit"
                        style={divStyle}
                      >
                        <p className="upper text-2xl text-red-600 dark:text-red-400 hover:text-black dark:hover:text-white cursor-pointer flex flex-nowrap items-center space-x-2 justify-center">
                          User <FaUser className="mt-2 ml-2" />
                        </p>
                        <div className="lower">
                          Manage with Ease: Streamline Your User Experience and
                          Administration
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div>
            <p className="text-center text-3xl">Unauthorised</p>
          </div>
        )}
      </>
    </>
  );
};

export default AdminOptions;
