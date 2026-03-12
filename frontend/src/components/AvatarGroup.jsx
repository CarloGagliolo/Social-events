import React from 'react';

const MAX_VISIBLE = 5;

function AvatarGroup({ participants, total, max }) {
  const visible = participants.slice(0, MAX_VISIBLE);
  const overflow = participants.length - MAX_VISIBLE;

  return (
    <div className="avatar-group-wrapper">
      <div className="avatar-group">
        {visible.map((p) => (
          <img
            key={p.id_utente}
            src={p.foto_profilo}
            alt={p.nome_display}
            title={p.nome_display}
            className="avatar"
          />
        ))}
        {overflow > 0 && (
          <div className="avatar avatar--overflow">+{overflow}</div>
        )}
      </div>
      <span className="avatar-group__count">
        {total}/{max} partecipanti
      </span>
    </div>
  );
}

export default AvatarGroup;
