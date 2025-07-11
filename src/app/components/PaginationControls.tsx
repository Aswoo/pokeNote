'use client';

import React from 'react';

interface PaginationControlsProps {
  onPrevPage: () => void;
  onNextPage: () => void;
  disablePrev: boolean;
  disableNext: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  onPrevPage,
  onNextPage,
  disablePrev,
  disableNext,
}) => {
  return (
    <div className="flex justify-between mt-8">
      <button
        onClick={onPrevPage}
        disabled={disablePrev}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button
        onClick={onNextPage}
        disabled={disableNext}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
