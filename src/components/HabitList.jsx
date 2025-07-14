import React from 'react';
import HabitCard from './HabitCard';

const HabitList = ({ habits, onCheckIn, onDelete }) => {
  return (
    <div>
      {habits.length === 0 ? (
        <p className="text-gray-500">No habits added yet.</p>
      ) : (
        habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onCheckIn={onCheckIn}
            onDelete={onDelete} // ✅ Added delete handler
          />
        ))
      )}
    </div>
  );
};

export default HabitList;
