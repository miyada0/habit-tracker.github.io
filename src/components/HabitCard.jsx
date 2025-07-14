import React from 'react';

const HabitCard = ({ habit, onCheckIn, onDelete }) => {
  return (
    <div className="border border-gray-300 rounded p-4 mb-3 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">{habit.name}</h2>
        <p className="text-sm text-gray-600">Streak: {habit.streak} days</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onCheckIn(habit.id)}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          ✅ Check-In
        </button>
        <button
          onClick={() => onDelete(habit.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
