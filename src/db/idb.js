import { openDB } from 'idb';

const DB_NAME = 'habitTrackerDB';
const STORE_NAME = 'habits';

export const initDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const getAllHabits = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

export const saveHabit = async (habit) => {
  const db = await initDB();
  await db.put(STORE_NAME, habit);
};

export const saveAllHabits = async (habits) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  for (const habit of habits) {
    tx.store.put(habit);
  }
  await tx.done;
};

export const clearHabits = async () => {
  const db = await initDB();
  await db.clear(STORE_NAME);
};
