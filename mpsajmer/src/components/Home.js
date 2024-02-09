import React, { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom'
import IndexInfo from "./IndexInfo";
import vars from "../vars";
import alertContext from "../context/alert/alertContext";
import BlogItemIndex from "./BlogItemIndex";
import Home2Jpg from "../static/images/home2.jpg";
import HomePng from "../static/images/Home.png";

const Home = () => {
  const [posts, setPost] = useState([]);
  const alContext = useContext(alertContext);
  const { showAlert } = alContext;
  const blog = async () => {
    try {
      const response = await fetch(`${vars.host}/api/post/`);
      const json = await response.json();
      setPost(json.slice(-3));
    } catch (error) {
      showAlert(
        "Can't connect to the server. Please check your internet connection",
        "warning"
      );
    }
  };
  useEffect(() => {
    document.title = "Welcome to MPS Ajmer !";
    blog();
  }, []);
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap mx-auto rounded-full pt-8 pb-2 mb-20 flex-col items-center text-center shadow-blue-500 dark:shadow-none dark:italic shadow-xl w-fit">
            <h1 className="sm:text-3xl title-font text-sky-500 dark:text-white md:dark:text-5xl dark:text-2xl md:text-4xl dark:sm:text-4xl rounded-full px-4 font-bold font-serif uppercase">
              Maheshwari Public School
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-green-500 font-serif">
              Mastering People's Skills
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <IndexInfo
              icon="M22 12h-4l-3 9L9 3l-3 9H2"
              title="Shooting Stars"
              content="Fingerstache flexitarian street art 8-bit waist co, subway
                  tile poke farm."
            />
            <IndexInfo
              icon="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"
              title="The Catalyzer"
              content="Fingerstache flexitarian street art 8-bit waist co, subway
              tile poke farm."
            />
            <IndexInfo
              icon="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
              title="Neptune"
              content="Fingerstache flexitarian street art 8-bit waist co, subway
                  tile poke farm."
            />
            <IndexInfo
              icon="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"
              title="Melanchole"
              content="Fingerstache flexitarian street art 8-bit waist co, subway
                  tile poke farm."
            />
            <IndexInfo
              icon="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
              title="Bunker"
              content="Fingerstache flexitarian street art 8-bit waist co, subway
                  tile poke farm."
            />
            <IndexInfo
              icon="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
              title="Ramona Falls"
              content="Fingerstache flexitarian street art 8-bit waist co, subway
                  tile poke farm."
            />
          </div>
        </div>
      </section>
      <hr className="separator mb-16" />
      <section className="text-gray-400 bg-white dark:bg-gray-900 body-font">
        <div className="container mx-auto flex px-5 md:flex-row py-16 flex-col-reverse items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-black dark:text-white">
              Lorem ipsum dolor, sit elit.
              <br className="hidden lg:inline-block" />
              Omnis corrupti in quidem?
            </h1>
            <p className="mb-8 leading-relaxed text-gray-600 dark:text-[#8a9bb1]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium fugit rem sunt neque ad fuga minus quasi id quidem
              voluptatem illum, error eos recusandae dignissimos a non odit
              assumenda aperiam amet animi sed dolorem!
            </p>
            <div className="flex justify-center hidden">
              <button className="inline-flex text-black bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded text-lg">
                Button
              </button>
              <button className="ml-4 inline-flex text-gray-400 bg-white border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-black rounded text-lg">
                Button
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 order-2 md:order-1">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={`${Home2Jpg}`}
            />
          </div>
        </div>
      </section>
      <section className="text-gray-400 bg-white body-font dark:bg-gray-900">
        <div className="container mx-auto flex px-5 py-8 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={`${HomePng}`}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-black dark:text-white">
              Lorem ipsum dolor sit amet.
              <br className="hidden lg:inline-block" />
              Lorem, ipsum.
            </h1>
            <p className="mb-8 leading-relaxed text-gray-600 dark:text-[#8a9bb1]">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia
              dignissimos illum alias, minima in ipsam ad magni quam perferendis
              nam adipisci error aperiam distinctio quos aliquam numquam
              suscipit, blanditiis earum nihil possimus vitae corporis.
            </p>
            <div className="flex justify-center">
              <Link to="/blog">
                <button className="btn-primary dark:bg-purple-500 dark:hover:bg-purple-600">
                  Our Blogs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <hr class="separator mt-16" />
      <section className="text-gray-400 bg-white dark:bg-gray-900 dark:text-white body-font">
        <div className="container px-5 py-16 mx-auto">
          <h1 className="text-blue-950 dark:text-purple-200 text-5xl mb-16 font-serif">
            Our Latest Updates:
          </h1>
          <div className="flex flex-wrap lg:flex-nowrap -mx-4 -my-8 space-x-4 space-y-2">
            {posts.map((post) => {
              return <BlogItemIndex post={post} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
