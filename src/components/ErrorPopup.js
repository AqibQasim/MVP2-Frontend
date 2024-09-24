// components/AlertPopup.js
import { useState } from "react";

const ErrorPopup = ({ message, type = "error", onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) return null;

  const alertTypeStyles = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
    info: "bg-blue-100 border-blue-400 text-blue-700",
  };

  return (
    <div
      className={`fixed right-4 top-4 z-50 rounded-md border-l-4 p-4 shadow-lg ${alertTypeStyles[type]}`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          className="ml-4 text-lg font-bold hover:text-opacity-80"
          onClick={handleClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ErrorPopup;
