import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

export const getEvents = () => api.get('/api/events').then(r => r.data);

export const getEvent = (id) => api.get(`/api/events/${id}`).then(r => r.data);

export const createEvent = (data) => api.post('/api/events', data).then(r => r.data);

export const joinEvent = (id, utente_id = 1) =>
  api.post(`/api/events/${id}/join`, { utente_id }).then(r => r.data);

export default api;
