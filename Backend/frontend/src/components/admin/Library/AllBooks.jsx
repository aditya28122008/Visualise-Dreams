/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";
import userContext from "../../../context/users/userContext";
import AdminSidebar from "../../AdminSidebar";
import loaderContext from "../../../context/loadingBar/loderContext";
import axios from "axios";
import vars from "../../../vars";
import { IoBookSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import Spiner from "../../Spiner";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const AllBooks = () => {
  const deleteBook = async (id) => {
    try {
      if (window.confirm("Are You Sure Want to Delete?")) {
        const headers = {
          Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
        };
        const response = await fetch(
          `${vars.host}/api/admin-crud-books/${id}/`,
          {
            method: "DELETE",
            headers: headers,
          }
        );
        const json = await response.json();
        if (json.success) {
          const newBooks = books.filter((p) => {
            return p.bookSno !== id;
          });
          setBooks(newBooks);
        }
        toast.success("Book Deleted Successfully");
      }
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  const usCon = useContext(userContext);
  const { libraryAdminAccess, blogAdminAccess, userAdminAccess } = usCon;
  const loadCon = useContext(loaderContext);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState({ count: 0 });
  const { setProgress } = loadCon;
  const getPagedBooks = async () => {
    console.log("Working");

    try {
      const res = await axios.get(`${page.next}`);
      setPage(res.data);
      setBooks(books.concat(res.data.results));
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  const getAllBooks = async () => {
    try {
      const res = await axios.get(`${vars.host}/api/admin-all-books/`);
      setPage(res.data);
      setBooks(res.data.results);
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
    setProgress(100);
  };

  useEffect(() => {
    getAllBooks();
    document.title = 'Admin | MPS Ajmer'
  }, []);

  return (
    <>
      <>
        {libraryAdminAccess || blogAdminAccess || userAdminAccess ? (
          <>
            <AdminSidebar />
            <div className="main flex md:justify-end justify-center">
              <div className="right-main-content overflow-x-auto md:w-[75%]">
                {libraryAdminAccess && (
                  <>
                    <h1 className="text-4xl mb-4 text-center whitespace-nowrap w-fit mx-auto">
                      Manage The Elibrary
                      <IoBookSharp className="inline text-black dark:invert mx-2" />
                    </h1>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Sno
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Book Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Author
                            </th>
                            <th scope="col" className="px-6 py-3">
                              View
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Edit
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Delete Book
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {books.map((book) => {
                            return (
                              <>
                                <tr
                                  key={book.bookSno}
                                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                  >
                                    {book.bookSno}
                                  </th>
                                  <td className="px-6 py-4">{book.bookName}</td>
                                  <td className="px-6 py-4">{book.author}</td>
                                  <td className="px-6 py-4">
                                    <Link
                                      to={`/book-read/${book.bookSno}`}
                                      className="text-xl"
                                    >
                                      <FaEye />
                                    </Link>
                                  </td>
                                  <td className="px-6 py-4">
                                    <Link
                                      to={`/admin/eb/edit/${book.bookSno}`}
                                      className="text-xl"
                                    >
                                      <FaPencilAlt />
                                    </Link>
                                  </td>
                                  <td className="px-6 py-4">
                                    <MdDelete
                                      className="text-xl cursor-pointer"
                                      onClick={() => deleteBook(book.bookSno)}
                                    />
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                      <InfiniteScroll
                        dataLength={books.length}
                        next={getPagedBooks}
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
                      {books.length !== page.count ? (
                      <>
                        <div className="flex justify-center items-center">
                          <button
                            className="w-fit mx-auto bg-red-600 px-2 py-1 rounded-md hover:bg-red-700"
                            onClick={() => getPagedBooks()}
                          >
                            Show More
                          </button>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
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
    </>
  );
};

export default AllBooks;
