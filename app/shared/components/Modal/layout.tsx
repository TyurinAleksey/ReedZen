import { ReactNode, useState } from "react";
import ModalButton from "./ModalButton";
import ModalContent from "./ModalContent";

interface ModalProps {
  id: string;
  buttonName: string;
  buttonIcon?: ReactNode;
  children: React.ReactNode;
}

export default function Modal({
  id,
  buttonName,
  buttonIcon,
  children,
}: ModalProps) {
  return (
    <>
      <ModalButton id={id} buttonName={buttonName} buttonIcon={buttonIcon} />
      <ModalContent id={id}>{children}</ModalContent>
    </>
  );
}
