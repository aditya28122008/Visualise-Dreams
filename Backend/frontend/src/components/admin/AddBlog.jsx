import { useContext, useEffect, useState, useRef } from "react";
import loaderContext from "../../context/loadingBar/loderContext";
import userContext from "../../context/users/userContext";
import AdminSidebar from "../AdminSidebar";
import { FaPencilAlt } from "react-icons/fa";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import vars from "../../vars";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const navigate = useNavigate();
  const maxFileNameLength = 100;
  const fileUploaderRef = useRef(null);
  const editorRef = useRef(null);
  const blogFormData = new FormData();
  const [blogCreds, setBlogCreds] = useState({
    title: "",
    tagline: "",
    username: "",
    by_admin: false,
  });
  const [blImg, setBlImg] = useState(null);
  const usContext = useContext(userContext);
  const { blogAdminAccess, libraryAdminAccess } = usContext;
  const lodCon = useContext(loaderContext);
  const { setProgress } = lodCon;
  const handleFileUpload = (e) => {
    const blogImage = e.target.files[0];
    const fileUploader = fileUploaderRef.current;
    if (blogImage.name.length >= maxFileNameLength) {
      fileUploader.value = "";
      toast.error(
        "Can't upload File...! Please choose an image with a bit short name"
      );
    } else {
      setBlImg(blogImage);
    }
  };
  const getAuthorByUsername = async (username) => {
    let json;
    try {
      const response = await fetch(
        `${vars.host}/api/get-user-by-username/${username}/`
      );
      json = await response.json();
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
    return json;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    const newContent = await editorRef.current.getContent();
    await blogFormData.set("title", blogCreds.title);
    await blogFormData.set("tagline", blogCreds.tagline);
    await blogFormData.set("content", newContent);
    await blogFormData.set("by_admin", blogCreds.by_admin);
    await blogFormData.set("image", blImg);
    if (!blogCreds.by_admin) {
      const author = await getAuthorByUsername(blogCreds.username);
      if (!author.detail) {
        await blogFormData.set("author", author.id);
        try {
          const response = await fetch(`${vars.host}/api/admin-crud-blogs/0`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
            },
            body: blogFormData,
          });
          const json = await response.json();
          console.log(json);
          if (json.success) {
            navigate("/admin/a-posts");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        toast.error(
          `The user with username: ${blogCreds.username} doesn't exists`
        );
      }
    } else {
      try {
        const response = await fetch(`${vars.host}/api/admin-crud-blogs/0`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
          },
          body: blogFormData,
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
          navigate("/admin/a-posts");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onChange = (e) => {
    setBlogCreds({ ...blogCreds, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    document.title = "MPS Ajmer - Administration";
    setProgress(100);
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {libraryAdminAccess || blogAdminAccess ? (
        <>
          <AdminSidebar />
          <div className="main flex md:justify-end justify-center">
            <div className="right-main-content overflow-x-auto md:w-[75%]">
              {blogAdminAccess && (
                <>
                  <h1 className="text-4xl mb-4 text-center whitespace-nowrap w-fit mx-auto">
                    Add a blog post
                    <FaPencilAlt className="inline mx-2 dark:text-white text-gray-700" />
                  </h1>
                  <div>
                    <form
                      className="w-[100%] md:w-[90%] mx-auto"
                      onSubmit={handleSubmit}
                    >
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="title"
                          id="title"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          value={blogCreds.title}
                          onChange={onChange}
                          required
                        />
                        <label
                          htmlFor="title"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Title
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <input
                          type="text"
                          name="tagline"
                          onChange={onChange}
                          value={blogCreds.tagline}
                          id="tagline"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder=" "
                          required
                        />
                        <label
                          htmlFor="tagline"
                          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Tagline
                        </label>
                      </div>
                      <div className="relative z-0 w-full mb-5 group">
                        <Editor
                          onInit={(evt, editor) => (editorRef.current = editor)}
                          apiKey={`${vars.tinyAPIKey}`}
                          init={{
                            plugins:
                              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker markdown",
                            toolbar:
                              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                          }}
                          initialValue={""}
                        />
                      </div>

                      <div className="relative z-0 w-full mb-5 group">
                        <>
                          <label
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            htmlFor="file_input"
                          >
                            Upload Blog&apos;s Image
                          </label>
                          <input
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            aria-describedby="file_input_help"
                            id="file_input"
                            type="file"
                            onChange={handleFileUpload}
                            ref={fileUploaderRef}
                            required
                          />
                          <p
                            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                            id="file_input_help"
                          >
                            An image related to your blog content will be
                            displayed on the blog card.
                          </p>
                        </>
                      </div>
                      {!blogCreds.by_admin && (
                        <div className="relative z-0 w-full mb-5 group">
                          <input
                            type="text"
                            name="username"
                            onChange={onChange}
                            value={blogCreds.username}
                            id="username"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                          />
                          <label
                            htmlFor="username"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                          >
                            Author&apos;s username
                          </label>
                        </div>
                      )}
                      <div className="relative z-0 w-full mb-5 group">
                        <label className="inline-flex items-center mb-5 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultValue={blogCreds.by_admin}
                            onClick={() => {
                              if (!blogCreds.by_admin) {
                                setBlogCreds({ ...blogCreds, by_admin: true });
                              } else {
                                setBlogCreds({ ...blogCreds, by_admin: false });
                              }
                            }}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            By Admin
                          </span>
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Upload
                      </button>
                    </form>
                  </div>
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
  );
};

export default AddBlog;
