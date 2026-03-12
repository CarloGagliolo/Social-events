import { useState, useEffect, useCallback } from 'react';
import { getEvent } from '../services/api';

export function useEvent(id) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(() => {
    if (!id) return;
    setLoading(true);
    getEvent(id)
      .then(data => { setEvent(data); setLoading(false); })
      .catch(err => { setError(err); setLoading(false); });
  }, [id]);

  useEffect(() => { fetch(); }, [fetch]);

  return { event, loading, error, refetch: fetch };
}
