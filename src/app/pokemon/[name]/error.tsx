"use client";

import React, { useEffect } from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const PokemonDetailError = ({ error, reset }: ErrorProps) => {
  useEffect(() => {
    // 에러 리포팅 서비스에 로그를 전송할 수 있습니다. (e.g. Sentry)
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto p-4 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Something went wrong!
      </h2>
      <p className="mb-4">
        We couldn&apos;t fetch the Pokémon details. Please try again later.
      </p>
      <div className="space-x-4">
        <button
          onClick={() => reset()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Try again
        </button>
        <Link href="/" className="text-blue-500 hover:underline">
          &larr; Back to List
        </Link>
      </div>
    </div>
  );
};

export default PokemonDetailError;
