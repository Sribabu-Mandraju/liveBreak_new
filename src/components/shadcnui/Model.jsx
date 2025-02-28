import { useEffect } from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold"
        >
          &times;
        </button>
        {title && <h2 className="text-2xl mb-4 font-semibold">{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
