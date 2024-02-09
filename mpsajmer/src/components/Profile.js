import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import alertContext from "../context/alert/alertContext";
import vars from "../vars";
import loaderContext from "../context/loadingBar/loderContext";


const Profile = () => {
  const loderCon = useContext(loaderContext);
  const {setProgress} = loderCon;
  const { username } = useParams();
  const alContext = useContext(alertContext);
  const { showAlert } = alContext;
  const [user, setUser] = useState({});
  const getUser = async () => {
    try {
      setProgress(40)
      const response = await fetch(
        `${vars.host}/api/post-user-username/${username}/`
      );
      const json = await response.json();
      setUser(json[0]);
      document.title = `Profile - ${json[0].username}`
      setProgress(100);
    } catch (error) {
      showAlert(
        "Can't connect to the server. Please check your internet connection",
        "warning"
      );
    }
  };
  useEffect(()=>{
    getUser();
  }, [])
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="rounded-lg h-full overflow-hidden" id="bannerImg">
              <img
                alt="User's Banner"
                className="object-cover object-center h-96 w-full"
                src={user.bannerImg}
              />
            </div>
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                  <img src={user.profile} alt="Profile Img Here" className="rounded-full" />
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-black dark:text-white text-lg">
                    {user.first_name} {user.last_name}
                  </h2>
                  <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4" />
                  <p className="text-base text-gray-600 dark:text-gray-400">{user.nickname}</p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p className="leading-relaxed text-lg mb-4 text-justify dark:text-gray-400">
                  {user.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
