import React, { useEffect, useState, useContext } from "react";
import BlogItem from "./BlogItem";
import vars from "../vars";
import alertContext from "../context/alert/alertContext";
import TopTitle from "./TopTitle";
import loaderContext from "../context/loadingBar/loderContext";
import Spiner from "./Spiner";
import InfiniteScroll from "react-infinite-scroll-component";

const Blog = () => {
  const [posts, setPost] = useState([]);
  const [page, setPage] = useState({});
  const alContext = useContext(alertContext);
  const { showAlert } = alContext;
  const [hasMore, setHasMore] = useState(true);
  const loderCon = useContext(loaderContext);
  const { setProgress } = loderCon;
  const fetchPagedBlogs = async () => {
    try {
      const response = await fetch(`${page.next}`);
      const json = await response.json();
      setPage(json);
      const newPosts = posts.concat(json.results);
      setPost(newPosts);
      if (!json.next) {
        setHasMore(false);
      }
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } catch (error) {
      showAlert(
        "Can't connect to the server. Please check your internet connection",
        "warning"
      );
    }
  };
  const blog = async () => {
    setProgress(40);
    try {
      const response = await fetch(`${vars.host}/api/post/`);
      let json = await response.json();
      setPage(json);
      setPost(json.results);
    } catch (error) {
      showAlert(
        "Can't connect to the server. Please check your internet connection",
        "warning"
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
      <hr className="separator mt-5 hidden dark:block -mb-5 transition-all duration-300" />
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-pink-700 italic font-DancingScript dark:bg-gray-900 dark:text-pink-300 md:text-5xl lg:text-8xl text-3xl whitespace-nowrap w-fit mx-auto md:mb-24">
          Our Popular Blogs...!
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
                  You've Reached the End Of the Module. <br />
                  No More Blogs to Display.
                </div>
              </>
            }
          ></InfiniteScroll>
        </div>
        {/* <div className="container flex justify-between mt-4">
          <button
            className={`px-2 py-1 bg-purple-600 rounded-lg text-xl ${
              !page.previous && "opacity-0"
            } text-white`}
            disabled={!page.previous}
            onClick={() => fetchPagedBlogs(page.previous)}
          >
            &larr; Newer Posts
          </button>
          <button
            className={`px-2 py-1 bg-purple-600 rounded-lg text-xl ${
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

export default Blog;
