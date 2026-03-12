import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../services/api';

const INITIAL_FORM = {
  titolo: '',
  descrizione: '',
  data_ora: '',
  luogo_nome: '',
  max_partecipanti: '6',
};

function CreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.titolo.trim()) newErrors.titolo = 'Il titolo è obbligatorio';
    if (!formData.luogo_nome.trim()) newErrors.luogo_nome = 'Il luogo è obbligatorio';
    if (!formData.data_ora) newErrors.data_ora = 'La data è obbligatoria';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) { setErrors(validation); return; }

    setLoading(true);
    try {
      const result = await createEvent({ ...formData, creatore_id: 1 });
      navigate(`/event/${result.id_evento}`);
    } catch {
      setErrors({ submit: 'Errore durante la creazione. Riprova.' });
      setLoading(false);
    }
  };

  return (
    <div className="page-fade-in">
      <div className="glass-card">
        <div className="create-header">
          <span className="create-header__icon">✨</span>
          <h2>Crea una nuova iniziativa</h2>
          <p className="create-header__sub">Bastano 4 informazioni per invitare il tuo gruppo</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="titolo">Cosa vuoi fare?</label>
            <input
              id="titolo"
              type="text"
              className={`form-control ${errors.titolo ? 'form-control--error' : ''}`}
              name="titolo"
              value={formData.titolo}
              onChange={handleChange}
              placeholder="es. Aperitivo al Bar Magenta, Trekking in collina..."
            />
            {errors.titolo && <span className="field-error">{errors.titolo}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="descrizione">Descrizione <span className="label-optional">(opzionale)</span></label>
            <textarea
              id="descrizione"
              className="form-control"
              name="descrizione"
              value={formData.descrizione}
              onChange={handleChange}
              placeholder="Racconta lo spirito della serata..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="luogo_nome">Dove vi trovate?</label>
            <input
              id="luogo_nome"
              type="text"
              className={`form-control ${errors.luogo_nome ? 'form-control--error' : ''}`}
              name="luogo_nome"
              value={formData.luogo_nome}
              onChange={handleChange}
              placeholder="es. Pizzeria Da Michele, Roma"
            />
            {errors.luogo_nome && <span className="field-error">{errors.luogo_nome}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="data_ora">Quando?</label>
              <input
                id="data_ora"
                type="datetime-local"
                className={`form-control ${errors.data_ora ? 'form-control--error' : ''}`}
                name="data_ora"
                value={formData.data_ora}
                onChange={handleChange}
              />
              {errors.data_ora && <span className="field-error">{errors.data_ora}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="max_partecipanti">Max Partecipanti</label>
              <select
                id="max_partecipanti"
                className="form-control"
                name="max_partecipanti"
                value={formData.max_partecipanti}
                onChange={handleChange}
              >
                <option value="4">🍷 Intimo (4 persone)</option>
                <option value="6">🍻 Aperitivo (6 persone)</option>
                <option value="8">🍝 Cena (8 persone)</option>
                <option value="10">🏕️ Camerata (10 persone)</option>
                <option value="15">🎉 Gruppo ampio (15 persone)</option>
              </select>
            </div>
          </div>

          {errors.submit && (
            <div className="form-error-banner">{errors.submit}</div>
          )}

          <div className="mt-4">
            <button type="submit" className="btn btn-full" disabled={loading}>
              {loading ? (
                <span className="btn-loading">
                  <span className="btn-loading__dot"></span>
                  <span className="btn-loading__dot"></span>
                  <span className="btn-loading__dot"></span>
                  Pubblicazione...
                </span>
              ) : '🚀 Pubblica Evento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEvent;
