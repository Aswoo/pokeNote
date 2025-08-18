'use client';

import React from 'react';
import { GenerationListItem } from '@/shared/api/pokeapi';

interface GenerationFilterProps {
  generations: GenerationListItem[];
  selectedGeneration: string;
  onSelectGeneration: (url: string) => void;
}

const GenerationFilter: React.FC<GenerationFilterProps> = ({
  generations,
  selectedGeneration,
  onSelectGeneration,
}) => {
  return (
    <div className="mb-6 flex justify-center">
      <select
        value={selectedGeneration}
        onChange={(e) => onSelectGeneration(e.target.value)}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Generations</option>
        {generations.map((gen) => (
          <option key={gen.name} value={gen.url}>
            {gen.name.replace('generation-', 'Generation ')}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenerationFilter;