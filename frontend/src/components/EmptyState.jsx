import React from 'react';
import { Link } from 'react-router-dom';

function EmptyState({ icon = '🎉', title, subtitle, ctaText, ctaTo }) {
  return (
    <div className="glass-card empty-state">
      <div className="empty-state__icon">{icon}</div>
      <h3 className="empty-state__title">{title}</h3>
      {subtitle && <p className="empty-state__subtitle">{subtitle}</p>}
      {ctaText && ctaTo && (
        <Link to={ctaTo} className="btn mt-4">
          {ctaText}
        </Link>
      )}
    </div>
  );
}

export default EmptyState;
