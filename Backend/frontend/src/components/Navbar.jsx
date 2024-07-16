/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../context/users/userContext";
import NavbarLink from "./NavbarLink";
import DropDownImg from "../static/dropDown.png";
import vars from "../vars";
import { CiSearch } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { toast } from "react-toastify";

const Navbar = (props) => {
  const context = useContext(userContext);
  const navigate = useNavigate();
  const [blogLen, setBlogLen] = useState("");
  const {
    fetchUser,
    authenticated,
    user,
    libraryAdminAccess,
    blogAdminAccess,
    userAdminAccess,
  } = context;
  const { setMode } = props;

  const dropProf = () => {
    document.getElementById("profDrop").classList.toggle("-translate-y-96");
    document.getElementById("profileDown").classList.toggle("-rotate-180");
  };
  const [query, setQuery] = useState("");

  const onChange = (e) => {
    setQuery(e.target.value);
  };


  useEffect(() => {
    fetchUser();
    getPostsLength();
    // checkGroups(user);
    // console.log(user);
    if (localStorage.getItem("mode")) {
      setMode(localStorage.getItem("mode"));
    } else {
      setMode("light");
    }
    // props.sideShow();
  }, []);
  const toggleDarkMode = () => {
    if (props.mode === "dark") {
      setMode("light");
      localStorage.setItem("mode", "light");
    } else {
      setMode("dark");
      localStorage.setItem("mode", "dark");
    }
  };
  const mobileSearch = () => {
    document.getElementById("searchClose").classList.toggle("hidden");
    document.getElementById("searchIco").classList.toggle("hidden");
    document
      .getElementById("searchFormMobile")
      .classList.toggle("-translate-y-52");
  };
  const getPostsLength = async () => {
    try {
      const response = await fetch(`${vars.host}/api/get-post-length/`);
      const json = await response.json();
      setBlogLen(json["length"]);
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  const logout = async () => {
    localStorage.removeItem("MPSUser");
    navigate("/");
    await fetchUser();
    toast.info("Successfully Logged Out");
  };
  return (
    <>
      <nav
        id="navbar"
        className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 dark:border-b-white shadow-md z-10 text-black max-h-[4.7rem]"
      >
        <div className="flex items-center h-fit">
          <div className={`left block top-auto left-4 absolute md:hidden`}>
            <button
              id="sideHam"
              onClick={() => props.sideShow()}
              className="flex flex-col"
            >
              <div
                className="pt-[4px] my-1 w-8 dark:bg-blue-600 bg-blue-500 transition-all duration-700 rounded-full"
                id="sideHamDiv1"
              />
              <div
                className="pt-[4px] my-1 w-8 dark:bg-blue-600 bg-blue-500 transition-all duration-700 rounded-full"
                id="sideHamDiv2"
              />
              <div
                className="pt-[4px] my-1 w-8 dark:bg-blue-600 bg-blue-500 transition-all duration-200 rounded-full"
                id="sideHamDiv3"
              />
            </button>
          </div>
          <div className="nav-left items-center justify-center md:absolute my-[0.8rem] md:my-0 flex relative left-14 lg:left-16">
            <Link to="/">
              <div className="siteTitleImg flex items-center justify-center">
                <div className="logo">
                  <img
                    src={props.logo}
                    className="h-12 w-12 rounded-full"
                    alt=""
                  />
                </div>
                <div className="logoTitle cursor-pointer">
                  <p className="dark:text-white text-black font-bold font-Kalnia lg:text-3xl text-lg md:text-xl">
                    {props.title}
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="nav-right flex xl:space-x-2 md:space-x-1 items-center justify-center absolute right-0 md:mx-8 mx-2">
            <button
              onClick={toggleDarkMode}
              className="hidden md:block transition-all duration-200"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="hidden md:block text-blue-700 mt-1 ml-2 cursor-pointer dark:text-white"
                height="28"
                width="28"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path>
                <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"></path>
              </svg>
            </button>
            <form
              role="search"
              action={`/search/${query}`}
              className="search border-blue-600 md:mx-1 mr-1 hidden lg:block"
            >
              <input
                type="text"
                className="dark:bg-gray-700 dark:border-0 dark:focus:border-0 dark:text-white text-black px-3 lg:w-28 xl:w-44 w-32 py-1 rounded-lg inline border-2 transition-all duration-100 focus:border-4 lg:text-sm focus:border-blue-700 xl:text-lg lg:py-1 lg:px-2 xl:py-2 xl:px-4 border-blue-600"
                placeholder="Search..."
                name="query"
                id="querys"
                value={query}
                maxLength={78}
                onChange={onChange}
              />
            </form>
            <div className="search md:mx-2 lg:hidden space-x-1 flex mr-1">
              <button onClick={toggleDarkMode} className="">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 16 16"
                  className="md:hidden w-4 text-blue-700 mt-1 ml-2 cursor-pointer dark:text-white transition-all duration-300"
                  height="28"
                  width="28"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path>
                  <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"></path>
                </svg>
              </button>
              <button
                className="md:h-10 md:w-10 h-7 w-7 cursor-pointer flex items-center justify-center flex-col"
                onClick={() => mobileSearch()}
              >
                <CiSearch
                  className="w-fit transition-all duration-300 font-bold text-blue-800 dark:text-white text-9xl"
                  id="searchIco"
                />
                <IoIosClose
                  className="w-fit font-bold text-9xl my-auto text-blue-800 dark:text-white transition-all duration-300 hidden"
                  id="searchClose"
                />
              </button>
            </div>
            {!authenticated ? (
              <div>
                <Link to="/login">
                  <button className="text-center rounded-xl hover:bg-blue-800 text-white bg-blue-600 lg:px-6 md:px-4 px-4 text-xl ml-2 md:text-xl pt-1 pb-1 login">
                    Login
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                {" "}
                <button
                  className="flex transition-all duration-500 justify-center items-center hover:bg-gray-200 dark:hover:bg-gray-600 md:px-2 md:py-1 py-0.5 px-1 rounded-xl"
                  id="profDropToggle"
                  onClick={() => dropProf()}
                >
                  <img
                    src={`${vars.host}${user.profile}`}
                    alt=""
                    className="md:h-12 h-8 w-8 md:w-12 rounded-full border-2 dark:border-white border-blue-600 mr-1 transition-all duration-500"
                  />
                  <img
                    src={DropDownImg}
                    alt=""
                    className="h-3 w-3 mx-auto my-1 dark:invert md:ml-1 transition-all duration-500"
                    id="profileDown"
                  />
                </button>
                <div
                  className="absolute bg-white text-blue-700 border-blue-400 border-2 px-3 py-3 rounded-xl top-20 md:-right-3 right-0 transition-all duration-500 -translate-y-96"
                  id="profDrop"
                >
                  <div>
                    <div onClick={dropProf} className="my-1 w-full rounded-xl hover:text-blue-400 duration-500 py-2 text-center cursor-pointer">
                      <button onClick={logout}>Logout</button>
                    </div>
                    <hr className="bg-blue-500 h-[0.12rem] rounded-md" />
                    <div onClick={dropProf} className="my-1 w-full rounded-xl hover:text-blue-400 py-2 text-center cursor-pointer">
                      <Link to="/edit-profile">Edit Profile</Link>
                    </div>
                    <hr className="bg-blue-500 h-[0.12rem] rounded-md" />
                    <div onClick={dropProf} className="my-1 w-full rounded-xl hover:text-blue-400 py-2 text-center cursor-pointer">
                      <Link to={`/profile/${user.username}`}>My Profile</Link>
                    </div>
                    <hr className="bg-blue-500 h-[0.12rem] rounded-md" />
                    <div onClick={dropProf} className="my-1 w-full rounded-xl hover:text-blue-400 py-2 text-center cursor-pointer">
                      <Link to={`/u-admin`}>My Admin</Link>
                    </div>
                  </div>
                </div>{" "}
              </div>
              // <div>
              //   <button
              //     onClick={logout}
              //     className="text-center rounded-xl hover:bg-blue-800 text-white bg-blue-600 lg:px-6 md:px-4 px-4 text-xl ml-2 md:text-xl pt-1 pb-1 login"
              //   >
              //     Logout
              //   </button>
              // </div>
            )}
          </div>
          <div className="middle m-auto w-fit h-fit">
            <div
              className="nav-items md:flex flex-wrap justify-center my-6 space-x-9 hidden flex-col md:flex-row md:translate-y-0 transition-all duration-100 md:space-x-1 lg:space-x-6"
              id="navbarTop"
            >
              <NavbarLink name={`Blogs(${blogLen})`} to="/" />
              <NavbarLink name="Elibrary" to="/elibrary" />
              {(libraryAdminAccess || blogAdminAccess || userAdminAccess ) && (
                <NavbarLink name="Admin" to="/admin" />
              )}
            </div>
          </div>
        </div>
        <div className="menuDropButton w-fit mx-auto my-2 hidden md:hidden">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-black bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Menu
            <svg
              className="w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
        </div>
        {/* <hr className="bg-white h-[0.12rem] w-full" id="hrTop" /> */}
        <div
          className="search-box-mobile mx-2 lg:hidden mt-2 focus:border-0 transition-all duration-300 -translate-y-52"
          id="searchFormMobile"
        >
          <form action={`/search/${query}`}>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-md border-4 border-blue-600 text-xl text-blue-700"
              placeholder="Search"
              name="query"
              id="queryMobile"
              value={query}
              maxLength={78}
              onChange={onChange}
            />
            <button className="absolute mt-2 right-4" type="submit">
              <CiSearch className="h-6 w-6" />
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
