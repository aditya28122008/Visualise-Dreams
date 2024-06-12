/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import BookItem from "./BookItem";
import vars from "../vars";
import TopTitle from "./TopTitle";
import Spiner from "./Spiner";
import InfiniteScroll from "react-infinite-scroll-component";
import loaderContext from "../context/loadingBar/loderContext";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Library = () => {
  const { category } = useParams();
  const loderCon = useContext(loaderContext);
  const { setProgress } = loderCon;
  const { host } = vars;
  const [cards, setCards] = useState([]);
  const [books, setBooks] = useState({ results: [] });
  const getAllBooks = async () => {
    setProgress(40);
    try {
      const response = await fetch(`${host}/api/all-books/${category}/`);
      const json = await response.json();
      setBooks(json);
      setCards(json.results);
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
    setProgress(100);
  };
  useEffect(() => {
    document.title = "Our Library - MPS Ajmer !";
    getAllBooks();
  }, []);
  const fetchPagedBlogs = async () => {
    try {
      const response = await fetch(`${books.next}`);
      const json = await response.json();
      setBooks(json);
      const newPosts = cards.concat(json.results);
      setCards(newPosts);
      // document.documentElement.scrollTop = 0;
      // document.body.scrollTop = 0;
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  return (
    <>
      <div className="">
        <TopTitle />
        <div className="py-8">
          <div className="mt-10">
            <h1 className="text-center mt-4 md:text-6xl lg:text-8xl text-3xl font-Sevillana text-blue-700 dark:text-blue-300 italic my-4">
              {category}
            </h1>
            <div className="container w-fit mx-auto mb-6 pt-6 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-3 md:gap-4 lg:gap-6">
              {cards.map((book) => {
                return <BookItem book={book} key={book.bookSno} />;
              })}
            </div>
            <InfiniteScroll
              dataLength={cards.length}
              next={fetchPagedBlogs}
              hasMore={books.next ? true : false}
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
        </div>
      </div>
    </>
  );
};

export default Library;
