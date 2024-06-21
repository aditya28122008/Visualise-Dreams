/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import loaderContext from "../context/loadingBar/loderContext";
import vars from "../vars";
import { useParams, Link } from "react-router-dom";
import userContext from "../context/users/userContext";
import { toast } from "react-toastify";
import Logo from "../static/images/Logo.png";

const BlogRead = () => {
  const usCon = useContext(userContext);
  const { blogAdminAccess, user } = usCon;
  const loderCon = useContext(loaderContext);
  const { setProgress } = loderCon;
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
      setPost(json);
      if (json.detail === "Not found.") {
        setNotAvail(true);
        setProgress(100);
      } else {
        getPostUser(json.author, json);
      }
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  const getPostUser = async (id, post) => {
    if (post.by_admin) {
      setPostUser({
        fName: "MPS",
        lName: "Ajmer",
        profile: Logo,
        status: 3,
      });
    } else {
      try {
        const response = await fetch(`${vars.host}/api/post-user/${id}/`, {
          method: "GET",
        });
        let jsonn = await response.json();
        setPostUser({
          fName: jsonn.first_name,
          lName: jsonn.last_name,
          profile: jsonn.profile,
          username: jsonn.username,
          status: jsonn.Status,
        });
      } catch (error) {
        toast.error(
          "Can't connect to the server. Please check your internet connection"
        );
      }
    }
    setProgress(100);
  };
  useEffect(() => {
    getPost();
  }, []);
  const blockPost = async (id) => {
    try {
      const response = await fetch(`${vars.host}/api/admin-crud-blogs/${id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ command: "block" }),
      });
      const json = await response.json();
      if (json.success) {
        setPost({ ...post, allowed: false });
        toast.success("Post Blocked Successfully");
      } else {
        toast.error("An Error occoured");
      }
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  const allowPost = async (id) => {
    try {
      const response = await fetch(`${vars.host}/api/admin-crud-blogs/${id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ command: "allow" }),
      });
      const json = await response.json();
      if (json.success) {
        setPost({ ...post, allowed: true });
        toast.success("Post Published Successfully");
      }
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  return (
    <div>
      {((blogAdminAccess && post.allowed) ||
        (!blogAdminAccess && post.allowed) ||
        postUser.username === user.username ||
        (blogAdminAccess && !post.allowed)) &&
      !notAvail ? (
        <section className="dark:bg-gray-900 bg-white body-font">
          <div className="lg:w-[80%] mx-auto">
            <div className="container px-5 py-24 mx-auto flex flex-col">
              <div className="dark:bg-gray-800 px-8 rounded-md dark:shadow-none shadow-lg">
                <div className="mb-6">
                  <div className="mt-10 w-full items-center whitespace-nowrap flex justify-between">
                    <div className="top flex space-x-3 justify-center items-center my-4">
                      <img
                        src={postUser.profile}
                        alt="Post Author Image"
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        {postUser.status === 3 ? (
                          <a target="_blank" href={`https://mpsajmer.com`}>
                            <p className="text-xl font-semibold dark:text-white text-black cursor-pointer hover:underline hover:underline-offset-4">
                              {postUser.fName} {postUser.lName}
                            </p>
                          </a>
                        ) : (
                          <Link to={`/profile/${postUser.username}`}>
                            <p className="text-xl font-semibold dark:text-white text-black cursor-pointer hover:underline hover:underline-offset-4">
                              {postUser.fName} {postUser.lName}
                            </p>
                          </Link>
                        )}
                        <p className="text-gray-600 dark:text-gray-400 text-sm underline-offset-4">
                          {postUser.status === 1 && "Student"}
                          {postUser.status === 2 && "Teacher"}
                          {postUser.status === 3 && "Admin"}
                        </p>
                      </div>
                    </div>
                    <div>
                      {blogAdminAccess && (
                        <>
                          {!post.allowed ? (
                            <div className="flex space-x-2 justify-center items-center">
                              <button
                                onClick={() =>
                                  allowPost(post.snoPost)
                                }
                                className="px-2 py-1 bg-green-600 hover:bg-green-400 rounded-md text-white"
                              >
                                Publish
                              </button>
                              <Link
                                to={`/admin/edit-blog/${post.slug}`}
                                className="px-2 py-1 bg-green-600 hover:bg-green-400 rounded-md text-white"
                              >
                                Edit
                              </Link>
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                blockPost(post.snoPost)
                              }
                              className="px-2 py-1 bg-red-600 hover:bg-red-400 rounded-md text-white"
                            >
                              Block
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mx-auto w-fit text-black mb-6 dark:text-white font-bold italic text-3xl md:text-6xl text-justify">
                  <p>{post.title}</p>
                  <p className="text-lg not-italic text-gray-600 dark:text-gray-400 text-right mt-2">
                    {new Date(post.timeStamp).toDateString().slice(4)}
                  </p>
                </div>
                <div className="rounded-lg h-96 w-full overflow-hidden">
                  <img
                    alt="content"
                    className="object-cover object-center h-full w-full"
                    src={post.image}
                  />
                </div>
                <div className="my-10 px-2 py-4 rounded-md">
                  <p
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              </div>
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
