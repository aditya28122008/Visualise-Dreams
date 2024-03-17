import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import vars from "../vars";
import LibraryIcon from "../static/images/e-library.png";
import BlogIcon from "../static/images/blogger-icon-logo.png";
import BookItemSearch from "./BookItemSearch";
import loaderContext from "../context/loadingBar/loderContext";
import BlogItemSearch from "./BlogItemSearch";
import TopTitle from "./TopTitle";

const Search = () => {
  const navigate = useNavigate();
  const loderCon = useContext(loaderContext);
  const { setProgress } = loderCon;
  const { host } = vars;
  const [books, setBooks] = useState([]);
  const [posts, setPosts] = useState([]);
  const time = (booksT, postsT) => {
    if (booksT.length === 0 && postsT.length === 0) {
      setTimeout(() => {
        navigate("/");
      }, 10000);
    }
  };
  useEffect(() => {
    fetchResults();
    if (query === null || query === " ") {
      document.title = "Search Results...!";
      //   time();
    } else {
      document.title = "Search Results...!";
      //   time();
    }
  }, []);

  const fetchResults = async () => {
    setProgress(40);
    const response = await fetch(`${host}/api/search/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const json = await response.json();
    setBooks(json[0].books);
    setPosts(json[0].posts);
    time(json[0].books, json[0].posts);
    setProgress(100);
  };
  const bookT = () => {
    document.getElementById("blog").classList.remove("hidden");
    document.getElementById("books").classList.add("hidden");
    console.log("bookT");
  };
  const blogT = () => {
    document.getElementById("books").classList.remove("hidden");
    document.getElementById("blog").classList.add("hidden");
    console.log("blogT");
  };
  //   document.getElementById("bookToggle").addEventListener("click");
  //   document.getElementById("blogToggle").addEventListener("click", );

  const { query } = useParams();
  return (
    <>
      <TopTitle />
      <hr className="separator mt-5 hidden dark:block -mb-5 transition-all duration-300" />
      <h1 className="text-black dark:text-white text-5xl -mb-12 mt-32 font-serif w-[85%] mx-auto">
        Search Results:
      </h1>
      {books.length === 0 && posts.length === 0 ? (
        <div>
          <div className="w-[70%] mx-auto text-black dark:text-white my-16">
            <p className="text-xl">No search results</p>
            <p className="mt-4">
              Your search query: <b>'{query}'</b> Did not match any of the Posts
              or Books. <br />
              Suggestions:
            </p>
            <ul className="list-disc">
              <li className="ml-8 dark:text-gray-400">
                Make sure that all words are spelled correctly.
              </li>
              <li className="ml-8 dark:text-gray-400">
                Try more general keywords.
              </li>
              <li className="ml-8 dark:text-gray-400"> Try fewer keywords.</li>
              <li className="ml-8 dark:text-gray-400">
                {" "}
                Try different keywords.
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="my-20">
          <div className="w-[85%] flex mx-auto justify-between mt-24 -mb-10">
            <div
              className={`book pb-2 ${
                books.length === 0 && "hidden"
              } border-b-2 border-gray-700 hover:border-b-4 hover:border-gray-900 dark:hover:border-gray-400 dark:border-gray-600 w-full cursor-pointer flex justify-center flex-col items-center`}
              id="blogToggle"
              onClick={blogT}
            >
              <button className="">
                <img src={LibraryIcon} className="h-16 w-24" alt="" />
              </button>
            </div>
            <div
              className={`blog ${
                posts.length === 0 && "hidden"
              } pb-2 border-b-2 border-gray-700 hover:border-b-4 hover:border-gray-900 dark:hover:border-gray-400 dark:border-gray-600 w-full cursor-pointer flex justify-center flex-col items-center`}
              id="bookToggle"
              onClick={bookT}
            >
              <button className="">
                <img src={BlogIcon} className="h-16 w-16" alt="" />
              </button>
            </div>
          </div>
          <div className="flex justify-center pt-6 mt-12">
            <div
              id="blog"
              className={`w-fit mx-auto transition-all duration-200 ${
                posts.length !== 0 && books.length !== 0 ? "hidden" : ""
              }`}
            >
              <div className="grid grid-cols-4 gap-4">
                {posts.map((post) => {
                  return <BlogItemSearch post={post} key={post.snoPost} />;
                })}
              </div>
            </div>
            <div
              id="books"
              className="w-fit mx-auto transition-all duration-200"
            >
              <div className="mt-10">
                <div
                  className={`container w-[100%] justify-center mx-auto mb-6 pt-6 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-3 md:gap-4 lg:gap-6 ${
                    books.length === 0 && "hidden"
                  }`}
                >
                  {books.map((book) => {
                    return <BookItemSearch book={book} key={book.bookSno} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;