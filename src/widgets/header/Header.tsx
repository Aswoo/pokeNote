'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from '@/shared/lib/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`p-4 shadow-md ${theme === 'light' ? 'bg-gray-800 text-white' : 'bg-gray-900 text-gray-100'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <nav className="flex items-center">
          <Link href="/" className="text-2xl font-bold hover:text-gray-300 transition duration-300">
            Pokédex
          </Link>
          <Link href="/quiz" className="ml-6 text-lg hover:text-gray-300 transition duration-300">
            Quiz
          </Link>
          <Link href="/favorites" className="ml-6 text-lg hover:text-gray-300 transition duration-300 flex items-center">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            즐겨찾기
          </Link>
        </nav>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-md ${theme === 'light' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-700 hover:bg-gray-800 text-gray-100'} transition duration-300`}
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </header>
  );
};

export default Header;
