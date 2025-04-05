/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Spiner from "../Spiner";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import vars from "../../vars";
import loaderContext from "../../context/loadingBar/loderContext";
import { Link } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import { PiPencilSimpleSlash } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import DeleteSlash from "../../static/delete-slash.svg";
import { CiSearch } from "react-icons/ci";

const UserPerAdmin = () => {
  const loadCon = useContext(loaderContext);
  const { setProgress } = loadCon;
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState({ count: 0 });
  const [searchCreds, setSearchCreds] = useState("");
  const getAllPosts = async (que) => {
    setProgress(40);
    try {
      const response = await fetch(`${vars.host}/api/student-crud-blogs/0/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ que: que }),
      });
      const json = await response.json();
      setPage(json);
      setBlogs(json.results);
      console.log(json);
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
    setProgress(100);
  };
  const handleChange = async (e) => {
    setSearchCreds(e.target.value);
    getAllPosts(e.target.value);
  };

  const deleteBlog = async (id) => {
    if (window.confirm("Are You sure wanna Delete this blog?")) {
      try {
        const res = await fetch(`${vars.host}/api/student-crud-blogs/${id}/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
          },
        });
        const json = await res.json();
        if (json.success) {
          setBlogs(blogs.filter((blog) => blog.snoPost !== id));
          toast.success("Blog deleted successfully!");
        } else {
          toast.error("Error deleting blog");
        }
      } catch (error) {
        toast.error(
          "Can't connect to the server. Please check your internet connection"
        );
      }
    }
  };
  const fetchPagedBlogs = async () => {
    try {
      const res = await fetch(`${page.next}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ que: searchCreds }),
      });
      const json = await res.json();
      const newPosts = blogs.concat(json.results);
      setBlogs(newPosts);
      setPage(json);
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  useEffect(() => {
    getAllPosts("");
    document.title = "My Admin | MPS Ajmer";
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 mt-3 text-center md:text-4xl lg:text-6xl font-DancingScript">
        Can do whatever wanna do...!
        <div className="relative">
          <div className="absolute text-base font-normal -top-2 text-gray-600 dark:text-gray-400 italic font-mono right-[16rem]">
            Its my Admin
          </div>
        </div>
      </h1>
      <div className="w-[60%] mx-auto">
        <form
          className="max-w-sm mx-auto mb-4"
          onSubmit={(e) => {
            e.preventDefault();
            getAllPosts(searchCreds);
          }}
        >
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <CiSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              id="email-address-icon"
              className="bg-gray-50 border shadow-md dark:shadow-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={searchCreds}
              placeholder="Type Something to search among your Blogs"
              onChange={handleChange}
            />
          </div>
        </form>
      </div>

      <div className="mb-4 flex items-center justify-start space-x-4 flex-row">
        <Link
          to={`/add-blog`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add New Blog
        </Link>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                SNO
              </th>
              <th scope="col" className="px-6 py-3">
                TITLE
              </th>
              <th scope="col" className="px-6 py-3">
                PUBLISHING STATUS
              </th>
              <th scope="col" className="px-6 py-3">
                EDIT
              </th>
              <th scope="col" className="px-6 py-3">
                VIEW
              </th>
              <th scope="col" className="px-6 py-3">
                DELETE
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((post) => {
              return (
                <>
                  <tr className="bg-white dark:bg-gray-800" key={post.snoPost}>
                    <td className="px-6 py-4">{post.snoPost}</td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {post.title}
                    </th>
                    <td className="px-6 py-4">
                      {post.allowed ? <>Published</> : <>Not Yet Published</>}
                    </td>
                    <td className="px-6 py-4">
                      {post.allowed ? (
                        <>
                          <PiPencilSimpleSlash className="text-xl" />
                        </>
                      ) : (
                        <>
                          <Link to={`/stu/ed-bl/${post.slug}`}>
                            <FaPencilAlt className="text-xl cursor-pointer" />
                          </Link>
                        </>
                      )}
                    </td>
                    <td className="px-6 py-4">
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
                    <td className="px-6 py-4">
                      {post.allowed ? (
                        <>
                          <img
                            src={DeleteSlash}
                            alt=""
                            className="h-5 dark:invert"
                          />
                        </>
                      ) : (
                        <>
                          <MdDelete
                            className="text-2xl cursor-pointer"
                            onClick={() => deleteBlog(post.snoPost)}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>

      <InfiniteScroll
        dataLength={blogs.length}
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
      {blogs.length !== page.count ? (
        <>
          <div className="flex justify-center items-center">
            <button
              className="w-fit mx-auto bg-red-600 px-2 py-1 rounded-md hover:bg-red-700"
              onClick={() => fetchPagedBlogs()}
            >
              Show More
            </button>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserPerAdmin;
