"use client";

import { useEffect } from "react";
import { CreatePostForm } from "../components/CreatePostForm";


export function CreatePostModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-box">
        <CreatePostForm onSuccess={onClose} onCancel={onClose} />
      </div>
    </div>
  );
}