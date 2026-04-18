"use client";

import { useState, useCallback } from "react";
import { CreatePostForm, CreatePostStatus } from "../interfaces/CreatePostForm ";
import { createPost } from "./createpost";

const EMPTY_FORM: CreatePostForm = { title: "", body: "", userId: "" };

interface FormErrors {
  title?: string;
  body?: string;
  userId?: string;
}

function validate(form: CreatePostForm): FormErrors {
  const errors: FormErrors = {};

  if (!form.title.trim()) {
    errors.title = "El título es requerido.";
  } else if (form.title.trim().length < 5) {
    errors.title = "El título debe tener al menos 5 caracteres.";
  }

  if (!form.body.trim()) {
    errors.body = "El contenido es requerido.";
  } else if (form.body.trim().length < 10) {
    errors.body = "El contenido debe tener al menos 10 caracteres.";
  }

  if (!form.userId) {
    errors.userId = "Selecciona un usuario.";
  }

  return errors;
}

export function useCreatePost(onSuccess: () => void) {
  const [form, setForm] = useState<CreatePostForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<CreatePostStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setStatus("loading");
      setServerError(null);
      await createPost({
        title: form.title.trim(),
        body: form.body.trim(),
        userId: Number(form.userId),
      });
      setStatus("success");
      setTimeout(() => {
        setForm(EMPTY_FORM);
        setStatus("idle");
        onSuccess();
      }, 1800);
    } catch (err) {
      setStatus("error");
      setServerError(
        err instanceof Error ? err.message : "Error inesperado. Intenta de nuevo."
      );
    }
  }, [form, onSuccess]);

  const reset = useCallback(() => {
    setForm(EMPTY_FORM);
    setErrors({});
    setStatus("idle");
    setServerError(null);
  }, []);

  return { form, errors, status, serverError, handleChange, handleSubmit, reset };
}