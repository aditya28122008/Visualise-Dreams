import React, { useContext } from "react";
import alertContext from "../context/alert/alertContext";
const Alert = () => {
  const alContext = useContext(alertContext);
  const { message, alert, type } = alContext;
  if (alert) {
    return (
      <div
        className={`${type} px-4 py-3 rounded fixed top-[4.7rem] left-0 right-2`}
        role="alert"
      >
        <strong className="font-bold">Message: </strong>
        <span className="block sm:inline">
          {message}
        </span>
      </div>
    );
  }
};

export default Alert;
