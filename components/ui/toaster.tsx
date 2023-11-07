"use client";

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { title } from "process";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        variant,
        ...props
      }) {
        return (
          <Toast
            className={`${
              variant == "destructive" ? "bg-red-500" : "bg-green-300"
            } border light-border`}
            key={id}
            {...props}
          >
            <div className="grid gap-1">
              {title && (
                <ToastTitle
                  className={`${
                    variant == "destructive"
                      ? "text-dark100_light900"
                      : "text-black"
                  }`}
                >
                  {title}
                </ToastTitle>
              )}
              {description && (
                <ToastDescription className="text-dark100_light900">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
