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
