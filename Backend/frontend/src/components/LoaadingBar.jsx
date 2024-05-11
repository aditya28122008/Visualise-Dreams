import { useContext } from "react";
import LoadingBar from "react-top-loading-bar";
// import loaderContext from "@context/loadingBar/loderContext";
import loaderContext from "../context/loadingBar/loderContext";
const LoaadingBar = () => {
  const loderCon = useContext(loaderContext);
  const { progress, setProgress } = loderCon;
  return (
    <>
      <LoadingBar
        color="#4338ca"
        onLoaderFinished={() => setProgress(0)}
        progress={progress}
        height={3}
        transitionTime={100}
        waitingTime={1000}
        loaderSpeed={800}
        shadow={true}
      />
    </>
  );
};

export default LoaadingBar;