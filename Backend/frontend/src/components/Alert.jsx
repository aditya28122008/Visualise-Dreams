import { useContext } from "react";
  
const Alert = () => {
  const alContext = useContext(alertContext);
  const { message, alert, type } = alContext;
  
  
  if (alert) {
    return (
      <div
        className={`${type} px-4 py-3 rounded fixed top-[4.7rem] left-0 right-2 z-50`}
        role="alert"
      >
        <strong className="font-bold">{type.slice(0, 1).toUpperCase() + type.slice(-(type.length - 1))}: </strong>
        <span className="block sm:inline">
          {message}
        </span>
      </div>
    );
  }
};

export default Alert;
