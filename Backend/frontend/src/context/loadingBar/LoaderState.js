import { useState } from "react";
import loaderContext from "./loderContext";

const LoaderState = ({ children }) => {
  const [progress, setProgress] = useState(10);

  return (
    <loaderContext.Provider value={{ progress, setProgress }}>
      {children}
    </loaderContext.Provider>
  );
};


export default LoaderState;