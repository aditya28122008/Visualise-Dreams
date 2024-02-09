import React, { useState, useEffect, useContext } from "react";
import vars from "../vars";
import { useNavigate } from "react-router-dom";
import alertContext from "../context/alert/alertContext";
import userContext from "../context/users/userContext";
import loaderContext from "../context/loadingBar/loderContext";

const Login = (props) => {
  const loderCon = useContext(loaderContext);
  const { setProgress } = loderCon;
  const alContext = useContext(alertContext);
  const { showAlert } = alContext;
  const context = useContext(userContext);
  const { fetchUser, checkGroups } = context;
  const checkAuthenticated = () => {
    if (localStorage.getItem("MPSUser")) {
      navigate("/");
    }
  };
  useEffect(() => {
    document.title = "Login To MPS Ajmer !";
    checkAuthenticated();
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 100);
  }, []);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { host } = vars;
  const navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setProgress(40);
      const response = await fetch(`${host}/api/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });
      const json = await response.json();
      console.log(json);
      if (json.access) {
        localStorage.setItem("MPSUser", `${json.access}`);
        fetchUser();
        showAlert("Successfully Logged In", "success");
        const userData = await fetch(`${vars.host}/api/user-data/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${json.access}`,
          },
        });
        const userJson = await userData.json();
        // fetchUser()
        navigate(`/profile/${userJson.username}`);
      } else {
        showAlert("Invalid Credentials", "warning");
      }
      setProgress(100);
    } catch (error) {
      showAlert(
        `Can't connect to the server. Please check your internet connection`,
        "warning"
      );
    }
  };
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-0">
          <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src={props.logo} alt="logo" />
            {props.title}
          </div>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={credentials.username}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={credentials.password}
                    onChange={onChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start"></div>
                  {/* <div
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Forgot password?
                  </div> */}
                </div>
                <button
                  type="submit"
                  disabled={
                    credentials.username === "" || credentials.password === ""
                  }
                  className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-800"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
