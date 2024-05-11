import { useEffect, useState, useContext } from "react";
import alertContext from "../context/alert/alertContext";
import BookItem from "./BookItem";
import vars from "../vars";
import TopTitle from "./TopTitle";
import loaderContext from "../context/loadingBar/loderContext";
import {toast} from 'react-toastify'
const Library = () => {
  const loderCon = useContext(loaderContext);
  const { setProgress } = loderCon;
  const alContext = useContext(alertContext);
  const { showAlert } = alContext;
  const { host } = vars;
  const [books, setBooks] = useState([]);
  const getAllBooks = async () => {
    setProgress(40);
    try {
      const response = await fetch(`${host}/api/all-books/`);
      const json = await response.json();
      setBooks(json);
    } catch (error) {
      toast.error("Can't connect to the server. Please check your internet connection")
    }
    setProgress(100);
  };
  useEffect(() => {
    document.title = "Our Library - MPS Ajmer !";
    getAllBooks();
  }, []);
  return (
    <>
      <div className="">
        <TopTitle />
        <div className="py-8">
          <hr className="separator mt-5 hidden dark:block -mb-5 transition-all duration-300" />
          <div className="mt-10">
            <h1 className="text-center mt-4 md:text-6xl lg:text-8xl text-3xl font-Sevillana text-blue-700 dark:text-blue-300 italic my-4">
              Our E - Library
            </h1>
            <div className="container w-fit mx-auto mb-6 pt-6 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-3 md:gap-4 lg:gap-6">
              {books.map((book) => {
                return <BookItem book={book} key={book.bookSno} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Library;
