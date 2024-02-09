import React from "react";

const IndexInfo = (props) => {
  return (
    <div className="xl:w-1/3 md:w-1/2 p-4">
      <div className="border border-gray-200 p-6 rounded-lg hover:shadow-2xl cursor-pointer hover:scale-110 transition-all duration-150">
        <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-purple-100 dark:bg-gray-100 dark:text-purple-500 text-blue-500 mb-4">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-6 h-6"
            viewBox="0 0 24 24"
          >
            <path d={props.icon} />
          </svg>
        </div>
        <h2 className="text-lg text-gray-900 dark:text-white font-medium title-font mb-2">
          {props.title}
        </h2>
        <p className="leading-relaxed text-base dark:text-[#8a9bb1]">
          {props.content}
        </p>
      </div>
    </div>
  );
};

export default IndexInfo;
