"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/molecules";

const ErrorComponent = ({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) => {
  const router = useRouter();

  const handleTryAgain = () => {
    reset();
    // router.push("/");
  };

  return (
    <div className="min-h-full flex items-center justify-center">
      <div className="background-light800_dark300 mb-10 shadow-lg rounded-lg p-8 max-w-md w-full light-border border">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-lg text-dark100_light900 mb-1">
          {error.message || "An error occurred."}
        </p>
        <p className="text-base mb-6 text-dark100_light900">
          {error.cause + "" || "An error occurred."}
        </p>
        <div className="flex items-center justify-between gap-10">
          <Button onClick={handleTryAgain} title="Try Again" />
          <Button
            type="gradient"
            title="Homepage"
            onClick={() => router.push("/")}
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
