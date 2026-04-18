"use client";

import { useEffect } from "react";

import { PostModalProps } from "../core/interfaces/PostModalProps";


export function PostModal({ post, onClose }: PostModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(); //cerrar con esc
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
        <div className="modal-header">
          <span className="modal-id">#{post.id}</span>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </div>
        <h2 className="modal-title">{post.title}</h2>
        <p className="modal-body">{post.body}</p>
      </div>
    </div>
  );
}