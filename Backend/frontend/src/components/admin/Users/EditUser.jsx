/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import userContext from "../../../context/users/userContext";
import AdminSidebar from "../../AdminSidebar";
import { useParams } from "react-router-dom";
import vars from "../../../vars";
const EditUser = () => {
  const usCon = useContext(userContext);
  const { blogAdminAccess, libraryAdminAccess, userAdminAccess } = usCon;
  const { id } = useParams();
  const [userCreds, setUserCreds] = useState({});
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
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCurrUser();
  }, []);

  return (
    <>
      <>
        {libraryAdminAccess || blogAdminAccess || userAdminAccess ? (
          <>
            <AdminSidebar />
            <div className="main flex md:justify-end justify-center">
              <div className="right-main-content overflow-x-auto md:w-[75%]">
                {userAdminAccess && <>{userCreds.first_name} {userCreds.last_name}</>}
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
