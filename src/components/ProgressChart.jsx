import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const ProgressChart = ({ habits }) => {
  const data = {
    labels: habits.map((h) => h.name),
    datasets: [
      {
        label: 'Streak (Days)',
        data: habits.map((h) => h.streak),
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 } },
    },
  };

  return (
    <div className="mt-8 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-3">📊 Your Habit Progress</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProgressChart;
