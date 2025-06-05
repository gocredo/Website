"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast as reactToast } from "react-toastify";

type ToastVariant = "default" | "destructive" | "success";

interface ToastOptions {
  title: string;
  description?: string;
}

export function useToast() {
  const router = useRouter();

  // Handle toasts from query parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    const success = params.get("success");

    if (error) {
      reactToast.error(error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: error,
      });
    }

    if (success) {
      reactToast.success(success, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: success,
      });
    }

    if (error || success) {
      // Remove query params without full reload
      router.replace(window.location.pathname, { scroll: false });
    }
  }, [router]);

  // Memoized toast function
  const toast = useCallback(
    ({ variant = "default", title, description }: ToastOptions & { variant?: ToastVariant }) => {
      const message = description ? `${title}\n${description}` : title;

      const config = {
        position: "top-right" as const,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        toastId: title,
      };

      switch (variant) {
        case "destructive":
          reactToast.error(message, config);
          break;
        case "success":
          reactToast.success(message, config);
          break;
        default:
          reactToast(message, config);
          break;
      }
    },
    []
  );

  return { toast };
}
