# Social Events MVP

Un'applicazione (Minimum Viable Product) progettata per combattere la solitudine aiutando le persone (in particolare la fascia d'età 35-50 anni) a incontrarsi nel mondo reale attraverso piccoli eventi informali, come un aperitivo o una cena in 6 persone.

## L'Idea di Base 💡
L'utente può:
1. Vedere gli eventi organizzati nella sua zona
2. Partecipare a un evento esistente 
3. Proporre un nuovo evento definendo data, luogo e numero massimo di partecipanti.

L'approccio è C2C (Consumer to Consumer): le iniziative partono direttamente dagli utenti.

## Stack Tecnologico 🛠️
Il progetto è stato sviluppato con tecnologie moderne e un approccio 100% "Dockerizzato" per facilitare l'avvio locale:
- **Frontend**: React (Vite) + CSS Custom "Glassmorphism"
- **Backend API**: Node.js + Express
- **Database**: MySQL 8.0
- **Orchestrazione**: Docker Compose

## Come avviare l'applicazione in locale 🚀

### Prerequisiti
Devi avere **DockerDesktop** (o Docker Engine) e Docker Compose installati e in esecuzione sul tuo computer.

### Passaggi
1. Clona questo repository:
   ```bash
   git clone https://github.com/CarloGagliolo/social-events.git
   cd social-events
   ```

2. Avvia i container con Docker Compose:
   ```bash
   docker-compose up -d --build
   ```

   *Attendi un minuto o due* affinché Docker scarichi le immagini, avvii il database MySQL, attenda che sia pronto, e infine avvii il backend Node e il frontend Vite. 
   > Al primissimo avvio, il database MySQL esegue lo script `schema.sql` che popola il DB con alcuni utenti fittizi ed eventi di prova.

3. **Accedi all'applicazione**:
   - **Frontend (L'App Utente)**: Apri il browser all'indirizzo `http://localhost:5173`
   - **Backend API**: Risponde all'indirizzo `http://localhost:3000` (es. `http://localhost:3000/api/health`)
   - **Database**: Esposto localmente sulla porta `3306` (Utente: `eventuser` Pass: `eventpassword`)

### Comandi utili
Per vedere i log in tempo reale dei container:
```bash
docker-compose logs -f
```

Per fermare l'applicazione senza perdere i dati (i dati del DB restano salvati nel volume di Docker):
```bash
docker-compose down
```

Per fermare l'applicazione e **resettare** anche il Database (eliminando il volume con tutti i dati finti):
```bash
docker-compose down -v
```

## Sviluppi futuri previsti (Roadmap)
- Sistema Autenticazione reale (JWT/OAuth)
- Algoritmo di abbinamento in base agli interessi
- Chat di gruppo sbloccabile 24h prima dell'evento
- Mappa interattiva
