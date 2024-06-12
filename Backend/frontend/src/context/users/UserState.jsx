import { useState } from "react";
import UserContext from "./userContext";
import vars from "../../vars";
import {toast} from 'react-toastify'
// eslint-disable-next-line react/prop-types
const UserState = ({children}) => {
  const [user, setUser] = useState({});
  const [authenticated, setAuthenticated] = useState(null);
  const [blogAdminAccess, setBlogAdminAccess] = useState(false);
  const [libraryAdminAccess, setLibraryAdminAccess] = useState(false);
  const checkGroups = async (juser) => {
    if (juser.is_superuser) {
      setBlogAdminAccess(true);
      setLibraryAdminAccess(true);
    } else {
      juser.groups.map(async (group) => {
        const response = await fetch(`${vars.host}/api/group-name/${group}/`);
        const json = await response.json();
        if ("Blogs" === json[0].name) {
          setBlogAdminAccess(true);
        } else if ("Elibrary" === json[0].name) {
          setLibraryAdminAccess(true);
        }
      });
    }
  };
  const fetchUser = async () => {
    try {
      if (localStorage.getItem("MPSUser")) {
        const response = await fetch(`${vars.host}/api/user-data/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
          },
        });
        const json = await response.json();
        if (json.code === "token_not_valid" || json.code === "user_inactive" || json.code === "user_not_found") {
          localStorage.removeItem("MPSUser");
          setAuthenticated(false);
        } else {
          setUser(json);
          setAuthenticated(true);
          checkGroups(json);
        }
      } else {
        setAuthenticated(false);
        setBlogAdminAccess(false);
        setLibraryAdminAccess(false);
      }
    } catch (error) {
      toast.error("Can't connect to the server. Please check your internet connection")
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        fetchUser,
        authenticated,
        blogAdminAccess,
        libraryAdminAccess,
        checkGroups,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
