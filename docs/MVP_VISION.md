# Social Events - MVP Vision & Strategy

Questo documento riassume la visione originale, l'analisi del target e le decisioni strategiche prese prima di iniziare lo sviluppo dell'App (Minimum Viable Product). Serve come "Stella Polare" per non perdere il focus durante gli sviluppi futuri.

## 1. Il Problema e l'Obiettivo Principale
L'obiettivo primario dell'applicazione è **combattere la solitudine** e aiutare le persone a ricostruire o ampliare il proprio giro di amicizie nel mondo reale, specialmente nelle grandi città o in seguito a cambiamenti di vita (es. trasferimenti, separazioni).

## 2. Il Target "Zero" (Il pubblico iniziale)
Abbiamo deciso di focalizzarci in modo chirurgico su una specifica fascia demografica per il lancio iniziale:
- **Età:** Adulti tra i 35 e i 50 anni.
- **Profilo:** Persone che lavorano molto, magari separate o divorziate, che faticano a ricostruire un giro di amicizie solido. 
- **Caratteristiche:** Hanno potere di spesa, ma cercano connessioni **autentiche** (amicizia/community) e rifuggono le meccaniche superficiali delle classiche app di dating.

## 3. La Dinamica di Incontro
Tra i vari modelli esplorati, abbiamo scelto l'approccio **"Dall'evento all'amicizia"** con un fattore di aggregazione specifico:
- **Il "Tavolo da 6":** In Italia la convivialità è il miglior rompighiaccio. Strutturare gli eventi per piccoli gruppi (es. un tavolo da 6 per un aperitivo o una cena, o piccoli gruppi di trekking) riduce drasticamente l'imbarazzo dell'incontro 1-a-1 e diluisce la pressione sociale.
- **C2C (Consumer to Consumer):** Inizialmente avevamo ipotizzato un modello dove i locali pagassero per ospitare gli eventi. Per validare l'idea più velocemente, abbiamo "pivottato" verso un modello *Community-Led*: **gli utenti creano e gestiscono gli eventi per gli altri utenti**. Questo abbassa a zero la barriera di adozione e semplifica enormemente lo sviluppo iniziale dell'App.

## 4. Sicurezza, Fiducia e Moderazione (Sfide aperte)
Il tema della diffidenza è centrale in Italia. Nel modello C2C, la piattaforma deve garantire:
- Eventi iniziali in luoghi pubblici riconosciuti o convenzionati.
- Requisito di una foto profilo chiara ("rassicurante").
- (Futuro) Un sistema di feedback a 2 vie dopo gli eventi, per premiare gli utenti virtuosi e allontanare comportamenti inappropriati (es. chi usa l'app come speed-dating aggressivo).
- (Futuro) Un sistema a 'caparra' o crediti per limitare il fenomeno dei "No-Show" (chi prenota e non si presenta), estremamente dannoso per la fiducia nella community.

## 5. Il Modello di Business (Posticipato)
Per l'MVP, l'acquisizione e l'engagement degli utenti hanno la precedenza sulla monetizzazione ("Fake it till you make it").
In futuro, raggiunta una massa critica locale (es. dominando un singolo quartiere o città), si potrà introdurre:
- Convenzioni con i locali/ristoranti (es. fee su tavolo prenotato tramite app).
- Modelli freemium per gli utenti (es. funzioni di filtro avanzate).

## 6. Il Dettaglio Tecnologico dell'MVP
Data l'esigenza di lanciare velocemente e raccogliere feedback, l'app iniziale è stata snellita all'essenziale:
1. **Esplora:** Una bacheca chiara con gli eventi futuri filtrabili per data/luogo.
2. **Partecipa:** Un sistema di RSVP rapido per prendere uno dei famosi "6 posti".
3. **Crea:** Un modulo in 4 campi per permettere a chiunque di fare da "host" (Ospite).

Lo stack è moderno ma solido: **React (Frontend) + Node.js (Backend) + MySQL (DB)**, inserito all'interno di un sistema containerizzato Docker per garantire replicabilità su qualsiasi ambiente.
