import React from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { it } from 'date-fns/locale';

function EventCard({ event }) {
  const { id_evento, titolo, data_ora, luogo_nome, creatore_nome, creatore_foto, max_partecipanti, iscritti_attuali } = event;
  const liberi = max_partecipanti - iscritti_attuali;
  const dataFormattata = format(parseISO(data_ora), "eeee d MMMM • HH:mm", { locale: it });
  const isFull = liberi <= 0;

  return (
    <Link to={`/event/${id_evento}`} className="event-card glass-card">
      <div className="event-card__date">{dataFormattata}</div>
      <div className="event-card__title">{titolo}</div>
      <div className="event-card__location">
        <span className="location-icon">📍</span>
        {luogo_nome}
      </div>

      <div className="event-card__footer">
        <div className="organizer">
          <img
            src={creatore_foto}
            alt={creatore_nome}
            className="avatar avatar--sm"
          />
          <span className="organizer__name">da {creatore_nome}</span>
        </div>

        <span className={`spots-badge ${isFull ? 'spots-badge--full' : ''}`}>
          {isFull ? 'Completo' : `${liberi} posti liberi`}
        </span>
      </div>
    </Link>
  );
}

export default EventCard;
