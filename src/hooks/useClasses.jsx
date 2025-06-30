import { useState, useEffect } from 'react';

const STORAGE_KEY = 'zumbaClasses';

export default function useClasses() {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setClasses(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse classes from localStorage', e);
      }
    }
  }, []);

  const addClass = (newClass) => {
    setClasses((prev) => {
      const updated = [...prev, newClass];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return { classes, addClass };
}
