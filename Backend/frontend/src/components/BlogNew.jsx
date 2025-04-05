import { useEffect, useState, useContext } from "react";
import vars from "../vars";
import TopTitle from "./TopTitle";
import loaderContext from "../context/loadingBar/loderContext";
import { toast } from "react-toastify";
import CategoryBlogDisplay from "./CategoryBlogDisplay";

const BlogNew = () => {
  const [categories, setCategories] = useState([]);
  const loderCon = useContext(loaderContext);
  const { setProgress } = loderCon;
  const blog = async () => {
    setProgress(40);
    try {
      const response = await fetch(`${vars.host}/api/cat-post/`);
      let json = await response.json();
      setCategories(json);
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
    setProgress(100);
  };
  useEffect(() => {
    document.title = "Our Blogs | MPS Ajmer !";
    blog();
  }, []);
  return (
    <>
      <TopTitle title={'Maheshwari Public School'} tagline={"Mastering People's Skills"} />
      <div className="container px-5 mx-auto">
        <h1 className="text-blue-700 italic font-DancingScript dark:bg-gray-900 dark:text-blue-300 md:text-5xl lg:text-8xl text-4xl whitespace-nowrap w-fit mx-auto md:-mb-20">
          Our Popular Blogs...!
        </h1>
        <div className="-mb-12">
          <div className="px-4">
            {categories.map((cat) => {
              return <CategoryBlogDisplay key={cat.cat} blogs={cat} length={cat} />
            })}
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-3 md:gap-4 lg:gap-6 w-fit mx-auto my-4"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogNew;
