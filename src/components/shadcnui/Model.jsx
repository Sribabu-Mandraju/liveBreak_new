import { useEffect } from "react";
import { MdClose } from "react-icons/md";
const Model = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000]  flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 dark:border dark:border-gray-600  h-[60vh] overflow-y-auto p-6 rounded-2xl  shadow-xl max-w-lg w-[95%] relative">
        <div className="w-full flex sticky top-0 items-center justify-end">
          <button
            onClick={onClose}
            className="absolute text-2xl font-semibold"
          >
            <MdClose />
          </button>
        </div>
        {title && <h2 className="text-2xl mb-4 font-semibold">{title}</h2>}
        <div className="w-auto">{children}</div>
      </div>
    </div>
  );
};

export default Model;
