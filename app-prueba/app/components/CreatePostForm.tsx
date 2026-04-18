"use client";

import { useCreatePost } from "../core/services/usecreatepost";

type Props = {
  onSuccess: () => void;
  onCancel: () => void;
};

export function CreatePostForm({ onSuccess, onCancel }: Props) {
  const {
    form,
    errors,
    status,
    serverError,
    handleChange,
    handleSubmit,
    reset,
  } = useCreatePost(() => {
    onSuccess(); 
  });

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <>
      <button className="back-btn" onClick={handleCancel}>
        ← Volver al listado
      </button>

      <div className="detail-card">
        <div className="detail-header">
          <span className="detail-badge">Nuevo post</span>
        </div>

        <h1 className="detail-title">Crear publicación</h1>
        <div className="detail-divider" />

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
                className={`field-input ${
                  errors.userId ? "field-error" : ""
                }`}
                value={form.userId}
                onChange={handleChange}
                disabled={status === "loading"}
              >
                <option value="">Seleccionar usuario...</option>
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
                className={`field-input ${
                  errors.title ? "field-error" : ""
                }`}
                placeholder="Escribe un título..."
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
                className={`field-input field-textarea ${
                  errors.body ? "field-error" : ""
                }`}
                placeholder="Escribe el contenido del post..."
                value={form.body}
                onChange={handleChange}
                disabled={status === "loading"}
                rows={5}
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
                    Creando...
                  </>
                ) : (
                  "Crear post"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}