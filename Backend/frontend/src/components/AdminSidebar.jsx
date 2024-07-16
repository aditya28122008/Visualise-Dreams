/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext } from "react";
import logo from "../Logo.png";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../context/users/userContext";
import { CiCirclePlus } from "react-icons/ci";
import { toast } from "react-toastify";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const usCon = useContext(userContext);
  const { blogAdminAccess, fetchUser, libraryAdminAccess, userAdminAccess } =
    usCon;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLibraryDropdownOpen, setIsLibraryDropdownOpen] = useState(false);
  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleLibraryDropdown = () => {
    setIsLibraryDropdownOpen(!isLibraryDropdownOpen);
  };
  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };
  const logout = async () => {
    localStorage.removeItem("MPSUser");
    navigate("/");
    await fetchUser();
    toast.info("Successfully Logged Out");
  };

  return (
    <div className="w-[25%] transition-transform duration-500 shadow-2xl shadow-gray-400 dark:bg-gray-800 bg-purple-100 dark:shadow-none z-20 fixed hidden md:block -top-4 mt-3 left-0 py-4 bottom-0">
      {/* Sidebar header */}
      <div className="flex items-center justify-center md:flex-col lg:flex-row space-x-2 py-4 px-4">
        <img
          src={logo}
          className="w-16 mx-auto border-none rounded-full"
          alt=""
        />
        <div className="">
          <h1 className="lg:text-lg md:text-base text-center whitespace-pre-wrap font-medium lg:font-semibold font-Kalnia">
            MPS Ajmer&apos;s Administration
          </h1>
          <div className="text-gray-600 dark:text-gray-400 text-center whitespace-pre-wrap lg:text-sm md:text-xs">
            The most secure <br /> Admin Pannel in Ajmer...!
          </div>
        </div>
      </div>
      {/* Sidebar links */}
      <div className="flex flex-col flex-grow dark:text-white text-black">
        {blogAdminAccess && (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="w-full px-6 py-3 text-lg focus:text-white font-medium hover:bg-blue-600 focus:bg-blue-600 hover:text-white flex justify-between items-center focus:outline-none"
            >
              <span>Blogs</span>
              <svg
                className={`w-6 h-6 transition-transform transform ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {/* Dropdown content */}
            <div
              className={`absolute w-full bg-blue-600 text-white shadow-xl z-10 ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              <Link
                to="/admin/a-posts"
                className="block px-4 py-2 text-lg hover:bg-blue-700"
                onClick={toggleDropdown}
              >
                Allowed Posts
              </Link>
              <Link
                to="/admin/b-posts"
                className="block px-4 py-2 text-lg hover:bg-blue-700"
                onClick={toggleDropdown}
              >
                Blocked Posts
              </Link>
              <Link
                to="/admin/m-categories"
                className="block px-4 py-2 text-lg hover:bg-blue-700"
                onClick={toggleDropdown}
              >
                Manage Categories
              </Link>
              <Link
                to="/admin/addblog"
                className="block px-4 py-2 text-lg hover:bg-blue-700"
              >
                Add a Blog{" "}
                <CiCirclePlus className="inline mx-2 font-bold text-2xl" />
              </Link>
            </div>
          </div>
        )}
        {libraryAdminAccess && (
          <>
            <div className="relative">
              <button
                onClick={toggleLibraryDropdown}
                className="w-full px-6 py-3 text-lg focus:text-white font-medium hover:bg-blue-600 focus:bg-blue-600 hover:text-white flex justify-between items-center focus:outline-none"
              >
                <span>Library</span>
                <svg
                  className={`w-6 h-6 transition-transform transform ${
                    isLibraryDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {/* Dropdown content */}
              <div
                className={`absolute w-full bg-blue-600 text-white shadow-xl z-10 ${
                  isLibraryDropdownOpen ? "block" : "hidden"
                }`}
              >
                <Link
                  to="/admin/eb/all-bk"
                  className="block px-4 py-2 text-lg hover:bg-blue-700"
                  onClick={toggleLibraryDropdown}
                >
                  All Books
                </Link>
                <Link
                  to="/admin/m-bk-cat"
                  className="block px-4 py-2 text-lg hover:bg-blue-700"
                  onClick={toggleLibraryDropdown}
                >
                  Manage Categories
                </Link>
                <Link
                  to="/admin/eb/add"
                  onClick={toggleLibraryDropdown}
                  className="block px-4 py-2 text-lg hover:bg-blue-700"
                >
                  Add a Book
                  <CiCirclePlus className="inline mx-2 font-bold text-2xl" />
                </Link>
              </div>
            </div>
          </>
        )}
        {userAdminAccess && (
          <>
            <div className="relative">
              <button
                onClick={toggleUserDropdown}
                className="w-full px-6 py-3 text-lg focus:text-white font-medium hover:bg-blue-600 focus:bg-blue-600 hover:text-white flex justify-between items-center focus:outline-none"
              >
                <span>Manage Users</span>
                <svg
                  className={`w-6 h-6 transition-transform transform ${
                    isUserDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
              {/* Dropdown content */}
              <div
                className={`absolute w-full bg-blue-600 text-white shadow-xl z-10 ${
                  isUserDropdownOpen ? "block" : "hidden"
                }`}
              >
                <Link
                  to="/admin/all-users"
                  className="block px-4 py-2 text-lg hover:bg-blue-700"
                  onClick={toggleUserDropdown}
                >
                  All Users
                </Link>
                <Link
                  to="/admin/add-user"
                  onClick={toggleUserDropdown}
                  className="block px-4 py-2 text-lg hover:bg-blue-700"
                >
                  Add a User
                  <CiCirclePlus className="inline mx-2 font-bold text-2xl" />
                </Link>
              </div>
            </div>
          </>
        )}

        <a
          onClick={logout}
          className="px-6 py-3 text-lg font-medium hover:bg-blue-600 hover:text-white"
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default AdminSidebar;
