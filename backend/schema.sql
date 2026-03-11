CREATE DATABASE IF NOT EXISTS social_events;
USE social_events;

CREATE TABLE IF NOT EXISTS Users (
    id_utente INT AUTO_INCREMENT PRIMARY KEY,
    nome_display VARCHAR(100) NOT NULL,
    eta INT NOT NULL,
    foto_profilo VARCHAR(255) NOT NULL,
    bio_breve VARCHAR(150),
    email VARCHAR(100) UNIQUE NOT NULL,
    data_iscrizione TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Events (
    id_evento INT AUTO_INCREMENT PRIMARY KEY,
    titolo VARCHAR(150) NOT NULL,
    descrizione TEXT,
    data_ora DATETIME NOT NULL,
    luogo_nome VARCHAR(200) NOT NULL,
    max_partecipanti INT NOT NULL,
    creatore_id INT NOT NULL,
    stato ENUM('Attivo', 'Passato', 'Annullato') DEFAULT 'Attivo',
    FOREIGN KEY (creatore_id) REFERENCES Users(id_utente) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Partecipazioni (
    id_partecipazione INT AUTO_INCREMENT PRIMARY KEY,
    evento_id INT NOT NULL,
    utente_id INT NOT NULL,
    data_prenotazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (evento_id) REFERENCES Events(id_evento) ON DELETE CASCADE,
    FOREIGN KEY (utente_id) REFERENCES Users(id_utente) ON DELETE CASCADE,
    UNIQUE(evento_id, utente_id)
);

-- Inseriamo qualche dato finto per poter testare l'app subito
INSERT IGNORE INTO Users (id_utente, nome_display, eta, foto_profilo, bio_breve, email) VALUES
(1, 'Carlo M.', 38, 'https://i.pravatar.cc/150?u=1', 'Amo la tecnologia e la buona cucina', 'carlo@example.com'),
(2, 'Laura B.', 42, 'https://i.pravatar.cc/150?u=2', 'Adoro il trekking e il cinema', 'laura@example.com');

INSERT IGNORE INTO Events (id_evento, titolo, descrizione, data_ora, luogo_nome, max_partecipanti, creatore_id) VALUES
(1, 'Aperitivo in centro', 'Ci troviamo per bere una birra e fare due chiacchiere sulle serie TV.', '2026-04-10 19:30:00', 'Bar Magenta, Milano', 6, 1);

INSERT IGNORE INTO Partecipazioni (evento_id, utente_id) VALUES
(1, 1),
(1, 2);
