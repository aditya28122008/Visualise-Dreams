import { useState } from "react";
import loaderContext from "./loderContext";

const LoaderState = (props) => {
  const [progress, setProgress] = useState(10);

  return (
    <loaderContext.Provider value={{ progress, setProgress }}>
      {props.children}
    </loaderContext.Provider>
  );
};


export default LoaderState;