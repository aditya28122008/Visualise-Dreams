/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
// import { useState } from "react";
import { Link } from "react-router-dom";

const BlogItem = (props) => {
  // const [user, setUser] = useState({ fName: "", lName: "", username: "" });
  // const getPostUser = async () => {
  //   try {
  //     const response = await fetch(
  //       `${host}/api/post-user/${props.post.author}`
  //     );
  //     let json = await response.json();
  //     json = json[0];
  //     setUser({
  //       fName: json.first_name,
  //       lName: json.last_name,
  //       username: json.username,
  //     });
  //   } catch (error) {
  //     showAlert(
  //       "Can't connect to the server. Please check your internet connection",
  //       "warning"
  //     );
  //   }
  // };
  const contentRef = useRef(null);
  const setPostContent = () => {
    contentRef.current.innerHTML = contentRef.current.innerText.slice(0, 100);
  };
  useEffect(() => {
    setPostContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {/* <section className="text-gray-600 dark:bg-gray-900 dark:text-white bg-white overflow-hidden">
        <div className="container px-5 py-8 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-800">
            <div className="flex flex-col-reverse">
              <div className="py-8 flex flex-wrap md:flex-nowrap w-[90%]">
                <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                  <span className="font-semibold title-font">
                    <span className="text-blue-800 dark:text-gray-400">
                      By:{" "}
                      <Link to={`/profile/${user.username}`}>
                        <span className="hover:underline cursor-pointer dark:bg-gray-900 dark:text-white hover:text-cyan-400">
                          {user.fName} {user.lName}
                        </span>
                      </Link>
                    </span>
                  </span>
                  <span className="mt-1 text-blue-600 text-sm dark:text-gray-600">
                    <span className="text-blue-800 font-semibold title-font dark:text-gray-500">
                      Posted On:{" "}
                    </span>
                    {props.post.timeStamp.split("T")[0]}
                  </span>
                </div>
                <div className="md:flex-grow">
                  <h2 className="text-2xl font-medium text-black dark:text-white text-justify title-font mb-2">
                    {props.post.title}
                  </h2>
                  <p className="leading-relaxed dark:text-[#8a9bb1] text-justify">
                    {String(props.post.content).slice(0, 350)}...
                  </p>
                  <Link
                    to={`/blog/${props.post.slug}`}
                    className="text-blue-600 dark:text-blue-400 inline-flex items-center mt-4 cursor-pointer"
                  >
                    Read More <span className="text-2xl">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      <Link to={`/blog/${props.post.slug}`}>
        <div className="rounded-lg min-h-80 dark:bg-gray-800 bg-white shadow-md dark:shadow-none md:my-0 my-3 md:hover:scale-110 transition-all duration-200 cursor-pointer">
          <img
            src={props.post.image}
            alt=""
            className="h-40 rounded-t-lg w-full object-cover object-center"
          />
          <div className="text-content px-4 py-2">
            <div className="title text-xl font-bold">
              {props.post.title.slice(0, 25)}...
            </div>
            <div className="tagline dark:text-blue-600 text-sm mt-3 mb-1 text-blue-800">
              {props.post.tagline.slice(0, 45)}...
            </div>
            <div
              className="content text-justify dark:text-gray-400 hidden md:block text-gray-600 text-sm"
              dangerouslySetInnerHTML={{ __html: props.post.content }}
              ref={contentRef}
            />
            <div className="content text-justify dark:text-gray-400 md:hidden text-gray-600 text-sm">
              {props.post.content.slice(0, 50)}...
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogItem;
