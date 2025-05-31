"use client";

const Modal = ({ children, onClose, bg = "bg-white", width = "w-1/2" }) => {
  return (
    <div
      className={`fixed inset-0 z-50 bg-black/70 flex items-center justify-center`}
      onClick={onClose}
    >
      <div
        className={`rounded-lg shadow-lg ${bg} ${width}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
