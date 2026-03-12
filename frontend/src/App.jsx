import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import EventDetail from './pages/EventDetail';
import CreateEvent from './pages/CreateEvent';

function App() {
  return (
    <BrowserRouter basename="/Social-events/">
      <div className="app-container">
        <Navbar />
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
