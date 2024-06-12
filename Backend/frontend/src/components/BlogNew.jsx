import { useEffect, useState, useContext } from "react";
import vars from "../vars";
import TopTitle from "./TopTitle";
import loaderContext from "../context/loadingBar/loderContext";
import { toast } from "react-toastify";
import CategoryBlogDisplay from "./CategoryBlogDisplay";

const BlogNew = () => {
  const [categories, setCategories] = useState([]);

  // const [hasMore, setHasMore] = useState(true);
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
    document.title = "Our Blogs - MPS Ajmer !";
    blog();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <TopTitle />
      <div className="container px-5 mx-auto">
        <h1 className="text-blue-700 italic font-DancingScript dark:bg-gray-900 dark:text-blue-300 md:text-5xl lg:text-8xl text-4xl whitespace-nowrap w-fit mx-auto md:mb-24">
          Our Popular Blogs...!
        </h1>

        {/* {loading && <Spiner />} */}
        <div className="-mb-12">
          <div className="px-4">
            {categories.map((cat) => {
              return <CategoryBlogDisplay key={cat.cat} blogs={cat} length={cat} />
            })}
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-3 md:gap-4 lg:gap-6 w-fit mx-auto my-4"></div>
          </div>
        </div>
        {/* <div className="container flex justify-between mt-4">
          <button
            className={`px-2 py-1 bg-blue-600 rounded-lg text-xl ${
              !page.previous && "opacity-0"
            } text-white`}
            disabled={!page.previous}
            onClick={() => fetchPagedBlogs(page.previous)}
          >
            &larr; Newer Posts
          </button>
          <button
            className={`px-2 py-1 bg-blue-600 rounded-lg text-xl ${
              !page.next && "opacity-0"
            } text-white`}
            disabled={!page.next}
            onClick={() => fetchPagedBlogs(page.next)}
          >
            Older Posts &rarr;
          </button>
        </div> */}
      </div>
    </>
  );
};

export default BlogNew;
