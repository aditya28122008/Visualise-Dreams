/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import userContext from "../../../context/users/userContext";
import AdminSidebar from "../../AdminSidebar";
import { useNavigate, useParams } from "react-router-dom";
import vars from "../../../vars";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { toast } from "react-toastify";
const EditUser = () => {
  const maxFileNameLength = 100;
  const usCon = useContext(userContext);
  const [groups, setGroups] = useState([]);
  const [allowedGrps, setAllowedGrps] = useState([]);
  const { blogAdminAccess, libraryAdminAccess, userAdminAccess } = usCon;
  const currUser = usCon.user;
  const { id } = useParams();
  const [userCreds, setUserCreds] = useState({});
  const getAllGroups = async (user) => {
    try {
      const res = await fetch(`${vars.host}/api/groups/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
        },
      });
      const json = await res.json();
      const userGrps = user.groups;
      const unGr = json.filter((gr) => {
        return !userGrps.includes(gr.id);
      });
      // console.log(unGr);
      const usGr = json.filter((gr) => {
        return userGrps.includes(gr.id);
      });
      setGroups(unGr);
      setAllowedGrps(usGr);
    } catch (error) {
      console.log(error);
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  const getCurrUser = async () => {
    try {
      const res = await fetch(`${vars.host}/api/admin-crud-users/${id}/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ command: "get-user" }),
      });
      const json = await res.json();
      setUserCreds(json);
      getAllGroups(json);
    } catch (error) {
      toast.error("Can't connect to the server. Please check your internet connection")
    }
  };
  useEffect(() => {
    getCurrUser();
  }, []);
  const handleChange = (e) => {
    setUserCreds({ ...userCreds, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const userFormData = new FormData();
  const handleSubmit = async () => {
    try {
      userFormData.set("username", userCreds.username);
      userFormData.set("first_name", userCreds.first_name);
      userFormData.set("last_name", userCreds.last_name);
      userFormData.set("email", userCreds.email);
      userFormData.set("nickname", userCreds.nickname);
      userFormData.set("bio", userCreds.bio);
      const grps = allowedGrps.map((grp) => {
        return parseInt(grp.id);
      });
      grps.forEach((grp) => userFormData.append("groups", grp));
      // userFormData.set("is_active", userCreds.is_active);
      const res = await fetch(`${vars.host}/api/admin-crud-users/${id}/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
        },
        body: userFormData,
      });
      const json = await res.json();
      if (json.success) {
        toast.success("User updated Succesfully");
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const allow = (grId) => {
    const perm = groups.filter((grp) => {
      return grp.id === grId;
    });
    setAllowedGrps(allowedGrps.concat(perm[0]));
    const avPerm = groups.filter((grp) => {
      return grp.id !== grId;
    });
    setGroups(avPerm);
  };
  const deny = (grId) => {
    const perm = allowedGrps.filter((grp) => {
      return grp.id === grId;
    });
    setGroups(groups.concat(perm[0]));
    const avPerm = allowedGrps.filter((grp) => {
      return grp.id !== grId;
    });
    setAllowedGrps(avPerm);
  };
  const handleProfileUpload = (e) => {
    const profileFile = e.target.files[0];
    const profileUploader = document.getElementById("profileUploader");
    if (profileFile.name.length >= maxFileNameLength) {
      profileUploader.value = "";
      toast.error(
        "Can't upload File...! Please choose an image with a bit short name"
      );
    } else {
      userFormData.set("profile", profileFile);
    }
  };
  
  const handleBannerImgUpload = (e) => {
    const bannerImg = e.target.files[0];
    const bannerImgUploader = document.getElementById("bannerUploader");
    if (bannerImg.name.length >= maxFileNameLength) {
      bannerImgUploader.value = "";
      toast.error(
        "Can't upload File...! Please choose an image with a bit short name"
      );
    } else {
      userFormData.set("bannerImg", bannerImg);
    }
    // console.log(formData.get("bannerImg"));
  };
  return (
    <>
      <>
        {libraryAdminAccess || blogAdminAccess || userAdminAccess ? (
          <>
            <AdminSidebar />
            <div className="main flex md:justify-end justify-center">
              <div className="right-main-content overflow-x-auto md:w-[75%]">
                {(userAdminAccess && currUser.id !== userCreds.id) && (
                  <>
                    <h1 className="text-4xl mb-4 text-center font-Oswald whitespace-nowrap w-fit mx-auto">
                      Can change everything...!
                    </h1>
                    <form
                      className="w-[80%] mx-auto mt-8"
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 mb-5 group w-fit mx-auto mt-3 flex flex-col justify-center items-center">
                          <img
                            src={`${vars.host}${userCreds.profile}`}
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
                            src={`${vars.host}${userCreds.bannerImg}`}
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
                            type="text"
                            name="first_name"
                            onChange={handleChange}
                            id="floating_first_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            value={userCreds.first_name}
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
                            onChange={handleChange}
                            id="floating_last_name"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                            value={userCreds.last_name}
                          />
                          <label
                            htmlFor="floating_last_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Last name
                          </label>
                        </div>
                      </div>

                      {/* <div className="relative z-0 w-full mb-5 group">
                        <input
                          id="checkbox-3"
                          type="checkbox"
                          name="is_active"
                          defaultValue={userCreds.is_active}
                          onChange={handleIsActiveChange}
                          defaultChecked={userCreds.is_active}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-3"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          is_active
                        </label>
                      </div> */}

                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          id="floating_email"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          value={userCreds.email}
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
                          name="nickname"
                          onChange={handleChange}
                          id="floating_nickname"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={userCreds.nickname}
                        />
                        <label
                          htmlFor="floating_nickname"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Pseodonym
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="username"
                          onChange={handleChange}
                          id="floating_username"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                          value={userCreds.username}
                        />
                        <label
                          htmlFor="floating_password"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Username
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <label
                          htmlFor="message"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Bio
                        </label>
                        <textarea
                          id="message"
                          name="bio"
                          onChange={handleChange}
                          rows={4}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Leave a comment..."
                          value={userCreds.bio}
                        />
                      </div>

                      <div className="relative z-0 w-full mb-5 group">
                        <p className="text-xl">Manage Permissions:</p>
                        <div className="flex md:flex-row md:justify-between md:space-x-4 md:space-y-0 space-y-2 flex-col my-4">
                          <div className="w-1/2 border border-black dark:border-white">
                            <div className="w-full bg-blue-600 text-white px-4 py-1 text-left">
                              Available Permissions
                            </div>
                            <div className="w-full p-1">
                              {groups.map((group) => {
                                return (
                                  <>
                                    <div key={group.id} className="text-gray-600 dark:text-gray-400 py-1 px-4 flex justify-between items-center">
                                      <p>{group.name}</p>
                                      <FaPlusCircle
                                        className="text-xl cursor-pointer text-green-600 dark:text-green-600"
                                        onClick={() => allow(group.id)}
                                      />
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                          </div>
                          <div className="w-1/2 border border-black dark:border-white">
                            <div className="w-full bg-blue-600 text-white px-4 py-1 text-left">
                              Provided Permissions
                            </div>
                            <div className="w-full p-1">
                              {allowedGrps.map((group) => {
                                return (
                                  <>
                                    <div key={group.id} className="text-gray-600 dark:text-gray-400 py-1 px-4 flex justify-between items-center">
                                      <p>{group.name}</p>
                                      <FaMinusCircle
                                        className="text-xl cursor-pointer text-red-600 dark:text-red-600"
                                        onClick={() => deny(group.id)}
                                      />
                                    </div>
                                  </>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Submit
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
    </>
  );
};

export default EditUser;
