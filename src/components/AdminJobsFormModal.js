import React from "react";

const Modal = ({ isOpen, onClose, children, className = "" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className={`rounded-lg bg-white p-4 ${className}`}>
        <button
          className="mx-auto w-full text-right text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
