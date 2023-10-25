import React from "react";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#e5e5e5",

  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .4)",
  zIndex: 1000,
};
const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div style={OVERLAY_STYLES} onClick={() => onClose()} />
      <div
        style={MODAL_STYLES}
        className="border-2 border-black w-[400px] rounded-lg"
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
