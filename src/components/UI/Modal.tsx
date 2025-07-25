
import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  size = "md",
  children,
}: ModalProps) {
  if (!isOpen) return null;

  const widthClass =
    size === "lg" ? "min-w-[600px]" : size === "md" ? "min-w-[400px]" : "min-w-[280px]";

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/40 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        className={`max-w-[90vw] ${widthClass} bg-white text-gray-900 rounded-lg p-6`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h3 className="text-xl font-bold mb-4">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
