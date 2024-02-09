import { useState } from "react";
import modalContext from "./modalContext";

const ModalState = (props) => {
  const [confirm, setConfirm] = useState(false);
  const [show, setShow] = useState(false);
  const [mess, setMess] = useState("")
  const showModal = (mess)=>{
    setMess(mess)
    show ? setShow(true) : setShow(false)
    setTimeout(() => {
      setConfirm(false)
    }, 1000);
  }
  return (
    <modalContext.Provider value={{ confirm, setConfirm, show, showModal, mess }}>
      {props.children}
    </modalContext.Provider>
  );
};


export default ModalState;