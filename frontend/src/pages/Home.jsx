import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Usa l'API esposta dal backend Docker, se non c'è usa localhost
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    axios.get(`${apiUrl}/api/events`)
      .then(res => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div>Caricamento eventi in corso...</div>;

  return (
    <div>
      <div className="flex-between mb-4">
        <h2>Prossimi Eventi</h2>
      </div>

      {events.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <h3>Nessun evento in programma</h3>
          <p className="mt-4" style={{ color: 'var(--text-muted)' }}>Sii il primo a creare qualcosa di speciale nella tua zona!</p>
          <Link to="/create" className="btn mt-4">Organizza Ora</Link>
        </div>
      ) : (
        events.map(ev => (
          <Link to={`/event/${ev.id_evento}`} key={ev.id_evento} className="glass-card">
            <div className="event-date">
              {format(parseISO(ev.data_ora), "eeee d MMMM • HH:mm", { locale: it })}
            </div>
            <div className="event-title">{ev.titolo}</div>
            <div className="event-location">
              📍 {ev.luogo_nome}
            </div>
            
            <div className="flex-between" style={{ marginTop: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src={ev.creatore_foto} alt={ev.creatore_nome} className="avatar" style={{ marginLeft: 0 }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Organizzato da {ev.creatore_nome}</span>
              </div>
              
              <div className="spots-badge">
                {ev.max_partecipanti - ev.iscritti_attuali} posti liberi
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default Home;
