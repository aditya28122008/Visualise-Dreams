import React, { useContext } from "react";
import modalContext from "../context/modal/modalContext";

const Modal = () => {
  const moContext = useContext(modalContext);
  const { show, setConfirm, showModal, mess } = moContext;
  const tBannerIm = () => {
    document.getElementById("bannerModal").classList.toggle("hidden");
  };
  const clickOk = ()=>{
    setConfirm(true);
    showModal()
  }
  if (show) {
    return (
      <div>
        <section className="flex justify-center" id="bannerModal">
          <div className="text-lg">{mess}</div>
          <div className="flex justify-between">
            <button className="btn-primary mt-2" onClick={tBannerIm}>
              Ok
            </button>
            <button className="btn-danger mt-2" onClick={tBannerIm}>
              Cancel
            </button>
          </div>
        </section>
      </div>
    );
  }
};

export default Modal;
