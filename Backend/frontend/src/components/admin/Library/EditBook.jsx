/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import vars from "../../../vars";
import { toast } from "react-toastify";
import userContext from "../../../context/users/userContext";
import { FaPencilAlt } from "react-icons/fa";
import AdminSidebar from "../../AdminSidebar";
import loaderContext from "../../../context/loadingBar/loderContext";

const EditBook = () => {
  const navigate = useNavigate();
  const loadCon = useContext(loaderContext);
  const { setProgress } = loadCon;
  const usCon = useContext(userContext);
  const { libraryAdminAccess, blogAdminAccess, userAdminAccess } = usCon;
  const { bookSno } = useParams();
  const maxFileNameLength = 100;
  const categoryRef = useRef(null);
  const fileUploaderRef = useRef(null);
  const bookFormData = new FormData();
  const pdfUploaderRef = useRef(null);
  const [bookCreds, setBookCreds] = useState({});
  const [categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    try {
      const response = await fetch(`${vars.host}/api/get-all-bk-categories/`);
      const json = await response.json();
      // console.log(json);
      setCategories(json);
      // console.log(json);
    } catch (error) {
      // console.log(error);
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  const handleImageFileUpload = (e) => {
    const blogImage = e.target.files[0];
    const fileUploader = fileUploaderRef.current;
    if (blogImage.name.length >= maxFileNameLength) {
      fileUploader.value = "";
      toast.error(
        "Can't upload File...! Please choose an image with a bit short name"
      );
    } else {
      bookFormData.set("bookCover", blogImage);
    }
  };
  const handlePDFFileUpload = (e) => {
    const blogImage = e.target.files[0];
    const fileUploader = pdfUploaderRef.current;
    if (blogImage.name.length >= maxFileNameLength) {
      fileUploader.value = "";
      toast.error(
        "Can't upload File...! Please choose an image with a bit short name"
      );
    } else {
      bookFormData.set("bookPDF", blogImage);
    }
  };
  const getCurrBook = async () => {
    setProgress(40);
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
        "Content-Type": "multipart/form-data",
      };
      const res = await axios.get(
        `${vars.host}/api/admin-crud-books/${bookSno}/`,
        {
          headers: headers,
        }
      );
      if (res.data.success) {
        setBookCreds(res.data.payload);
      }
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
    setProgress(100);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setBookCreds((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    getCurrBook();
    getAllCategories();
    document.title = 'Admin | MPS Ajmer'
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      bookFormData.set("author", bookCreds.author);
      bookFormData.set("bookName", bookCreds.bookName);
      bookFormData.set("category", bookCreds.category);

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
        "Content-Type": "multipart/form-data",
      };

      const res = await axios.put(
        `${vars.host}/api/admin-crud-books/${bookSno}/`,
        bookFormData,
        { headers: headers }
      );

      if (res.data.success) {
        toast.success("Book Updated Successfully...!");
        navigate("/admin/eb/all-bk");
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.warn("Please Choose A Valid Category");
      } else {
        toast.error(
          "Can't connect to the server. Please check your internet connection"
        );
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
              {libraryAdminAccess && (
                <>
                  <h1 className="text-4xl mb-4 text-center whitespace-nowrap w-fit mx-auto">
                    Edit Book
                    <FaPencilAlt className="inline mx-4 dark:text-red-500 text-gray-700" />
                  </h1>
                  <div>
                    <form
                      className="w-[100%] md:w-[90%] mx-auto"
                      onSubmit={handleSubmit}
                    >
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="bookName"
                          id="bookName"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={bookCreds.bookName}
                          onChange={onChange}
                          minLength={4}
                        />
                        <label
                          htmlFor="bookName"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Book&apos;s Name
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="author"
                          id="title"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={bookCreds.author}
                          onChange={onChange}
                          minLength={8}
                        />
                        <label
                          htmlFor="title"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Author
                        </label>
                      </div>

                      <div className="relative z-0 w-full mb-5 group">
                        <>
                          <select
                            ref={categoryRef}
                            id="countries"
                            name="category" // Add this line to bind the select value to the state
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={onChange} // Ensure correct function name
                            value={bookCreds.category}
                          >
                            {categories.map((cat) => {
                              return (
                                <option key={cat.sno} value={cat.sno}>
                                  {cat.name}
                                </option>
                              );
                            })}
                          </select>
                          <label
                            htmlFor="countries"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            The category can be changed from here.
                          </label>
                        </>
                      </div>
                      <div className="w-[10rem] mx-auto mb-4">
                        <img
                          src={`${vars.host}${bookCreds.bookCover}`}
                          alt=""
                        />
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <>
                          <input
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="file_input_help"
                            id="file_input"
                            accept=".jpg, .jpeg, .png, .svg, .webp, .bmp"
                            type="file"
                            onChange={handleImageFileUpload}
                            ref={fileUploaderRef}
                          />
                          <p
                            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                            id="file_input_help"
                          >
                            You can Change the current image
                          </p>
                        </>
                      </div>
                      <div className="text-blue-600 hover:text-blue-400 hover:underline text-center">
                        <Link
                          to={`/book-read/${bookCreds.bookSno}`}
                        >
                          View Current Book PDF
                        </Link>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <>
                          <input
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            id="file_input"
                            accept=".pdf"
                            type="file"
                            onChange={handlePDFFileUpload}
                            ref={fileUploaderRef}
                          />
                        </>
                      </div>

                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Update
                      </button>
                    </form>
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

export default EditBook;
