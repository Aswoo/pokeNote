import React from "react";

const LoadingPokemonDetail = () => {
  return (
    <div className="container mx-auto p-4 animate-pulse">
      <div className="h-6 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center md:items-start">
        <div className="md:w-1/3 text-center mb-4 md:mb-0">
          <div className="mx-auto w-48 h-48 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div className="md:w-2/3 md:pl-8 w-full">
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>

          <div className="mb-4">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
            <div className="flex space-x-2">
              <div className="h-7 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
              <div className="h-7 w-20 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
            <div>
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>

          <div className="mb-4">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center mb-2">
                <div className="w-24 h-6 bg-gray-300 dark:bg-gray-700 rounded mr-2"></div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4"></div>
                <div className="ml-2 h-6 w-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>

          <div>
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mt-2"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPokemonDetail;
