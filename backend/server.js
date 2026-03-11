const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Verifica di funzionamento base
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

// GET Tutti gli eventi
app.get('/api/events', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT e.*, u.nome_display as creatore_nome, u.foto_profilo as creatore_foto,
            (SELECT COUNT(*) FROM Partecipazioni p WHERE p.evento_id = e.id_evento) as iscritti_attuali
            FROM Events e
            JOIN Users u ON e.creatore_id = u.id_utente
            WHERE e.stato = 'Attivo'
            ORDER BY e.data_ora ASC
        `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Errore nel recupero degli eventi' });
    }
});

// GET Dettaglio singolo evento
app.get('/api/events/:id', async (req, res) => {
    try {
        const [events] = await db.query(`
            SELECT e.*, u.nome_display as creatore_nome, u.foto_profilo as creatore_foto
            FROM Events e
            JOIN Users u ON e.creatore_id = u.id_utente
            WHERE e.id_evento = ?
        `, [req.params.id]);

        if (events.length === 0) return res.status(404).json({ error: 'Evento non trovato' });

        const [iscritti] = await db.query(`
            SELECT u.id_utente, u.nome_display, u.foto_profilo 
            FROM Partecipazioni p
            JOIN Users u ON p.utente_id = u.id_utente
            WHERE p.evento_id = ?
        `, [req.params.id]);

        res.json({ ...events[0], iscritti });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Errore nel recupero dell\'evento' });
    }
});

// POST Crea nuovo evento
app.post('/api/events', async (req, res) => {
    try {
        const { titolo, descrizione, data_ora, luogo_nome, max_partecipanti, creatore_id } = req.body;
        
        // Semplice validazione
        if (!titolo || !data_ora || !luogo_nome || !max_partecipanti) {
            return res.status(400).json({ error: 'Campi obbligatori mancanti' });
        }

        const [result] = await db.query(`
            INSERT INTO Events (titolo, descrizione, data_ora, luogo_nome, max_partecipanti, creatore_id) 
            VALUES (?, ?, ?, ?, ?, ?)
        `, [titolo, descrizione, data_ora, luogo_nome, parseInt(max_partecipanti), creatore_id || 1]);

        // Cerca di aggiungere il creatore anche come primo iscritto
        await db.query(`INSERT INTO Partecipazioni (evento_id, utente_id) VALUES (?, ?)`, [result.insertId, creatore_id || 1]);

        res.status(201).json({ id_evento: result.insertId, message: 'Evento creato con successo' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Errore nella creazione dell\'evento' });
    }
});

// POST Partecipa a un evento
app.post('/api/events/:id/join', async (req, res) => {
    try {
        const { utente_id } = req.body; // In un'app reale l'ID verrebbe dal token di sessione, per il test passiamo l'ID
        const evento_id = req.params.id;

        const [event] = await db.query('SELECT max_partecipanti FROM Events WHERE id_evento = ?', [evento_id]);
        if (event.length === 0) return res.status(404).json({ error: 'Evento non trovato' });

        const [iscritti] = await db.query('SELECT COUNT(*) as count FROM Partecipazioni WHERE evento_id = ?', [evento_id]);
        
        if (iscritti[0].count >= event[0].max_partecipanti) {
            return res.status(400).json({ error: 'Evento al completo' });
        }

        await db.query(`INSERT INTO Partecipazioni (evento_id, utente_id) VALUES (?, ?)`, [evento_id, utente_id || 1]);
        res.json({ message: 'Iscrizione effettuata con successo' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
             return res.status(400).json({ error: 'Sei già iscritto a questo evento' });
        }
        console.error(error);
        res.status(500).json({ error: 'Errore durante l\'iscrizione' });
    }
});

app.listen(port, () => {
    console.log(`Server Express in ascolto sulla porta ${port}`);
});
