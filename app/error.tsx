"use client";
import React from "react";

import { useRouter } from "next/navigation";

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
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-lg text-error-500 mb-1">
          {error.message || "An error occurred."}
        </p>
        <p className="text-base mb-6">
          {error.cause + "" || "An error occurred."}
        </p>
        <div className="flex items-center justify-between">
          <button
            onClick={handleTryAgain}
            className="bg-blue-500 hover:bg-greyscale-800 text-white h-12 font-bold py-1 px-6 rounded-lg w-40"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push("/")}
            className="bg-primary-300 hover:bg-primary h-12 text-white font-bold py-1 px-6 rounded-lg w-40"
          >
            Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
