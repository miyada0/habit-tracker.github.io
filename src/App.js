// ✅ App.js with habit removal (no dark mode)
import React, { useEffect, useState } from 'react';
import AddHabit from './components/AddHabit';
import HabitList from './components/HabitList';
import ProgressChart from './components/ProgressChart';
import { getAllHabits, saveAllHabits } from './db/idb';

function App() {
  const [habits, setHabits] = useState([]);
  const [filter, setFilter] = useState('');

  const today = new Date().toDateString();

  useEffect(() => {
    const loadHabits = async () => {
      const stored = await getAllHabits();
      setHabits(stored);
    };
    loadHabits();
  }, []);

  useEffect(() => {
    if (habits.length > 0) {
      saveAllHabits(habits);
    }
  }, [habits]);

  const addHabit = (name) => {
    const newHabit = {
      id: Date.now(),
      name,
      streak: 0,
      lastCheckIn: null,
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const checkInHabit = (id) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === id) {
        if (habit.lastCheckIn !== today) {
          return {
            ...habit,
            streak: habit.streak + 1,
            lastCheckIn: today,
          };
        }
      }
      return habit;
    });
    setHabits(updatedHabits);
  };

  const deleteHabit = (id) => {
    const filtered = habits.filter((habit) => habit.id !== id);
    setHabits(filtered);
  };

  const hasCheckedInToday = habits.some((h) => h.lastCheckIn === today);

  const filteredHabits = habits.filter((h) =>
    h.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold text-blue-600 mb-4 text-center">Habit Tracker</h1>


        {!hasCheckedInToday && (
          <p className="bg-yellow-100 text-yellow-800 p-2 mb-4 text-center rounded">
            ⏰ Don’t forget to check in your habits today!
          </p>
        )}

        <input
          type="text"
          placeholder="🔍 Search habits..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
        />

        <AddHabit onAdd={addHabit} />
        <HabitList habits={filteredHabits} onCheckIn={checkInHabit} onDelete={deleteHabit} />
        <ProgressChart habits={habits} />
      </div>
    </div>
  );
}

export default App;