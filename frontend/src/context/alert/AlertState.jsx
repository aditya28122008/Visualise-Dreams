/* eslint-disable react/prop-types */
import { useState } from "react";
import AlertContextContext from "./alertContext";

const AlertState = (props) => {
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState(` `);
  const [type, setType] = useState(` `)
  const showAlert = (alMess, type) => {
    setMessage(alMess);
    setAlert(true);
    setType(type);
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  };
  return (
    <AlertContextContext.Provider value={{ message, alert, type, showAlert }}>
      {props.children}
    </AlertContextContext.Provider>
  );
};


export default AlertState;