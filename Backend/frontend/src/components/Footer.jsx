import React from "react";

const Footer = (props) => {
  return (
    <>
      {/* <footer className="text-gray-400 bg-white dark:bg-gray-900 dark:text-gray-600 body-font">
        <hr className="md:mx-24 mx-4 h-[0.12rem]  bg-white separator" />
        <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left md:mt-0 mt-10">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-black dark:text-white">
              <img
                src={props.logo}
                className="w-16 h-16 text-black p-2 dark:bg-blue-500 bg-blue-600 rounded-full"
                alt=""
              />
              <span className="ml-3 text-xl font-DancingScript">MPS Ajmer</span>
            </a>
            <p className="mt-2 text-sm text-gray-500">
              Air plant banjo lyft occupy retro adaptogen indego
            </p>
          </div>
          <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-black dark:text-white tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-400 hover:text-black hover:dark:text-white cursor-pointer">
                    First Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black hover:dark:text-white cursor-pointer">
                    Second Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black hover:dark:text-white cursor-pointer">
                    Third Link
                  </a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black hover:dark:text-white cursor-pointer">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-black dark:text-white tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-400 hover:text-black hover:dark:text-white cursor-pointer">First Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black hover:dark:text-white cursor-pointer">Second Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black hover:dark:text-white cursor-pointer">Third Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black hover:dark:text-white cursor-pointer">Fourth Link</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-black dark:text-white tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-400 hover:text-black hover:dark:text-white cursor-pointer">First Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black hover:dark:text-white cursor-pointer">Second Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black hover:dark:text-white cursor-pointer">Third Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black hover:dark:text-white cursor-pointer">Fourth Link</a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-black dark:text-white tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-400 hover:text-black hover:dark:text-white cursor-pointer">First Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black hover:dark:text-white cursor-pointer">Second Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black hover:dark:text-white cursor-pointer">Third Link</a>
                </li>
                <li>
                  <a className="text-gray-400 hover:text-black hover:dark:text-white cursor-pointer">Fourth Link</a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-900 bg-opacity-75">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-400 text-sm text-center sm:text-left">
              © 1989 MPS Ajmer
              <a
                href="https://twitter.com/knyttneve"
                className="text-gray-500 ml-1"
                rel="noopener noreferrer"
                target="_blank"
              >
                @knyttneve
              </a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a className="text-gray-400">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a className="ml-3 text-gray-400">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                </svg>
              </a>
              <a className="ml-3 text-gray-400">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={0}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  ></path>
                  <circle cx={4} cy={4} r={2} stroke="none" />
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer> */}
      <footer className="footer flex md:flex-row flex-col justify-between items-center p-4 bg-neutral text-neutral-content bg-gray-200 mt-8 dark:bg-gray-800 rounded-lg">
        <aside className="flex space-x-2 items-center justify-center flex-col md:flex-row">
          <img
            src={props.logo}
            alt=""
            className="h-10 md:h-20 md:w-20 rounded-full w-fit mx-auto flex flex-col md:flex-row"
          />
          <p>Copyright ©1989</p>
        </aside>
        <aside className="md:h-fit md:my-auto">
          <nav className="grid md:grid-cols-3 md:gap-2 md:grid-rows-none grid-cols-3 mt-4 md:mt-0 gap-3">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-blue-600 dark:text-white"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-red-600 dark:text-white"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current text-blue-600 dark:text-white"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </nav>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
