import { create } from "zustand";

export type ToastSeverity = "error" | "success" | "info" | "warning";

export interface ToastItem {
  id: string;
  message: string;
  severity: ToastSeverity;
}

interface ToastState {
  toasts: ToastItem[];
  showToast: (message: string, severity?: ToastSeverity) => void;
  showError: (message: string) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>()((set, get) => ({
  toasts: [],
  showToast: (message, severity = "info") => {
    const id = Math.random().toString(36).substring(2, 11);
    set((state) => ({
      toasts: [...state.toasts.slice(-4), { id, message, severity }],
    }));
  },
  showError: (message) => {
    get().showToast(message, "error");
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
