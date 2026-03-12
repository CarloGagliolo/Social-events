import { useState, useEffect } from 'react';
import { getEvents } from '../services/api';

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getEvents()
      .then(data => { if (!cancelled) { setEvents(data); setLoading(false); } })
      .catch(err => { if (!cancelled) { setError(err); setLoading(false); } });
    return () => { cancelled = true; };
  }, []);

  return { events, loading, error };
}
