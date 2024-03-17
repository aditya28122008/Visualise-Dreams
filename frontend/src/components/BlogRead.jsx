import React, { useEffect, useState, useContext } from "react";
import loaderContext from "../context/loadingBar/loderContext";
import vars from "../vars";
import alertContext from "../context/alert/alertContext";
import { useParams, Link } from "react-router-dom";
import userContext from "../context/users/userContext";
import {toast} from 'react-toastify'

const BlogRead = () => {
  const usCon = useContext(userContext);
  const { blogAdminAccess } = usCon;
  const loderCon = useContext(loaderContext);
  const { setProgress } = loderCon;
  const alContext = useContext(alertContext);
  const { showAlert } = alContext;
  const { slug } = useParams();
  const [notAvail, setNotAvail] = useState(false);
  const [post, setPost] = useState({});
  const [postUser, setPostUser] = useState({
    fName: "",
    lName: "",
    profile: "",
    username: "",
    status: "",
  });
  const getPost = async () => {
    setProgress(40);
    try {
      const response = await fetch(`${vars.host}/api/post/${slug}/`, {
        method: "GET",
      });
      const json = await response.json();
      setPost(json[0])
      getPostUser(json[0].author)
    } catch (error) {
      toast.error("Can't connect to the server. Please check your internet connection")
    }
  };
  const getPostUser = async (id) => {
    try {
      const response = await fetch(`${vars.host}/api/post-user/${id}/`, {
        method: "GET",
      });
      let json = await response.json();
      json = json[0];
      setPostUser({
        fName: json.first_name,
        lName: json.last_name,
        profile: json.profile,
        username: json.username,
        status: json.Status,
      });
      //   console.log(json.status);
    } catch (error) {
      console.log(error);
    }
    setProgress(100);
  };
  useEffect(() => {
    getPost();
  }, []);
  return (
    <div>
      {!notAvail ? (
        <section className="dark:bg-gray-900 bg-white body-font">
          <div className="lg:w-4/6 mx-auto">
            <div className="container px-5 py-24 mx-auto flex flex-col">
              <div className="mb-6">
                <div className="mt-10 w-fit whitespace-nowrap">
                  <div className="top flex space-x-3 justify-center items-center my-4">
                    <img
                      src={postUser.profile}
                      alt="Post Author Image"
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="">
                      <Link to={`/profile/${postUser.username}`}>
                        <p className="text-xl font-semibold dark:text-white text-black cursor-pointer hover:underline hover:underline-offset-4">
                          {postUser.fName} {postUser.lName}
                        </p>
                      </Link>
                      <p className="text-gray-600 dark:text-gray-400 text-sm underline-offset-4">
                        {postUser.status === 1 && "Student"}
                        {postUser.status === 2 && "Teacher"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto w-fit text-black mb-6 dark:text-white font-bold italic text-3xl md:text-6xl text-justify">
                <p>{post.title}</p>
                {/* <p>{post.timeStamp.toString()}</p> */}
              </div>
              <div className="rounded-lg h-96 w-full overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src={post.image}
                />
              </div>
              <p
                className="leading-relaxed text-lg my-10 text-justify dark:text-gray-400 text-gray-600"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
        </section>
      ) : (
        <div>
          <p className="text-center text-3xl">Post Not Available</p>
        </div>
      )}
    </div>
  );
};

export default BlogRead;
