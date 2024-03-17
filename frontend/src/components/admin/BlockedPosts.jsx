import { useContext, useEffect, useState } from "react";
import loaderContext from "../../context/loadingBar/loderContext";
import userContext from "../../context/users/userContext";
import alertContext from "../../context/alert/alertContext";
import { Link } from "react-router-dom";
import vars from "../../vars";
import { toast } from "react-toastify";
import Spiner from "../Spiner";
import InfiniteScroll from "react-infinite-scroll-component";
import AdminSidebar from "../AdminSidebar";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import blogContext from "../../context/admin/blogs/blogContext";
// import AdminNavbar from "./AdminNavbar";

const BlockedPosts = () => {
  const bloCont = useContext(blogContext);
  const { conDeleteBlogById, conGetBlogs } = bloCont;
  const usContext = useContext(userContext);
  const [posts, setPost] = useState([]);
  const [page, setPage] = useState({});
  const { blogAdminAccess, libraryAdminAccess } = usContext;
  const lodCon = useContext(loaderContext);
  const { setProgress } = lodCon;
  const alContext = useContext(alertContext);
  const { showAlert } = alContext;
  const fetchPagedBlogs = async () => {
    try {
      const response = await fetch(`${page.next}`);
      const json = await response.json();
      setPage(json);
      const newPosts = posts.concat(json.results);
      setPost(newPosts);
      // document.documentElement.scrollTop = 0;
      // document.body.scrollTop = 0;
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };

  const blog = async () => {
    try {
      const response = await fetch(`${vars.host}/api/b-post-admin/`);
      let json = await response.json();
      setPage(json);
      setPost(json.results);
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };

  const allowPost = async (id) => {
    try {
      const response = await fetch(`${vars.host}/api/admin-crud-blogs/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({ command: "allow" }),
      });
      const json = await response.json();
      if (json.success) {
        const newPosts = posts.filter((e) => {
          return e.snoPost !== id;
        });
        setPost(newPosts);
        toast.success("Post Allowed Successfully");
      }
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };

  const deleteBlogById = async (id) => {
    if (window.confirm("Are You Sure Want to Delete?")) {
      const res = await conDeleteBlogById(id);
      if (res) {
        const newPosts = posts.filter((p) => {
          return p.snoPost !== id;
        });
        setPost(newPosts);
      }
    }
  };
  useEffect(() => {
    document.title = "MPS Ajmer - Administration";
    setProgress(100);
    blog();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {libraryAdminAccess || blogAdminAccess ? (
        <>
          <AdminSidebar />
          <div className="main flex justify-end">
            <div className="right-main-content overflow-x-auto md:w-[75%]">
              {blogAdminAccess && (
                <>
                  <h1 className="text-4xl mb-4 text-center">
                    Blocked Blog Posts
                    <IoIosCloseCircle className="inline text-red-600 dark:text-red-500 mx-2 bg-white rounded-full" />
                  </h1>
                  <div className="relative">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            SNO
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Blog
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Read
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Delete
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Block
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {posts.map((post) => {
                          return (
                            <tr
                              key={post.snoPost}
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {post.snoPost}
                              </th>
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {post.title}
                              </th>
                              <td className="px-6 py-4 view">
                                <Link to={`/blog/${post.slug}`}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    className="dark:invert h-5 w-5 cursor-pointer"
                                  >
                                    <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                                  </svg>
                                </Link>
                              </td>
                              <td className="px-6 py-4 delete">
                                <button
                                  onClick={() => deleteBlogById(post.snoPost)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    className="dark:invert h-5 w-5 cursor-pointer"
                                  >
                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                  </svg>
                                </button>
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  className="px-2 py-1 bg-green-600 hover:bg-green-500 text-white rounded-lg"
                                  onClick={() => allowPost(post.snoPost)}
                                >
                                  Allow
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <InfiniteScroll
                      dataLength={posts.length}
                      next={fetchPagedBlogs}
                      hasMore={page.next ? true : false}
                      loader={<Spiner />}
                      endMessage={
                        <>
                          <div className="text-center text-lg">
                            You&apos;ve Reached the End Of the Module. <br />
                            No More Blogs to Display.
                          </div>
                        </>
                      }
                      scrollableTarget="scrollableDiv"
                    ></InfiniteScroll>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div>
          <p className="text-center text-3xl">Unauthorised</p>
        </div>
      )}
    </>
  );
};

export default BlockedPosts;
