/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import loaderContext from "../../../context/loadingBar/loderContext";
import axios from "axios";
import vars from "../../../vars";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminSidebar from "../../AdminSidebar";
import userContext from "../../../context/users/userContext";

const AddBookCategory = () => {
  const usCon = useContext(userContext);
  const { libraryAdminAccess, blogAdminAccess, userAdminAccess } = usCon;
  const navigate = useNavigate();
  const loadCon = useContext(loaderContext);
  const { setProgress } = loadCon;
  const [catCreds, setCatCreds] = useState({});
  const onChange = (e) => {
    setCatCreds({ ...catCreds, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setProgress(100);
    document.title = 'Admin | MPS Ajmer'
  }, []);
  const catFormData = new FormData();
  const onSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
    };
    try {
      catFormData.set("name", catCreds.name);
      const up = await axios.post(
        `${vars.host}/api/admin-crud-bk-cat/0/`,
        catFormData,
        { headers: headers }
      );
      if (up.data.success) {
        navigate(-1);
      } else {
        toast.error("The Category Already Exists...!");
      }
    } catch (error) {
      if (error.response.status === 409) {
        toast.error("The category already exists...!");
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
                  <form
                    className="max-w-sm mx-auto"
                    onSubmit={(e) => onSubmit(e)}
                  >
                    <div className="mb-5">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Category Name
                      </label>
                      <input
                        type="text"
                        value={catCreds.name}
                        onChange={onChange}
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Name Of The Category"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add Category
                    </button>
                  </form>
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
export default AddBookCategory;