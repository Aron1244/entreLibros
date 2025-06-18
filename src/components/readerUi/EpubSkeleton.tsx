import React from "react";

const EpubSkeleton = () => (
  <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-primary-dark/80 animate-pulse-slow z-50">
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-3/4 h-2/3 bg-gray-300 rounded-lg mb-8" />
      <div className="w-1/2 h-6 bg-gray-200 rounded mb-4" />
      <div className="w-1/3 h-4 bg-gray-200 rounded mb-2" />
      <div className="w-1/4 h-4 bg-gray-200 rounded" />
    </div>
  </div>
);

export default EpubSkeleton;
