import logo from "./Logo.png";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Blog from "./components/Blog";
import Library from "./components/Library";
import Sidebar from "./components/Sidebar";
import UserState from "./context/users/UserState";
import Login from "./components/Login";
import Alert from "./components/Alert";
import alertContext from "./context/alert/alertContext";
import BlogRead from "./components/BlogRead";
import Footer from "./components/Footer";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Search from "./components/Search";
import loaderContext from "./context/loadingBar/loderContext";
import LoaadingBar from "./components/LoaadingBar";
import AllowedPosts from "./components/admin/AllowedPosts";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/NotFound";
import BlogState from "./context/admin/blogs/BlogState";
import BlockedPosts from "./components/admin/BlockedPosts";
import AddBlog from "./components/admin/AddBlog";
import EditBlog from "./components/admin/EditBlog";

function App() {
  const [mode, setMode] = useState("");
  // Managing loading bar state
  const [progress, setProgress] = useState(10);

  // Managing Alert bar state
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState(` `);
  const [type, setType] = useState(` `);
  const showAlert = (alMess, type) => {
    setMessage(alMess);
    setAlert(true);
    setType(type);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };

  const sideShow = () => {
    document.getElementById("sidebar").classList.toggle("-translate-x-full");
    document.getElementById("sideHamDiv1").classList.toggle("rotate-45");
    document.getElementById("sideHamDiv2").classList.toggle("-rotate-45");
    document.getElementById("sideHamDiv2").classList.toggle("my-1");
    document.getElementById("sideHamDiv2").classList.toggle("-my-[0.45rem]");
    document.getElementById("sideHamDiv3").classList.toggle("opacity-0");
    document.getElementById("quitSide").classList.toggle("translate-x-full");
  };

  return (
    <>
      <BlogState>
        <loaderContext.Provider value={{ progress, setProgress }}>
          <alertContext.Provider value={{ message, alert, type, showAlert }}>
            <UserState>
              <BrowserRouter>
                <div className={`${mode}`}>
                  <LoaadingBar />
                  <Navbar
                    title="Mps Ajmer"
                    setMode={setMode}
                    mode={mode}
                    logo={logo}
                    sideShow={sideShow}
                  />
                  <Alert />
                  <ToastContainer
                    position="top-center"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme={`${mode}`}
                  />
                  <div className="main-cont flex">
                    <div className="flex">
                      <Sidebar sideShow={sideShow} />
                      <div
                        className="h-[100vh] w-[30%] bg-gray-700 opacity-50 md:h-[150vh] md:w-[80%] transition-all duration-300 z-[4] fixed right-0 top-0 translate-x-full cursor-pointer"
                        onClick={() => sideShow()}
                        id="quitSide"
                      ></div>
                    </div>
                    <div
                      className="right-body md:px-16 px-8 mt-12 w-screen h-screen py-24 md:inline-block overflow-y-auto scroll-smooth bg-white dark:bg-gray-900 dark:text-white"
                      // id="rightBody"
                      id="scrollableDiv"
                    >
                      {/* <Modal /> */}
                      <Routes>
                        <Route exact index element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogRead />} />
                        <Route exact path="/elibrary" element={<Library />} />
                        <Route
                          path="/profile/:username"
                          element={<Profile />}
                        />
                        <Route path="/search/:query" element={<Search />} />
                        <Route path="/edit-profile" element={<EditProfile />} />
                        <Route
                          path="/admin/a-posts"
                          element={<AllowedPosts />}
                        />
                        <Route
                          path="/admin/b-posts"
                          element={<BlockedPosts />}
                        />
                        <Route
                          path="/admin/edit-blog/:slug"
                          element={<EditBlog />}
                        />
                        <Route path="/admin/addblog" element={<AddBlog />} />
                        <Route
                          exact
                          path="/login"
                          element={
                            <Login logo={logo} title={"Login to MPS Ajmer"} />
                          }
                        />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                      <Footer logo={logo} />
                    </div>
                  </div>
                </div>
              </BrowserRouter>
            </UserState>
          </alertContext.Provider>
        </loaderContext.Provider>
      </BlogState>
    </>
  );
}

export default App;
