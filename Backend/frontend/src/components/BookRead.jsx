/* eslint-disable react-hooks/exhaustive-deps */
// import { Viewer, Worker } from '@react-pdf-viewer/core';
// import { Viewer } from "@react-pdf-viewer/core";
// import { Document, Page } from "react-pdf";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// import '@react-pdf-viewer/core/lib/styles/index.css';
import vars from "../vars";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import loaderContext from "../context/loadingBar/loderContext";
import { toast } from "react-toastify";
import TopTitle from "./TopTitle";
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const BookRead = () => {
  const [book, setBook] = useState({ bookPDF: "", bookName: "" });
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [notAvailable, setNotAvailable] = useState(true);
  const { bookSno } = useParams();
  const loaderCon = useContext(loaderContext);
  const { setProgress } = loaderCon;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // Called when the PDF is successfully loaded
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // function onDocumentLoadSuccess({ numPages }) {
  //   setNumPages(numPages);
  // }

  const getBook = async () => {
    setProgress(40);
    try {
      const res = await fetch(`${vars.host}/api/book/${bookSno}/`);
      if (res.status === 200) {
        const json = await res.json();
        setBook(json);
        console.log(json);
        document.title = `${json.bookName} - Elibrary | MPS Ajmer`;
        setNotAvailable(false);
      } else {
        setNotAvailable(true);
      }
    } catch (error) {
      toast.error(
        "Can't connect to the server. Please check your internet connection",
        { autoClose: 2500 }
      );
    }
    setProgress(100);
  };
  useEffect(() => {
    getBook();
  }, []);

  return (
    <>
      {!notAvailable ? (
        <div style={{ height: "750px", width: "100%" }}>
          {/* <div className="text-xl text-center pb-4 md:text-2xl lg:text-4xl xl:text-6xl font-Oswald ">{book.bookName}</div> */}
          <TopTitle title={book.bookName} />
          <Document file={book.bookPDF} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <div>
            <button
              disabled={pageNumber <= 1}
              onClick={() => setPageNumber(pageNumber - 1)}
            >
              Previous
            </button>
            <span>
              Page {pageNumber} of {numPages}
            </span>
            <button
              disabled={pageNumber >= numPages}
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <>
          <div>
            <p className="text-center text-3xl">Book Not Available</p>
          </div>
        </>
      )}
    </>
  );
};

export default BookRead;
