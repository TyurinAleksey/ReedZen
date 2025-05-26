import React from "react";

interface ModalContentProps {
  id: string;
  children: React.ReactNode;
}

export default function ModalContent({ id, children }: ModalContentProps) {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">{children}</div>
        <label className="modal-backdrop" htmlFor={id}></label>
      </div>
    </>
  );
}
