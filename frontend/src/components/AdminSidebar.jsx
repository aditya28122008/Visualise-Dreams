import { useState } from "react";
import logo from "../Logo.png";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle the dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-[25%] transition-transform duration-500 shadow-2xl shadow-gray-400 dark:bg-gray-800 bg-purple-100 dark:shadow-none z-20 fixed hidden md:block -top-4 mt-3 left-0 py-4 bottom-0">
      {/* Sidebar header */}
      <div className="flex items-center space-x-2 py-4 px-4">
        <img src={logo} className="w-16 border-none rounded-full" alt="" />
        <div className="">
          <h1 className="text-lg font-semibold font-Kalnia">
            MPS Ajmer&apos;s Administration
          </h1>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            The most secure Administration
          </div>
        </div>
      </div>
      {/* Sidebar links */}
      <div className="flex flex-col flex-grow dark:text-white text-black">
        <Link
          to="/admin/a-posts"
          className="px-6 py-3 text-lg font-medium hover:bg-blue-600 hover:text-white"
        >
          Allowed Posts
        </Link>
        <Link
          to="/admin/b-posts"
          className="px-6 py-3 text-lg font-medium hover:bg-blue-600 hover:text-white"
        >
          Block Posts
        </Link>
        <a
          href="#"
          className="px-6 py-3 text-lg font-medium hover:bg-blue-600 hover:text-white"
        >
          Settings
        </a>
        <a
          href="#"
          className="px-6 py-3 text-lg font-medium hover:bg-blue-600 hover:text-white"
        >
          Logout
        </a>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="w-full px-6 py-3 text-lg font-medium hover:bg-blue-600 focus:bg-blue-600 hover:text-white flex justify-between items-center focus:outline-none"
          >
            <span>Dropdown</span>
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
            className={`absolute w-full bg-blue-600 text-white shadow-xl ${
              isDropdownOpen ? "block" : "hidden"
            }`}
          >
            <a href="#" className="block px-4 py-2 text-lg hover:bg-blue-700">
              Option 1
            </a>
            <a href="#" className="block px-4 py-2 text-lg hover:bg-blue-700">
              Option 2
            </a>
            <a href="#" className="block px-4 py-2 text-lg hover:bg-blue-700">
              Option 3
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
