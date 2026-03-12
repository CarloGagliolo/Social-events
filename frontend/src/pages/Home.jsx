import React from 'react';
import { useEvents } from '../hooks/useEvents';
import EventCard from '../components/EventCard';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';

function Home() {
  const { events, loading, error } = useEvents();

  if (loading) return <LoadingSpinner text="Caricamento eventi..." />;

  if (error) return (
    <EmptyState
      icon="⚠️"
      title="Connessione al server assente"
      subtitle="Assicurati che il backend sia in esecuzione su Docker."
    />
  );

  return (
    <div className="page-fade-in">
      <div className="flex-between mb-4">
        <h2>Prossimi Eventi</h2>
        <span className="events-count">{events.length} in programma</span>
      </div>

      {events.length === 0 ? (
        <EmptyState
          icon="🎉"
          title="Nessun evento in programma"
          subtitle="Sii il primo a creare qualcosa di speciale nella tua zona!"
          ctaText="Organizza Ora"
          ctaTo="/create"
        />
      ) : (
        events.map(ev => <EventCard key={ev.id_evento} event={ev} />)
      )}
    </div>
  );
}

export default Home;
