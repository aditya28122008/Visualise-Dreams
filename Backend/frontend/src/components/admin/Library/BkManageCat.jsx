/* eslint-disable react-hooks/exhaustive-deps */
// import React from 'react'
import { toast } from "react-toastify";
import vars from "../../../vars";
import loaderContext from "../../../context/loadingBar/loderContext";
import { useContext, useEffect, useState } from "react";
import userContext from "../../../context/users/userContext";
import AdminSidebar from "../../AdminSidebar";
import axios from "axios";
import { FaArrowRight, FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const BkManageCat = () => {
  const usContext = useContext(userContext);
  const lodCon = useContext(loaderContext);
  const { setProgress } = lodCon;
  const [categories, setCategories] = useState([]);
  const { blogAdminAccess, libraryAdminAccess, userAdminAccess } = usContext;
  const getAllCategories = async () => {
    setProgress(40);
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
    };
    const res = await axios.get(`${vars.host}/api/admin-crud-bk-cat/0/`, {
      headers: headers,
    });
    setCategories(res.data);
    setProgress(100);
  };
  const deleteBlog = async (category) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
      };
      //   const del = await axios.get(`${vars.host}/api/admin-crud-bk-cat/${name}/`, {
      //     headers
      //   });
      const response = await fetch(
        `${vars.host}/api/admin-crud-bk-cat/${category.sno}/`,
        {
          method: "DELETE",
          headers: headers,
        }
      );
      const json = await response.json();
      if (json.success) {
        const newCat = categories.filter((cat) => {
          return cat.sno !== category.sno;
        });
        setCategories(newCat);
        toast.success("Category Deleted");
      } else if (json.code === "p_exists") {
        toast.warn(
          `Some Books with the category: ${category.name} exists. First delete them to delete the category.`
        );
      }
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  useEffect(() => {
    getAllCategories();
    // setProgress(100)
  }, []);

  return (
    <>
      {libraryAdminAccess || blogAdminAccess || userAdminAccess ? (
        <>
          <AdminSidebar />
          <div className="main flex md:justify-end justify-center">
            <div className="right-main-content overflow-x-auto md:w-[75%]">
              {libraryAdminAccess ? (
                <>
                  <h1 className="text-4xl font-bold text-center mb-8 font-Oswald">
                    Manage Book Categories:-
                  </h1>
                  <div className="mt-12">
                    <div className="relative">
                      <Link
                        to={"/admin/add-bk-cat"}
                        className="absolute text-white px-2 py-1 bg-red-500 hover:bg-red-600 -top-10 right-0 rounded-md"
                      >
                        Add Category &rarr;
                      </Link>
                    </div>
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                              EDIT
                            </th>
                            <th scope="col" className="px-6 py-3">
                              VIEW ASSOCIATED BOOKS
                            </th>
                            <th scope="col" className="px-6 py-3">
                              REMOVE
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories.map((cat) => {
                            return (
                              <>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                  >
                                    {cat.name}
                                  </th>
                                  <td className="px-6 py-4 cursor-pointer">
                                    <Link to={`/admin/ed-bk-cat/${cat.name}`}>
                                      <FaPencilAlt className="dark:text-white text-black" />
                                    </Link>
                                  </td>
                                  <td className="px-6 py-4 cursor-pointer">
                                    <Link to={`/admin/cat-book/${cat.name}`}>
                                      <FaArrowRight className="dark:text-white text-black" />
                                    </Link>
                                  </td>
                                  <td className="px-6 py-4">
                                    <button onClick={() => deleteBlog(cat)}>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        className="dark:invert h-5 w-5 cursor-pointer"
                                      >
                                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                      </svg>
                                    </button>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <p className="text-center text-3xl">Unauthorised</p>
                </div>
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

export default BkManageCat;
