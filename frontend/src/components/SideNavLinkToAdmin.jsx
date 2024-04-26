/* eslint-disable react/prop-types */
// import React from "react";
import { Link } from "react-router-dom";

const SideNavLink = (props) => {
  return (
    <div>
      <Link to={props.to}>
        <div className="flex items-center space-x-2 w-full hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md py-2 px-2 cursor-pointer">
          <div className="h-8 w-8 md:h-6 md:w-6 lg:w-8 dark:text-white text--800 lg:h-8 2xl:h-10 2xl:w-10">{props.icon}</div>
          <p className="text-lg md:text-sm lg:text-lg 2xl:text-xl whitespace-nowrap text-black dark:text-white">
            {props.name}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default SideNavLink;
