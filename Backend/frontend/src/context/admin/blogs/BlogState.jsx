/* eslint-disable react/prop-types */
import blogContext from "./blogContext";
import vars from "../../../vars";
import { toast } from "react-toastify";
const BlogState = ({ children }) => {
  const conDeleteBlogById = async (id) => {
    try {
      const response = await fetch(`${vars.host}/api/admin-crud-blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
        },
      });
      const json = await response.json();
      if (json.success) {
        toast.success("Blog Deleted successfully");
        return true;
      } else {
        return false;
      }
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
      return false;
    }
  };
  const conGetBlogs = async () => {
    try {
      const response = await fetch(`${vars.host}/api/a-post-admin/`);
      let json = await response.json();
      return {json, success: true};
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
      return {success: false}
    }
    // setProgress(100);
  };
  return (
    <blogContext.Provider value={{ conDeleteBlogById, conGetBlogs }}>
      {children}
    </blogContext.Provider>
  );
};

export default BlogState;
