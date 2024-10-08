import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-2 rounded-lg  overflow-auto">
        <button className="mx-auto text-gray-600 w-full text-right" onClick={onClose}>
          &times;
        </button>
        <div className="mt-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
