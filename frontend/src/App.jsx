import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';

function App() {
  return (
    <BrowserRouter basename="/Social-events/">
      <div className="app-container">
        <header>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1>SocialEvents</h1>
          </Link>
          <Link to="/create" className="btn" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
            + Crea Evento
          </Link>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/create" element={<CreateEvent />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
