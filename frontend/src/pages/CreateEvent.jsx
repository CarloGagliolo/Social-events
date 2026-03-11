import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titolo: '',
    descrizione: '',
    data_ora: '',
    luogo_nome: '',
    max_partecipanti: '6' // Default "Tavolo da 6"
  });

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/events`, {
        ...formData,
        creatore_id: 1 // Hardcoded: assumiamo di essere Carlo (ID 1)
      });
      alert('Evento creato con successo!');
      navigate(`/event/${response.data.id_evento}`);
    } catch (err) {
      alert('Errore durante la creazione.');
      setLoading(false);
    }
  };

  return (
    <div className="glass-card">
      <h2 style={{ marginBottom: '25px', textAlign: 'center' }}>Crea una nuova iniziativa</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Cosa vuoi fare?</label>
          <input type="text" className="form-control" name="titolo" value={formData.titolo} onChange={handleChange} placeholder="es. Aperitivo al Bar Magenta, Trekking in collina..." required />
        </div>

        <div className="form-group">
          <label>Descrizione (opzionale ma consigliata)</label>
          <textarea className="form-control" name="descrizione" value={formData.descrizione} onChange={handleChange} placeholder="Racconta lo spirito della serata..." rows="3"></textarea>
        </div>

        <div className="form-group">
          <label>Dove vi trovate?</label>
          <input type="text" className="form-control" name="luogo_nome" value={formData.luogo_nome} onChange={handleChange} placeholder="es. Pizzeria Da Michele, Roma" required />
        </div>

        <div className="flex-between">
          <div className="form-group" style={{ width: '48%' }}>
            <label>Quando?</label>
            <input type="datetime-local" className="form-control" name="data_ora" value={formData.data_ora} onChange={handleChange} required />
          </div>

          <div className="form-group" style={{ width: '48%' }}>
            <label>Max Partecipanti</label>
            <select className="form-control" name="max_partecipanti" value={formData.max_partecipanti} onChange={handleChange}>
              <option value="4">Intimo (4 persone)</option>
              <option value="6">Tavolo Aperitivo (6 persone)</option>
              <option value="8">Tavolo Cena (8 persone)</option>
              <option value="10">Camerata (10 persone)</option>
              <option value="15">Gruppo ampio (15 persone)</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <button type="submit" className="btn btn-full" disabled={loading}>
            {loading ? 'Pubblicazione...' : 'Pubblica Evento'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEvent;
