import { useEffect, useState, useContext } from "react";
import BlogItem from "./BlogItem";
import vars from "../vars";
import TopTitle from "./TopTitle";
import loaderContext from "../context/loadingBar/loderContext";
import Spiner from "./Spiner";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const CatBlog = () => {
  const { category } = useParams();
  const [posts, setPost] = useState([]);
  const [page, setPage] = useState({count: 0});
  // const [hasMore, setHasMore] = useState(true);
  const loderCon = useContext(loaderContext);
  const { setProgress } = loderCon;
  const fetchPagedBlogs = async () => {
    try {
      const response = await fetch(`${page.next}`);
      const json = await response.json();
      setPage(json);
      const newPosts = posts.concat(json.results);
      setPost(newPosts);
      // document.documentElement.scrollTop = 0;
      // document.body.scrollTop = 0;
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  const blog = async () => {
    setProgress(40);
    try {
      const response = await fetch(
        `${vars.host}/api/category-post/${category.toString()}/`
      );
      let json = await response.json();
      setPage(json);
      setPost(json.results);
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
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-blue-700 italic font-DancingScript dark:bg-gray-900 dark:text-blue-300 md:text-5xl lg:text-8xl text-3xl whitespace-nowrap w-fit mx-auto md:mb-24">
          {category}
        </h1>
        {/* {loading && <Spiner />} */}
        <div className="-mb-12">
          <div className="px-4">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-3 md:gap-4 lg:gap-6 w-fit mx-auto my-4">
              {posts.map((post) => {
                return <BlogItem post={post} key={post.snoPost} />;
              })}
            </div>
          </div>
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchPagedBlogs}
            hasMore={page.next ? true : false}
            loader={<Spiner />}
            endMessage={
              <>
                <div className="text-center text-lg">
                  You&apos;ve Reached the End Of the Module. <br />
                  No More Blogs to Display.
                </div>
              </>
            }
            scrollableTarget="scrollableDiv"
          ></InfiniteScroll>
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

export default CatBlog;
