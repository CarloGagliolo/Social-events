import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';
import { useEvent } from '../hooks/useEvent';
import { joinEvent } from '../services/api';
import AvatarGroup from '../components/AvatarGroup';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { event, loading, error, refetch } = useEvent(id);
  const [joinStatus, setJoinStatus] = useState('idle'); // idle | loading | success | error
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleJoin = async () => {
    setJoinStatus('loading');
    try {
      await joinEvent(id, 1);
      setJoinStatus('success');
      showToast("🎉 Iscrizione confermata! Ci vediamo all'evento!");
      refetch();
    } catch (err) {
      setJoinStatus('error');
      showToast(err.response?.data?.error || "Errore durante l'iscrizione", 'error');
      setTimeout(() => setJoinStatus('idle'), 2000);
    }
  };

  if (loading) return <LoadingSpinner text="Caricamento evento..." />;
  if (error || !event) return (
    <EmptyState icon="🔍" title="Evento non trovato" subtitle="Torna alla home e riprova." ctaText="← Torna alla Home" ctaTo="/" />
  );

  const isFull = event.iscritti.length >= event.max_partecipanti;

  return (
    <div className="page-fade-in">
      {/* Toast notification */}
      {toast && (
        <div className={`toast toast--${toast.type}`}>
          {toast.msg}
        </div>
      )}

      <button onClick={() => navigate(-1)} className="btn btn-secondary btn-back">
        ← Indietro
      </button>

      <div className="glass-card detail-card">
        <div className="event-date" style={{ fontSize: '1rem', marginBottom: '8px' }}>
          {format(parseISO(event.data_ora), "eeee d MMMM yyyy • HH:mm", { locale: it })}
        </div>

        <h1 className="detail-title">{event.titolo}</h1>

        <div className="event-location" style={{ fontSize: '1.05rem', margin: '12px 0' }}>
          📍 {event.luogo_nome}
        </div>

        {event.descrizione && (
          <div className="detail-description">{event.descrizione}</div>
        )}

        <div className="detail-footer">
          <div className="organizer-row">
            <img src={event.creatore_foto} alt={event.creatore_nome} className="avatar" />
            <div>
              <span className="organizer-label">Organizzato da</span>
              <span className="organizer-name">{event.creatore_nome}</span>
            </div>
          </div>

          <AvatarGroup
            participants={event.iscritti}
            total={event.iscritti.length}
            max={event.max_partecipanti}
          />
        </div>

        <div className="detail-cta">
          <button
            className="btn btn-full"
            onClick={handleJoin}
            disabled={isFull || joinStatus === 'loading' || joinStatus === 'success'}
            style={{ opacity: (isFull || joinStatus === 'success') ? 0.6 : 1 }}
          >
            {joinStatus === 'loading' ? 'Attendere...' :
             joinStatus === 'success' ? '✓ Sei iscritto!' :
             isFull ? '🔒 Sold Out' :
             'Partecipa all\'Evento'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;
