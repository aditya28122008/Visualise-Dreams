/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import userContext from "../../../context/users/userContext";
import AdminSidebar from "../../AdminSidebar";
import vars from "../../../vars";
import { toast } from "react-toastify";
import loaderContext from "../../../context/loadingBar/loderContext";
import { useNavigate } from "react-router-dom";
const AddUser = () => {
  useEffect(() => {
    document.title = 'Admin | MPS Ajmer'
  }, [])
  
  const loadCon = useContext(loaderContext)
  const {setProgress} = loadCon
  const navigate = useNavigate()
  const usCon = useContext(userContext);
  const { blogAdminAccess, libraryAdminAccess, userAdminAccess } = usCon;
  const [userCreds, setUserCreds] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: ""
  });
  const handleChange = (e) => {
    setUserCreds({ ...userCreds, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    const userFormData = new FormData();
    try {
      for (const key in userCreds) {
        userFormData.set(key, userCreds[key]);
      }
      userFormData.set("password", "____")
      setProgress(40)
      const res = await fetch(`${vars.host}/api/admin-crud-users/0/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
        },
        body: userFormData
      });
      const json = await res.json();
      
      // console.log(json);
      if(json.success){
        toast.success("User Added Successfully")
        navigate(-1)
      }
      if(!json.success){
        if(json.code === "em_taken"){
          toast.warning("Email already in use")
        }
        if(json.code === "us_taken"){
          toast.warning("Username already in use")
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {libraryAdminAccess || blogAdminAccess || userAdminAccess ? (
        <>
          <AdminSidebar />
          <div className="main flex md:justify-end justify-center">
            <div className="right-main-content overflow-x-auto md:w-[75%]">
              {userAdminAccess && (
                <div className="shadow-md rounded-md shadow-blue-600 dark:shadow-blue-400 my-4 py-2 w-[80%] mx-auto">
                  <h1 className="text-3xl text-center font-Kalnia font-bold mb-6 text-blue-600 dark:text-blue-400">
                    Add New Family Member...!
                  </h1>
                  <form className="mx-auto w-[80%]" onSubmit={handleSubmit}>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="email"
                        name="email"
                        id="floating_email"
                        value={userCreds.email}
                        onChange={handleChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="floating_email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Email address
                      </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                      <input
                        type="text"
                        name="username"
                        id="floating_username"
                        value={userCreds.username}
                        onChange={handleChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                      />
                      <label
                        htmlFor="floating_username"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Username
                      </label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="first_name"
                          value={userCreds.first_name}
                          onChange={handleChange}
                          id="floating_first_name"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required=""
                        />
                        <label
                          htmlFor="floating_first_name"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          First name
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="last_name"
                          value={userCreds.last_name}
                          onChange={handleChange}
                          id="floating_last_name"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required=""
                        />
                        <label
                          htmlFor="floating_last_name"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Last name
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Submit
                    </button>
                  </form>
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

export default AddUser;
