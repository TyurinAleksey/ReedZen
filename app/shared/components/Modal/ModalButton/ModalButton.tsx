import { ReactNode } from "react";

interface ModalButtonProps {
  id: string;
  buttonName: string;
  buttonIcon?: ReactNode;
}

export default function ModalButton({
  id,
  buttonName,
  buttonIcon,
}: ModalButtonProps) {
  return (
    <>
      <label
        htmlFor={id}
        className="btn btn-outline btn-info text-base-content"
      >
        {buttonIcon && <span className="mr-2">{buttonIcon}</span>}
        {buttonName}
      </label>
    </>
  );
}
