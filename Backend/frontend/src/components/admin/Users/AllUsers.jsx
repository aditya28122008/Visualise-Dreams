/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import vars from "../../../vars";
import { toast } from "react-toastify";
import userContext from "../../../context/users/userContext";
import { CiSearch } from "react-icons/ci";
// import { Link } from 'react-router-dom'
import { FaArrowRight, FaPencilAlt } from "react-icons/fa";
import Spiner from "../../Spiner";
import InfiniteScroll from "react-infinite-scroll-component";
import AdminSidebar from "../../AdminSidebar";
import { FaCheckCircle, FaUserShield } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import loaderContext from "../../../context/loadingBar/loderContext";
import { Link, useNavigate } from "react-router-dom";
const AllUsers = () => {
  const usCon = useContext(userContext);
  const loadCon = useContext(loaderContext);
  const { setProgress } = loadCon;
  const { blogAdminAccess, libraryAdminAccess, userAdminAccess, user } = usCon;
  const loggedUser = user;
  const currUser = usCon.user;
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState({ count: 0 });
  const getAllUsers = async (que) => {
    setProgress(40);
    try {
      const res = await fetch(`${vars.host}/api/admin-crud-users/0/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: que, command: "serh" }),
      });
      // console.log(res);
      const json = await res.json();
      setPage(json);
      setUsers(json.results);
    } catch (error) {
      console.log(error);
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
    setProgress(100);
  };
  const activateUser = async (id) => {
    if (currUser.id !== id) {
      try {
        const res = await fetch(`${vars.host}/api/admin-crud-users/${id}/`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ command: "activate" }),
        });
        const json = await res.json();
        if (json.success) {
          const updatedUsers = users.map((user) =>
            user.id === id ? { ...user, is_active: true } : user
          );
          setUsers(updatedUsers);
          toast.success("User Activated Successfully");
        } else {
          toast.error("Error Activating User");
        }
      } catch (error) {
        toast.error("Error Activating User");
      }
    } else {
      toast.warning("Can't activate your own user entity...!");
    }
  };
  const deActivateUser = async (id) => {
    if (window.confirm("Are you sure wanna deactivate this user?")) {
      if (currUser.id !== id) {
        try {
          const res = await fetch(`${vars.host}/api/admin-crud-users/${id}/`, {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ command: "deactivate" }),
          });
          const json = await res.json();
          if (json.success) {
            const updatedUsers = users.map((user) =>
              user.id === id ? { ...user, is_active: false } : user
            );
            setUsers(updatedUsers);
            toast.success("User Dectivated Successfully");
          } else {
            toast.error("Error Deactivating User");
          }
        } catch (error) {
          toast.error("Error Deactivating User");
        }
      } else {
        toast.warning("Can't deactivate your own user entity...!");
      }
    }
  };
  useEffect(() => {
    getAllUsers("");
  }, []);

  const fetchMoreUsers = async () => {
    try {
      const res = await fetch(`${page.next}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchCreds, command: "serh" }),
      });
      const json = await res.json();
      setPage(json);
      setUsers(users.concat(json.results));
    } catch (error) {
      // console.log(error);
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  const [searchCreds, setSearchCreds] = useState("");
  const handleChange = async (e) => {
    setSearchCreds(e.target.value);
    getAllUsers(e.target.value);
  };
  const deletUser = async (id) => {
    if (id !== loggedUser.id) {
      if (window.confirm("Are you sure wanna delete this user?")) {
        try {
          const res = await fetch(`${vars.host}/api/admin-crud-users/${id}/`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
            },
          });
          const json = await res.json();
          if (json.success) {
            const newUsers = users.filter((us) => {
              return us.id !== id;
            });
            setUsers(newUsers);
            toast.success("User Deleted Successfully");
          } else if (json.code === "p_exists") {
            toast.warn(
              `Some blogs associated with this user exists. First delete them to delete the user.`
            );
          } else {
            toast.error("Error deleting user");
          }
        } catch (error) {
          toast.error(
            "Can't connect to the server. Please check your internet connection"
          );
        }
      }
    } else {
      toast.warning("Can't Delete your own user entity...!");
    }
  };
  const navigate = useNavigate();
  const onEditUser = (id) => {
    if (id !== loggedUser.id) {
      navigate(`/admin/ed-user/${id}`);
    } else {
      toast.warning("Can't Edit your own user entity...!");
    }
  };
  return (
    <>
      {libraryAdminAccess || blogAdminAccess || userAdminAccess ? (
        <>
          <AdminSidebar />
          <div className="main flex md:justify-end justify-center">
            <div className="right-main-content overflow-x-auto md:w-[75%]">
              {userAdminAccess && (
                <>
                  <h1 className="text-4xl mb-4 text-center whitespace-nowrap w-fit mx-auto">
                    Manage All The Users From Here
                    <FaUserShield className="inline text-red-500 dark:text-white mx-2" />
                  </h1>
                  <div className="w-[60%] mx-auto">
                    <form
                      className="max-w-sm mx-auto mb-4"
                      onSubmit={(e) => {
                        e.preventDefault();
                        getAllUsers(searchCreds);
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
                          placeholder="Type Something to search among users"
                          onChange={handleChange}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="relative">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            ID
                          </th>
                          <th scope="col" className="px-6 py-3">
                            NAME
                          </th>
                          <th scope="col" className="px-6 py-3">
                            STATUS
                          </th>
                          <th scope="col" className="px-6 py-3">
                            EMAIL
                          </th>
                          <th scope="col" className="px-6 py-3">
                            PROFILE
                          </th>
                          <th scope="col" className="px-6 py-3">
                            BANNER
                          </th>
                          <th scope="col" className="px-6 py-3">
                            IS ACTIVE
                          </th>
                          <th scope="col" className="px-6 py-3">
                            ACTIVATE / DEACTIVATE
                          </th>
                          <th scope="col" className="px-6 py-3">
                            VIEW
                          </th>
                          <th scope="col" className="px-6 py-3">
                            EDIT
                          </th>
                          {loggedUser.is_superuser && (
                            <>
                              <th scope="col" className="px-6 py-3">
                                DELETE
                              </th>
                            </>
                          )}

                          {blogAdminAccess && (
                            <>
                              <th scope="col" className="px-6 py-3">
                                USER BLOGS
                              </th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => {
                          return (
                            <tr
                              key={user.id}
                              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {user.id}
                              </th>
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {user.id === currUser.id ? (
                                  <>YOU</>
                                ) : (
                                  <>
                                    {user.first_name} {user.last_name}
                                  </>
                                )}
                              </th>

                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {user.Status}
                              </th>
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {user.email}
                              </th>
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <a
                                  href={`${vars.host}/${user.profile}`}
                                  className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline hover:underline-offset-4"
                                >
                                  Click To View Profile
                                </a>
                              </th>
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <a
                                  href={`${vars.host}/${user.bannerImg}`}
                                  className="cursor-pointer text-blue-600 dark:text-blue-400 hover:underline hover:underline-offset-4"
                                >
                                  Click To View Banner
                                </a>
                              </th>
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {user.is_active ? (
                                  <FaCheckCircle className="text-2xl p-[0.12rem] text-green-600 bg-white rounded-full" />
                                ) : (
                                  <IoIosCloseCircle className="text-2xl text-red-600 bg-white rounded-full" />
                                )}
                              </th>
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {user.id !== currUser.id ? (
                                  <>
                                    {user.is_active ? (
                                      <button
                                        className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-500"
                                        onClick={() => deActivateUser(user.id)}
                                      >
                                        Deactivate
                                      </button>
                                    ) : (
                                      <button
                                        className="bg-green-600 text-white rounded-md px-2 py-1 hover:bg-green-500"
                                        onClick={() => activateUser(user.id)}
                                      >
                                        Activate
                                      </button>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {user.is_active ? (
                                      <button
                                        className="bg-red-600 text-white px-2 py-1 rounded-md"
                                        disabled
                                        onClick={() => deActivateUser(user.id)}
                                      >
                                        Deactivate
                                      </button>
                                    ) : (
                                      <button
                                        className="bg-green-600 text-white rounded-md px-2 py-1 "
                                        disabled
                                        onClick={() => activateUser(user.id)}
                                      >
                                        Activate
                                      </button>
                                    )}
                                  </>
                                )}
                              </th>
                              <th scope="col" className="px-6 py-3">
                                <Link to={`/profile/${user.username}`}>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 576 512"
                                    className="dark:invert h-5 w-5 cursor-pointer"
                                  >
                                    <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                                  </svg>
                                </Link>
                              </th>
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                <div onClick={() => onEditUser(user.id)}>
                                  <FaPencilAlt
                                    className={`text-xl ${
                                      loggedUser.id !== user.id &&
                                      "cursor-pointer"
                                    }`}
                                  />
                                </div>
                              </th>
                              {loggedUser.is_superuser && (
                                <>
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                  >
                                    <MdDelete
                                      className={`text-2xl ${
                                        loggedUser.id !== user.id &&
                                        "cursor-pointer"
                                      }`}
                                      onClick={() => deletUser(user.id)}
                                    />
                                  </th>
                                </>
                              )}

                              {blogAdminAccess && (
                                <>
                                  <th scope="col" className="px-6 py-3">
                                    <Link to={`/admin/user-blogs/${user.id}`}>
                                      <FaArrowRight className="dark:text-white text-black" />
                                    </Link>
                                  </th>
                                </>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <InfiniteScroll
                      dataLength={page.count}
                      next={fetchMoreUsers}
                      hasMore={page.next ? true : false}
                      loader={<Spiner />}
                      endMessage={
                        <>
                          <div className="text-center text-lg">
                            You&apos;ve Reached the End Of the Module. <br />
                            No More Items to Display.
                          </div>
                        </>
                      }
                      scrollableTarget="scrollableDiv"
                    />
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

export default AllUsers;
