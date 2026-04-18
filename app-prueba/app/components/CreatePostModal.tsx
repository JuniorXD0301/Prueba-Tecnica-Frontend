"use client";

import { useEffect } from "react";
import { useCreatePost } from "../core/services/usecreatepost";

interface CreatePostModalProps {
  onClose: () => void;
}

export function CreatePostModal({ onClose }: CreatePostModalProps) {
  const { form, errors, status, serverError, handleChange, handleSubmit, reset } =
    useCreatePost(onClose);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status !== "loading") {
        reset();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, reset, status]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && status !== "loading") {
      reset();
      onClose();
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-box create-modal">
        <div className="modal-header">
          <h2 className="modal-heading">Nuevo post</h2>
          {status !== "loading" && (
            <button
              className="modal-close"
              onClick={handleCancel}
              aria-label="Cerrar"
            >
              ✕
            </button>
          )}
        </div>

        {status === "success" && (
          <div className="create-feedback success">
            <span>✅</span>
            <p>¡Post creado exitosamente!</p>
          </div>
        )}

        {status === "error" && serverError && (
          <div className="create-feedback error">
            <span>⚠️</span>
            <p>{serverError}</p>
          </div>
        )}

        {status !== "success" && (
          <div className="create-form">
            <div className="field">
              <label htmlFor="userId" className="field-label">
                Usuario <span className="required">*</span>
              </label>
              <select
                id="userId"
                name="userId"
                className={`field-input ${errors.userId ? "field-error" : ""}`}
                value={form.userId}
                onChange={handleChange}
                disabled={status === "loading"}
              >
                <option value="">Seleccionar usuario…</option>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    Usuario {n}
                  </option>
                ))}
              </select>
              {errors.userId && (
                <span className="field-hint error">{errors.userId}</span>
              )}
            </div>

            <div className="field">
              <label htmlFor="cf-title" className="field-label">
                Título <span className="required">*</span>
              </label>
              <input
                id="cf-title"
                name="title"
                type="text"
                className={`field-input ${errors.title ? "field-error" : ""}`}
                placeholder="Escribe un título…"
                value={form.title}
                onChange={handleChange}
                disabled={status === "loading"}
                maxLength={120}
              />
              {errors.title && (
                <span className="field-hint error">{errors.title}</span>
              )}
            </div>

            <div className="field">
              <label htmlFor="cf-body" className="field-label">
                Contenido <span className="required">*</span>
              </label>
              <textarea
                id="cf-body"
                name="body"
                className={`field-input field-textarea ${errors.body ? "field-error" : ""}`}
                placeholder="Escribe el contenido del post…"
                value={form.body}
                onChange={handleChange}
                disabled={status === "loading"}
                rows={4}
              />
              {errors.body && (
                <span className="field-hint error">{errors.body}</span>
              )}
            </div>

            <div className="create-actions">
              <button
                className="btn-cancel"
                onClick={handleCancel}
                disabled={status === "loading"}
              >
                Cancelar
              </button>
              <button
                className="btn-submit"
                onClick={handleSubmit}
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <span className="btn-spinner" />
                    Creando…
                  </>
                ) : (
                  "Crear post"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}