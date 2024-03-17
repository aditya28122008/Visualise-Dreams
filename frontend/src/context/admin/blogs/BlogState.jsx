/* eslint-disable react/prop-types */
import blogContext from "./blogContext";
import vars from "../../../vars";
import { toast } from "react-toastify";
const BlogState = ({ children }) => {
  const conDeleteBlogById = async (id) => {
      try {
        const response = await fetch(
          `${vars.host}/api/admin-crud-blogs/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
            },
          }
        );
        const json = await response.json();
        if (json.success) {
          toast.success("Blog Deleted successfully");
          return true;
        }
        else{
            return false;
        }
      } catch (error) {
        toast.error(
          "Can't connect to the server. Please check your internet connection"
        );
        return false;
      }
  };
  return (
    <blogContext.Provider value={{conDeleteBlogById}}>
      {children}
    </blogContext.Provider>
  );
};

export default BlogState;
