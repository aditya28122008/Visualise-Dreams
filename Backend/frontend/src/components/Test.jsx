// import { useState } from "react";
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminCatBlogs from "./admin/AdminCatBlogs";

// import vars from "../vars";
const Test = () => {
  // const [fileUrl, setFileUrl] = useState(
  //   `${vars.host}/media/elibrary/books/PDF/fesc101.pdf`
  // );

  return (
    // <div>
    //   <Worker
    //     workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
    //   >
    //     <Viewer theme={localStorage.getItem('mode')} fileUrl={fileUrl} />
    //   </Worker>
    // </div>
    <>
      {/* <BrowserRouter>
        <Routes> */}
          <Route path="/test/name" element={<AdminCatBlogs />} />
        {/* </Routes>
      </BrowserRouter> */}
    </>
  );
};

export default Test;
