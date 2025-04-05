/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
import loaderContext from "../../context/loadingBar/loderContext";
import axios from "axios";
import vars from "../../vars";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import userContext from "../../context/users/userContext";
import AdminSidebar from "../AdminSidebar";

const EditBlogCategory = () => {
  const navigate = useNavigate();
  const usCon = useContext(userContext);
  const { blogAdminAccess, libraryAdminAccess, userAdminAccess } = usCon;
  const { name } = useParams();
  const loadCon = useContext(loaderContext);
  const { setProgress } = loadCon;
  const [catCreds, setCatCreds] = useState({});
  const fetchCat = async () => {
    setProgress(50);
    const creds = await axios.get(
      `${vars.host}/api/get-sp-bl-cat/${name.toString()}/`
    );
    setCatCreds(creds.data);
    setProgress(100);
  };
  const onChange = (e) => {
    setCatCreds({ ...catCreds, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    fetchCat();
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
      const up = await axios.put(
        `${vars.host}/api/upda-sp-bl-cat/${name}/`,
        catFormData,
        { headers }
      );
      if (up.data.success) {
        navigate(-1);
      }
    } catch (error) {
      if (error.response.status === 409) {
        toast.error("Another category with same name already exists...!");
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
              {blogAdminAccess && (
                <>
                  <div className="text-xl text-center mb-4 font-bold md:text-4xl">
                    Edit Blog Category: {name}
                  </div>
                  <form className="max-w-sm mx-auto" onSubmit={(e) => onSubmit(e)}>
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
                      Update
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
export default EditBlogCategory;
