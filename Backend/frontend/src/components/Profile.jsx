/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import vars from "../vars";
import loaderContext from "../context/loadingBar/loderContext";
import { toast } from "react-toastify";
import Spiner from "./Spiner";
import InfiniteScroll from "react-infinite-scroll-component";
import BlogItem from "./BlogItem";

const Profile = () => {
  const loderCon = useContext(loaderContext);
  const { setProgress } = loderCon;
  const { username } = useParams();

  const [user, setUser] = useState({});
  const getUser = async () => {
    try {
      setProgress(40);
      const response = await fetch(
        `${vars.host}/api/post-user-username/${username}/`
      );
      const json = await response.json();
      setUser(json[0]);

      setProgress(100);
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  const fetchPagedBlogs = async () => {
    try {
      const response = await fetch(`${page.next}`);
      const json = await response.json();
      setPage(json);
      const newPosts = blogs.concat(json.results);
      setBlogs(newPosts);
      // document.documentElement.scrollTop = 0;
      // document.body.scrollTop = 0;
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  const [page, setPage] = useState({ count: 0 });
  const [blogs, setBlogs] = useState([]);
  const getUserBlogs = async () => {
    try {
      const response = await fetch(
        `${vars.host}/api/get-user-p-blogs/${username}/`
      );
      const json = await response.json();
      setPage(json);
      setBlogs(json.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
    getUserBlogs();
    document.title = `Profile - ${username}`;
  }, []);
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="rounded-lg h-full overflow-hidden" id="bannerImg">
              <img
                alt="User's Banner"
                className="object-cover object-center h-96 w-full"
                src={user.bannerImg}
              />
            </div>
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                  <img
                    src={user.profile}
                    alt="Profile Img Here"
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-black dark:text-white text-lg">
                    {user.first_name} {user.last_name}
                  </h2>
                  <div className="w-12 h-1 bg-blue-500 rounded mt-2 mb-4" />
                  <p className="text-base text-gray-600 dark:text-gray-400">
                    {user.nickname}
                  </p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p className="leading-relaxed text-lg mb-4 text-justify dark:text-gray-400">
                  {user.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {blogs.length > 0 && (
        <>
          <section className="w-[90%] mx-auto mb-16">
            <div className="text-6xl italic font-bold">
              See What I&apos;ve Written...!
            </div>
            <div className="-mb-12">
              <div className="px-4">
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 sm:gap-3 md:gap-4 lg:gap-6 w-fit mx-auto my-4">
                  {blogs.map((post) => {
                    return <BlogItem post={post} key={post.snoPost} />;
                  })}
                </div>
              </div>
              <InfiniteScroll
                dataLength={page.count}
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
          </section>
        </>
      )}
    </>
  );
};

export default Profile;
