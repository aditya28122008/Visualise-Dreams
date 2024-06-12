/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import loaderContext from "../context/loadingBar/loderContext";

const NotFound = () => {
  const lodCon = useContext(loaderContext);
  const { setProgress } = lodCon;
  useEffect(() => {
    setProgress(100);
  }, []);

  return (
    <div className="dark:bg-gray-900">

    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400">
          404
        </h1>
        <p className="text-lg mt-4 text-gray-800 dark:text-gray-200">
          Oops! Page not found.
        </p>
        <a
          href={'/'}
          className="text-blue-500 dark:text-blue-300 mt-4 block hover:underline"
        >
          Go back...
        </a>
      </div>
    </div>
    </div>
  );
};

export default NotFound;
