"use client";
import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (name !== openName || !mounted) return null;

  return createPortal(
    <div className="body-scroll fixed inset-0 z-50 overflow-y-auto bg-black/5 backdrop-blur-md transition-all">
      <div className="flex min-h-screen items-center justify-center px-4 py-8">
        <div className="relative w-full max-w-lg rounded-4xl bg-white p-8 shadow-[0px_12px_48px_rgba(30,16,97,0.20)]">
          <button
            onClick={close}
            className="absolute right-4 top-3 text-gray-500 hover:text-black"
          >
            close
          </button>
          <div>{cloneElement(children, { onCloseModal: close })}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
