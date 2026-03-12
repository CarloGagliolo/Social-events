import React from 'react';

function LoadingSpinner({ text = 'Caricamento...' }) {
  return (
    <div className="spinner-container">
      <div className="spinner">
        <div className="spinner__ring"></div>
        <div className="spinner__ring spinner__ring--delay"></div>
      </div>
      {text && <p className="spinner__text">{text}</p>}
    </div>
  );
}

export default LoadingSpinner;
