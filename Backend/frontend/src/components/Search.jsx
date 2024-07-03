/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import vars from "../vars";
import LibraryIcon from "../static/images/e-library.png";
import BlogIcon from "../static/images/blogger-icon-logo.png";
import BookItemSearch from "./BookItemSearch";
import loaderContext from "../context/loadingBar/loderContext";
import BlogItemSearch from "./BlogItemSearch";
import TopTitle from "./TopTitle";
import { toast } from "react-toastify";

const Search = () => {
  const loderCon = useContext(loaderContext);
  const { setProgress } = loderCon;
  const { host } = vars;
  const [books, setBooks] = useState([]);
  const [bookPage, setBookPage] = useState({});
  const [page, setPage] = useState({count: 0});
  const [posts, setPosts] = useState([]);
  const { query } = useParams();
  useEffect(() => {
    fetchResultsBlogs();
    fetchResultsBooks();
    document.title = "Search Results...!";
    // eslint-disable-next-line
  }, []);

  const fetchResultsBlogs = async () => {
    setProgress(40);
    const response = await fetch(`${host}/api/search-blogs/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const json = await response.json();
    setPosts(json.results);
    setPage(json);
    setProgress(100);
  };
  const fetchResultsBooks = async () => {
    setProgress(40);
    const response = await fetch(`${host}/api/search-books/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    const json = await response.json();
    setBookPage(json);
    setBooks(json.results);
    setProgress(100);
  };
  const bookT = () => {
    document.getElementById("blog").classList.remove("hidden");
    document.getElementById("books").classList.add("hidden");
  };
  const blogT = () => {
    document.getElementById("books").classList.remove("hidden");
    document.getElementById("blog").classList.add("hidden");
  };
  const fetchPaged = async (url) => {
    try {
      setProgress(40);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const json = await response.json();
      setPosts(json.results);
      setPage(json);
      setProgress(100);
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  const fetchPagedBooks = async (url) => {
    try {
      setProgress(40);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const json = await response.json();
      setBooks(json.results);
      setBookPage(json);
      setProgress(100);
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };

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
              Your search query: <b>&apos;{query}&apos;</b> Did not match any of
              the Posts or Books. <br />
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
        <>
          <div className="my-20">
            <div className="w-[85%] flex mx-auto justify-between mt-24 -mb-10">
              <div
                className={`book pb-2 ${
                  books.length === 0 && "hidden"
                } border-b-2 border-gray-700 hover:border-b-4 hover:border-gray-900 dark:hover:border-gray-400 dark:border-gray-600 w-full cursor-pointer flex justify-center flex-col flex-wrap items-center`}
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
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                  {posts.map((post) => {
                    return <BlogItemSearch post={post} key={post.snoPost} />;
                  })}
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    className={`px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white ${
                      page.previous ? "block" : "opacity-0"
                    } text-lg rounded-lg cursor-pointer lg:scale-125 scale-110`}
                    disabled={page.previous ? false : true}
                    onClick={() => fetchPaged(page.previous)}
                  >
                    &larr; Latest Posts
                  </button>
                  <button
                    className={`px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white ${
                      page.next ? "block" : "opacity-0"
                    } text-lg rounded-lg cursor-pointer lg:scale-125 scale-110`}
                    disabled={page.next ? false : true}
                    onClick={() => {
                      fetchPaged(page.next);
                    }}
                  >
                    Older Posts &rarr;
                  </button>
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
                  <div className="flex justify-between mt-4">
                    <button
                      className={`px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white ${
                        bookPage.previous ? "block" : "opacity-0"
                      } text-lg rounded-lg cursor-pointer lg:scale-125 scale-110`}
                      disabled={bookPage.previous ? false : true}
                      onClick={() => fetchPagedBooks(bookPage.previous)}
                    >
                      &larr; Latest Books
                    </button>
                    <button
                      className={`px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white ${
                        bookPage.next ? "block" : "opacity-0"
                      } text-lg rounded-lg cursor-pointer lg:scale-125 scale-110`}
                      disabled={bookPage.next ? false : true}
                      onClick={() => {
                        fetchPagedBooks(bookPage.next);
                      }}
                    >
                      Older Books &rarr;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Search;
