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
  const [notAvailable, setNotAvailable] = useState(true);
  const [user, setUser] = useState({});
  const getUser = async () => {
    try {
      setProgress(40);
      const response = await fetch(
        `${vars.host}/api/post-user-username/${username}/`
      );
      const json = await response.json();
      // console.log(json);
      if (json.length > 0) {
        setUser(json[0]);
        document.title = `${json[0].first_name} ${json[0].last_name} ( @${json[0].username}) | MPS Ajmer`
        getUserBlogs();
        setNotAvailable(false);
      } else {
        document.title = '404 NOT FOUND | MPS Ajmer'
        setNotAvailable(true);
      }
      setProgress(100);
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };

  // const getExtLinks = async ()=>{
  //   const l1 = window.document.createElement('link')
  //   const l2 = window.document.createElement('link')
  //   l1.href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
  //   l2.href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
  //   document.head.appendChild(l1)
  //   document.head.appendChild(l2)
  // }
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
      setBlogs(blogs.concat(json.results));
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection"
      );
    }
  };
  useEffect(() => {
    getUser();

    // document.title = `Profile - ${username}`;
  }, []);
  return (
    <>
      <>
        {/* component */}
        {!notAvailable ? (
          <>
            <section className="profile-page">
              <section className="relative block h-500-px">
                <div
                  className="absolute top-0 w-full h-full bg-center bg-cover"
                  style={{
                    backgroundImage: `url("${user.bannerImg}")`,
                  }}
                >
                  <span
                    id="blackOverlay"
                    className="w-full h-full absolute opacity-50 bg-black"
                  />
                </div>
                <div
                  className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                  style={{ transform: "translateZ(0px)" }}
                >
                  <svg
                    className="absolute bottom-0 overflow-hidden"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    version="1.1"
                    viewBox="0 0 2560 100"
                    x={0}
                    y={0}
                  >
                    <polygon
                      className="text-blueGray-200 fill-current"
                      points="2560 0 2560 100 0 100"
                    />
                  </svg>
                </div>
              </section>
              <section className="relative py-16">
                <div className="container mx-auto px-4">
                  <div className="relative flex dark:bg-gray-800 flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                    <div className="px-6  ">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                          <div className="relative">
                            <img
                              alt="..."
                              src={user.profile}
                              className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                            />
                          </div>
                        </div>
                        <div className="w-full lg:w-4/12 px-4 lg:order-1">
                          <div className="flex justify-center py-4 lg:pt-4 pt-8"></div>
                        </div>
                      </div>
                      <div className="mt-20 lg:mt-40 -mb-10 text-center">
                        <div className="flex flex-wrap justify-center">
                          <div className="w-full lg:w-9/12 px-4">
                            <p className="text-lg leading-relaxed text-blueGray-700 dark:text-gray-400">
                              {user.nickname}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-10 py-10 text-center">
                        <div className="flex flex-wrap justify-center">
                          <div className="w-full lg:w-9/12 px-4">
                            <p className="mb-4 text-lg leading-relaxed text-blueGray-700 dark:text-gray-400">
                              {user.bio}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
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
                      dataLength={blogs.length}
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
        ) : (
          <>
            <div>
              <p className="text-center text-3xl">User Not Available</p>
            </div>
          </>
        )}
      </>
    </>
  );
};

export default Profile;
