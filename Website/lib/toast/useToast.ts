"use client";

import { useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast as reactToast } from "react-toastify";

type ToastVariant = "default" | "destructive" | "success";

interface ToastOptions {
  title: string;
  description?: string;
}

export function useToast() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Handle toasts from query parameters
  useEffect(() => {
    const error = searchParams.get("error");
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
      router.replace(window.location.pathname, { scroll: false });
    }

    const success = searchParams.get("success");
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
      router.replace(window.location.pathname, { scroll: false });
    }
  }, [searchParams, router]);

  // Memoized toast function
  const toast = useCallback(
    ({ variant = "default", title, description }: ToastOptions & { variant?: ToastVariant }) => {
      const message = description ? `${title}\n${description}` : title;

      switch (variant) {
        case "destructive":
          reactToast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            toastId: title,
          });
          break;
        case "success":
          reactToast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            toastId: title,
          });
          break;
        default:
          reactToast(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            toastId: title,
          });
          break;
      }
    },
    []
  );

  return { toast };
}