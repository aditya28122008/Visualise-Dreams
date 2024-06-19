import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import vars from "../vars";
  

const BlogItemIndexHomePage = (props) => {
  const { post } = props;
  const alContext = useContext(alertContext);
  const [user, setUser] = useState({ fName: "", lName: "", profile: "" });
  const host = vars.host;
  const getPostUser = async () => {
    const response = await fetch(`${host}/api/post-user/${post.author}/`);
    let json = await response.json();
    json = json[0];
    setUser({ fName: json.first_name, lName: json.last_name, profile: json.profile});
  };
  useEffect(() => {
    getPostUser();
  }, []);
  return (
      <div className="py-8 px-4 lg:w-1/3 shadow-xl dark:shadow-2xl hover:shadow-2xl rounded-xl transition-all cursor-pointer duration-100 md:hover:scale-110">
        <div className="h-full flex items-start">
          <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
            <span className="text-blue-600 pb-2 mb-2 border-b-2 border-blue-700 dark:text-purple-600 dark:border-purple-700" >{post.timeStamp.split("T")[0]}</span>
          </div>
          <div className="flex-grow pl-6">
            <h1 className="title-font text-xl text-black dark:text-white font-bold mb-3">
                {post.title}
            </h1>
            <h2 className="tracking-widest text-xs title-font font-medium text-blue-600 dark:text-purple-600 mb-1">
                {post.tagline}
            </h2>
            <p className="leading-relaxed mb-5 dark:text-[#8a9bb1] text-justify text-gray-600">
                {post.content.slice(0, 100)}
            </p>
            <div className="inline-flex items-center">
              <img
                alt="blog"
                src={`${user.profile}`}
                className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
              />
              <span className="flex-grow flex flex-col pl-3">
                <span className="title-font font-medium text-blue-800 dark:text-purple-800">
                  By: {`${user.fName} ${user.lName}`}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default BlogItemIndexHomePage;
