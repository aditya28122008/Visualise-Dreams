/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, useContext } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CiPen } from "react-icons/ci";
import vars from "../vars";
import loaderContext from "../context/loadingBar/loderContext";

const AddBlogStudent = () => {
  const lodCon = useContext(loaderContext);
  const { setProgress } = lodCon;
  const blogFormData = new FormData();
  const maxFileNameLength = 100;
  const fileUploaderRef = useRef(null);
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const [blogCreds, setBlogCreds] = useState({
    title: "",
    tagline: "",
    username: "",
    by_admin: false,
  });
  const [blImg, setBlImg] = useState(null);
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
  const [categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    try {
      const response = await fetch(`${vars.host}/api/get-all-categories/`);
      const json = await response.json();
      // console.log(json);
      setCategories(json);
      blogFormData.set("category", json[0].sno);
      // console.log(json);
    } catch (error) {
      // console.log(error);
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  const categoryRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (categoryRef.current.value === "-- Please Select A Valid Category --" || categoryRef.current.value === "-- NO CATEGORIES AVAILABLE --") {
      toast.error("Please choose a valid category....!");
      // console.log(categoryRef.current.value);
    } else {
      const newContent = await applyClasses(editorRef.current.getContent());
      await blogFormData.set("title", blogCreds.title);
      await blogFormData.set("tagline", blogCreds.tagline);
      await blogFormData.set("content", newContent);
      await blogFormData.set("image", blImg);
      await blogFormData.set("category", blogCreds.category);
      try {
        const response = await fetch(`${vars.host}/api/student-crud-blogs/0/`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("MPSUser")}`,
          },
          body: blogFormData,
        });
        const json = await response.json();
        if (json.success) {
          navigate("/u-admin");
        }
      } catch (error) {
        toast.error(
          "Can't connect to the server. Please check your internet connection"
        );
      }
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setBlogCreds((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const chooseCategory = (sno) => {
    if (blogFormData.has("category")) {
      blogFormData.delete("category");
    }
    blogFormData.set("category", sno);
    // console.log(sno);
  };
  useEffect(() => {
    document.title = "Express Your Ideas";
    getAllCategories();
    setProgress(100);
  }, []);
  const applyClasses = async (cont) => {
    const parser = new DOMParser();
    let doc = parser.parseFromString(cont, "text/html");
    let links = doc.querySelectorAll("a");
    links.forEach((l) => {
      l.classList = "";
      l.classList.add("underline");
      l.classList.add("underline-offset-2");
      l.classList.add("text-blue-500");
      l.classList.add("cursor-pointer");
      l.classList.add("hover:text-blue-300");
    });
    let HOne = doc.querySelectorAll("h1");
    HOne.forEach((h) => {
      h.classList = "";
      h.classList.add("text-4xl");
      h.classList.add("font-bold");
    });
    let HTwo = doc.querySelectorAll("h2");
    HTwo.forEach((h) => {
      h.classList = "";
      h.classList.add("text-3xl");
      h.classList.add("font-bold");
    });
    let HThree = doc.querySelectorAll("h3");
    HThree.forEach((h) => {
      h.classList = "";
      h.classList.add("text-2xl");
      h.classList.add("font-bold");
    });
    let Hfour = doc.querySelectorAll("h4");
    Hfour.forEach((h) => {
      h.classList = "";
      h.classList.add("text-xl");
      h.classList.add("font-bold");
    });
    let Hfive = doc.querySelectorAll("h5");
    Hfive.forEach((h) => {
      h.classList = "";
      h.classList.add("text-lg");
      h.classList.add("font-bold");
    });
    let Hsix = doc.querySelectorAll("h6");
    Hsix.forEach((h) => {
      h.classList = "";
      h.classList.add("text-base");
      h.classList.add("font-bold");
    });
    let PRE = doc.querySelectorAll("pre");
    PRE.forEach((h) => {
      h.classList = "";
      h.classList.add("text-lg");
    });
    let modifiedContent = doc.body.innerHTML;
    return modifiedContent;
  };
  return (
    <div>
      <div className="main flex justify-center">
        <div className="right-main-content overflow-x-auto md:w-[75%]">
          <>
            <h1 className="lg:text-8xl md:text-6xl text-4xl  mb-4 text-center font-Caveat font-bold leading-normal w-fit mx-auto">
              Visualise Your Dreams
              <CiPen className="inline mx-4 dark:text-white text-6xl text-gray-700 font-bold" />
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
                      htmlFor="countries"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Please choose a Category
                    </label>
                    <select
                      ref={categoryRef}
                      id="countries"
                      name="category" // Add this line to bind the select value to the state
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={onChange} // Ensure correct function name
                      value={blogCreds.category}
                    >
                      {categories.length > 0 ? (
                        <>
                          <option>-- Please Select A Valid Category --</option>
                          {categories.map((cat) => {
                            return (
                              <option key={cat.sno} value={cat.sno}>
                                {cat.name}
                              </option>
                            );
                          })}
                        </>
                      ) : (
                        <>
                          <option>-- NO CATEGORIES AVAILABLE --</option>
                        </>
                      )}
                    </select>
                  </>
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
                      accept=".jpg, .jpeg, .png, .svg, .webp, .bmp"
                      type="file"
                      onChange={handleFileUpload}
                      ref={fileUploaderRef}
                      required
                    />
                    <p
                      className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                      id="file_input_help"
                    >
                      An image related to your blog content will be displayed on
                      the blog card.
                    </p>
                  </>
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
        </div>
      </div>
    </div>
  );
};

export default AddBlogStudent;
