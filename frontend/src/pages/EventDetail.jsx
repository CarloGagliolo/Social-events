import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joinStatus, setJoinStatus] = useState(''); // '', 'loading', 'success', 'error'

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    fetchEvent();
    // eslint-disable-next-line
  }, [id, apiUrl]);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/events/${id}`);
      setEvent(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    setJoinStatus('loading');
    try {
      // In un'app reale l'ID utente proverrebbe dal login. Qui simuliamo che sia Carlo (id: 1) o un utente fittizio (id: 2)
      await axios.post(`${apiUrl}/api/events/${id}/join`, { utente_id: 1 });
      setJoinStatus('success');
      alert("Iscrizione confermata! Ci vediamo all'evento!");
      fetchEvent(); // Ricarica per aggiornare gli avatar
    } catch (err) {
      setJoinStatus('error');
      alert(err.response?.data?.error || 'Errore durante l\'iscrizione');
    }
  };

  if (loading) return <div>Caricamento dettaglio...</div>;
  if (!event) return <div>Evento non trovato.</div>;

  const isFull = event.iscritti.length >= event.max_partecipanti;

  return (
    <div className="glass-card" style={{ padding: '30px' }}>
      <button onClick={() => navigate(-1)} className="btn btn-secondary mb-4" style={{ padding: '5px 12px', fontSize: '0.8rem' }}>
        ← Torna Indietro
      </button>

      <div className="event-date mb-4" style={{ fontSize: '1.1rem' }}>
        {format(parseISO(event.data_ora), "eeee d MMMM yyyy • HH:mm", { locale: it })}
      </div>
      
      <h1 className="event-title" style={{ fontSize: '1.8rem', background: 'none', WebkitTextFillColor: 'initial', color: 'var(--text-main)' }}>
        {event.titolo}
      </h1>
      
      <div className="event-location mt-4" style={{ fontSize: '1.1rem' }}>
        📍 {event.luogo_nome}
      </div>

      <div className="mt-4" style={{ background: 'rgba(255,255,255,0.5)', padding: '15px', borderRadius: '12px', color: '#555' }}>
        {event.descrizione}
      </div>

      <div className="mt-4 flex-between" style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '20px' }}>
        <div>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Membri Partecipanti ({event.iscritti.length}/{event.max_partecipanti})</span>
          <div className="avatar-group">
            {event.iscritti.map((iscritto) => (
              <img key={iscritto.id_utente} src={iscritto.foto_profilo} alt={iscritto.nome_display} className="avatar" title={iscritto.nome_display} />
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <img src={event.creatore_foto} alt={event.creatore_nome} className="avatar" style={{ margin: '0 0 5px 0' }} />
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Organizer: <br/>{event.creatore_nome}</div>
        </div>
      </div>

      <div className="mt-4" style={{ paddingTop: '20px' }}>
        <button 
          className="btn btn-full" 
          onClick={handleJoin}
          disabled={isFull || joinStatus === 'loading'}
          style={{ opacity: isFull ? 0.5 : 1, cursor: isFull ? 'not-allowed' : 'pointer' }}
        >
          {joinStatus === 'loading' ? 'Attendere...' : isFull ? 'Sold Out / Completo' : 'Partecipa all\'Evento'}
        </button>
      </div>
    </div>
  );
}

export default EventDetail;
