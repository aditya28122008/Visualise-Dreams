/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import vars from "../../vars";
import Spiner from "../Spiner";
import InfiniteScroll from "react-infinite-scroll-component";
import AdminSidebar from "../AdminSidebar";
import userContext from "../../context/users/userContext";
import { toast } from "react-toastify";
import blogContext from "../../context/admin/blogs/blogContext";
import { FaPencilAlt } from "react-icons/fa";
import { PiPencilSimpleSlashLight } from "react-icons/pi";
import loaderContext from "../../context/loadingBar/loderContext";

const AdminCatBlogs = () => {
  const loadCon = useContext(loaderContext)
  const {setProgress} = loadCon;

  const bloCont = useContext(blogContext);
  const { conDeleteBlogById } = bloCont;
  const usCon = useContext(userContext);
  const { libraryAdminAccess, blogAdminAccess, userAdminAccess } = usCon;
  const { cat } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState({ count: 0 });
  const getCatBlogs = async () => {
    setProgress(40)
    const headers = {
      "Authorization": `Bearer ${localStorage.getItem("MPSUser")}`
    }
    try {
      const res = await axios.get(
        `${vars.host}/api/category-post-admin/${cat}/`, {headers: headers}
      );
      setPage(res.data);
      setBlogs(res.data.results);
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
    setProgress(100)
  };
  const fetchPagedBlogs = async () => {
    try {
      const response = await fetch(`${page.next}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
        },
      });
      const json = await response.json();
      setPage(json);
      const newblogs = blogs.concat(json.results);
      setBlogs(newblogs);
      // document.documentElement.scrollTop = 0;
      // document.body.scrollTop = 0;
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  useEffect(() => {
    getCatBlogs();
  }, []);
  const deleteBlogById = async (id) => {
    if (window.confirm("Are You Sure Want to Delete?")) {
      const res = await conDeleteBlogById(id);
      if (res) {
        const newPosts = blogs.filter((p) => {
          return p.snoPost !== id;
        });
        setBlogs(newPosts);
      }
    }
  };
  return (
    <>
      {libraryAdminAccess || blogAdminAccess || userAdminAccess ? (
        <>
          <AdminSidebar />
          <div className="main flex md:justify-end justify-center">
            <div className="right-main-content overflow-x-auto md:w-[75%]">
              {blogAdminAccess && (
                <>
                  <div className="text-center text-4xl mb-4"><span className="font-bold">&#34;{cat}&#34;</span> Associated Blogs</div>
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            SNO
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Post Title
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Posted On
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Read Post
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Edit Post
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Remove Post
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {blogs.map((post) => {
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
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {new Date(post.timeStamp).toDateString()}
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
                              {!post.allowed ? (
                                <>
                                  <td className="px-6 py-4 view">
                                    <Link to={`/admin/edit-blog/${post.slug}`}>
                                      <FaPencilAlt className="dark:text-white text-black" />
                                    </Link>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <button disabled>
                                    <PiPencilSimpleSlashLight className="dark:text-white text-2xl mt-4 ml-8 text-black" />
                                  </button>
                                </>
                              )}

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
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <InfiniteScroll
                      dataLength={page.count}
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

export default AdminCatBlogs;
