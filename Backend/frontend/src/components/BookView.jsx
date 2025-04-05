/* eslint-disable react/prop-types */

import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import vars from "../vars";
import TopTitle from "./TopTitle";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import loaderContext from "../context/loadingBar/loderContext";
import { toast } from "react-toastify";

const BookView = () => {
  const [book, setBook] = useState({ bookPDF: "", bookName: "" });
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [notAvailable, setNotAvailable] = useState(true);
  const { bookSno } = useParams();
  const loaderCon = useContext(loaderContext);
  const { setProgress } = loaderCon;

  const getPdf = async () => {
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
    getPdf();
  }, []);

  return (
    <>
      {!notAvailable ? (
        <>
          <TopTitle title={book.bookName} />
          <div>
            <Worker workerUrl="/pdfjs/pdf.worker.min.js">
              <Viewer fileUrl={`${book.bookPDF}`} />
            </Worker>
          </div>
        </>
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

export default BookView;
