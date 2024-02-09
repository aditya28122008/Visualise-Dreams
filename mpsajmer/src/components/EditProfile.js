import React, { useState, useContext, useEffect } from "react";
import alertContext from "../context/alert/alertContext";
import { useNavigate } from "react-router-dom";
import vars from "../vars";
import loaderContext from "../context/loadingBar/loderContext";


const EditProfile = () => {
  const loderCon = useContext(loaderContext);
  const {setProgress} = loderCon;
  const navigate = useNavigate();
  const alContext = useContext(alertContext);
  const maxFileNameLength = 100;
  const { showAlert } = alContext;
  const [user, setUser] = useState({
    email: "",
    nickname: "",
    username: "",
    profile: "",
    bannerImg: "",
  });
  const [formData, setFormData] = useState(new FormData());
  const [userBio, setUserBio] = useState("");
  const getUserData = async () => {
    if (localStorage.getItem("MPSUser")) {
      setProgress(40)
      try {
        const response = await fetch(`${vars.host}/api/user-data/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
          },
        });
        const json = await response.json();
        document.title = `Edit Profile - ${json.username}`;
        setUser({
          email: json.email,
          nickname: json.nickname,
          username: json.username,
          profile: json.profile,
          bannerImg: json.bannerImg,
        });
        setUserBio(json.bio);
      } catch (error) {
        showAlert(
          "Can't connect to the server. Please check your internet connection",
          "warning"
        );
      }
      setProgress(100)
    } else {
      navigate("/login");
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setProgress(40)
      formData.set("email", user.email);
      formData.set("nickname", user.nickname);
      formData.set("bio", userBio);
      await fetch(`${vars.host}/api/ed-prof/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
        },
        body: formData,
      });
      setProgress(100);
      showAlert(
        `Profile Updated Successfully...! It would take sometime to show everywhere.`,
        "success"
      );
      navigate(`/profile/${user.username}`);
    } catch (error) {
      showAlert(
        `Can't connect to the server. Please check your internet connection`,
        "warning"
      );
    }
  };
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const userBioChange = (event) => {
    setUserBio(event.target.value);
  };

  const handleProfileUpload = (e) => {
    const profileFile = e.target.files[0];
    const profileUploader = document.getElementById('profileUploader')
    if (profileFile.name.length >= maxFileNameLength) {
      profileUploader.value = ''
      showAlert(
        "Can't upload File...! Please choose a file with a bit short name",
        "warning"
        );
      } else {
        formData.set("profile", profileFile);
    }
  };

  const handleBannerImgUpload = (e) => {
    const bannerImg = e.target.files[0];
    const bannerImgUploader = document.getElementById('bannerUploader')
    if (bannerImg.name.length >= maxFileNameLength) {
      bannerImgUploader.value = ''
      showAlert(
        "Can't upload File...! Please choose a file with a bit short name",
        "warning"
      );
    } else {
      formData.set("bannerImg", bannerImg);
    }
    // console.log(formData.get("bannerImg"));
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <h1 className="text-black dark:text-white md:text-5xl text-3xl mb-8 w-fit mx-auto whitespace-nowrap font-serif">
        Update Your Profile
      </h1>
      <form className="mx-auto w-[75%]" onSubmit={onSubmit}>
        <div className="relative z-0 mb-5 group w-fit mx-auto mt-3 flex flex-col justify-center items-center">
          <img
            src={`${vars.host}${user.profile}`}
            alt=""
            className="my-2 md:h-24 md:w-24 h-14 w-14 mx-auto rounded-full"
          />

          <div className="w-fit mx-auto">
            <label
              className="block w-fit mx-auto mb-1 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="profileUploader"
            >
              Change Current Profile Picture
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="profileUploader"
              type="file"
              onChange={handleProfileUpload}
              accept=".png, .jpg, .jpeg, .svg"
            />
          </div>
        </div>
        <div className="relative z-0 mb-5 group w-fit mx-auto my-3">
          <img
            src={`${vars.host}${user.bannerImg}`}
            alt=""
            className="my-2 md:h-44 h-24 w-full rounded-lg object-cover object-center"
          />

          <div className="w-fit mx-auto">
            <label
              className="block w-fit mx-auto mb-1 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="bannerUploader"
            >
              Change Current Banner Image
            </label>
            <input
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="bannerUploader"
              type="file"
              onChange={handleBannerImgUpload}
              accept=".png, .jpg, .jpeg, .svg"
            />
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={user.email}
            required
            onChange={onChange}
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="nickname"
            id="nickname"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={user.nickname}
            onChange={onChange}
          />
          <label
            htmlFor="nickname"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Nickname
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="bio"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Bio
          </label>
          <textarea
            id="bio"
            value={userBio}
            rows={10}
            onChange={userBioChange}
            placeholder="Enter Your Bio Here"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
          />
        </div>

        <button
          type="submit"
          className="text-white  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full lg:w-auto my-4 px-5 py-2.5 text-center bg-purple-600 hover:bg-purple-700 focus:ring-purple-800"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
