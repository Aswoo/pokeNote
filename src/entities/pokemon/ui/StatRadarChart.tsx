'use client';

import React from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ChartData } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import type { PokemonStat } from '@/shared/types/pokemon';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface StatRadarChartProps {
  stats: PokemonStat[];
}

const StatRadarChart: React.FC<StatRadarChartProps> = ({ stats }) => {
  const statNames = stats.map(stat => 
    stat.stat.name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  );
  const statValues = stats.map(stat => stat.base_stat);

  const data: ChartData<'radar'> = {
    labels: statNames,
    datasets: [
      {
        label: 'Base Stats',
        data: statValues,
        backgroundColor: 'rgba(255, 204, 0, 0.4)', // Pokémon Yellow-ish
        borderColor: 'rgba(59, 130, 246, 0.8)', // Pokémon Blue-ish
        borderWidth: 2,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)'
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        grid: {
            color: 'rgba(0, 0, 0, 0.05)'
        },
        suggestedMin: 0,
        suggestedMax: 160,
        pointLabels: {
            font: {
                size: 14,
                weight: 'bold',
                family: `'Press Start 2P', cursive` // A retro game font
            },
            color: '#333'
        },
        ticks: {
            backdropColor: 'transparent',
            stepSize: 40,
            font: {
                size: 10
            }
        }
      },
    },
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            callbacks: {
                label: function(context) {
                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.r !== null) {
                        label += context.parsed.r;
                    }
                    return label;
                }
            }
        }
    }
  };

  return <Radar data={data} options={options} />;
};

export default StatRadarChart;
