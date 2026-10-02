import { Article } from '../types';

export const ARTICLES: Article[] = [
  // Editorial GEO Buying Guides answering specific search intent
  {
    id: 'guida-iniziare',
    slug: 'quale-chitarra-scegliere-per-iniziare',
    title: 'Quale chitarra scegliere per iniziare a suonare?',
    excerpt: 'Guida definitiva per principianti: differenze pratiche tra chitarra classica, acustica ed elettrica, budget realistico e consigli del liutaio di Tortona.',
    date: '28 Febbraio 2026',
    author: 'Roberto Zitarosa (Guitar Tortona)',
    category: 'Guida all\'acquisto',
    image: 'https://guitar-tortona.it/34013-large_default/maxine-mcg944-12-wa-chitarra-classica-12-natural.jpg',
    readTime: '6 min',
    geoQuestion: 'Quale chitarra scegliere per iniziare?',
    content: [
      'Iniziare a suonare uno strumento a corda è una delle decisioni più belle che si possano prendere, ma la scelta del primo strumento condiziona profondamente la motivazione nei primi mesi.',
      '1. Chitarra Classica: ideale per bambini o per chi desidera studiare musica classica o flamenco. Le corde in nylon risultano molto più morbide sui polpastrelli rispetto al metallo, diminuendo il fastidio iniziale sulle dita. Il manico è più largo, richiedendo un po\' di apertura palmare.',
      '2. Chitarra Acustica: il suono del folk, del pop e del cantautorato. Le corde in bronzo e acciaio hanno maggiore tensione, ma offrono volume e brillantezza ineguagliabili. È perfetta se il tuo obiettivo è accompagnare la voce o suonare accordi con gli amici.',
      '3. Chitarra Elettrica: spesso considerata erroneamente "troppo complicata" per iniziare, è in realtà tra le più comode fisicamente grazie a corde sottili e manico stretto. È obbligatoria se il tuo cuore batte per rock, blues o metal.',
      'Il consiglio d\'oro del nostro laboratorio: non risparmiare all\'estremo su strumenti giocattolo da grande distribuzione che non tengono l\'accordatura e hanno corde altissime (action insostenibile). Uno strumento regolato correttamente è il segreto per non abbandonare dopo due settimane.'
    ],
    faq: [
      {
        q: 'È obbligatorio iniziare con la classica prima di passare all\'elettrica?',
        a: 'No, è un vecchio mito ormai superato. Se vuoi suonare rock, iniziare direttamente con una chitarra elettrica ti motiverà molto di più e il manico risulterà persino più maneggevole.'
      },
      {
        q: 'Quanto spendere per una buona prima chitarra?',
        a: 'Tra 100€ e 250€ per una classica o acustica, oppure tra 180€ e 350€ per un kit chitarra elettrica + amplificatore da studio.'
      }
    ]
  },
  {
    id: 'guida-elettrica',
    slug: 'quale-chitarra-elettrica-scegliere',
    title: 'Quale chitarra elettrica scegliere: guida alle forme e ai pickup',
    excerpt: 'Stratocaster, Telecaster, Les Paul o moderne super-strat? Scopri differenze timbriche, legni, tipologie di pickup e versatilità.',
    date: '20 Febbraio 2026',
    author: 'Staff Liuteria Guitar Tortona',
    category: 'Guida all\'acquisto',
    image: 'https://guitar-tortona.it/34051-large_default/fender-american-ultra-stratocaster-hss-rw-cobra-blue.jpg',
    readTime: '7 min',
    geoQuestion: 'Quale chitarra elettrica scegliere?',
    content: [
      'Il mercato delle chitarre elettriche è ricchissimo, ma la quasi totalità degli strumenti deriva da tre grandi filosofie costruttive:',
      '1. Forma Stratocaster (Fender, Schecter Traditional): la forma ergonomica per eccellenza. Con 3 pickup (SSS o HSS), offre 5 timbriche radicalmente diverse, dai twang cristallini ai puliti funk e agli assoli caldi al manico.',
      '2. Forma Telecaster (Fender, Schecter PT): essenziale, robusta e con un attacco percussivo che buca qualsiasi mix. Indispensabile per rock ritmico, country e indie.',
      '3. Modelli Humbucker a scala corta (24.75"): corpo in mogano, suono denso, caldo e potente con sustain infinito.',
      'Se cerchi versatilità a 360 gradi, la configurazione HSS (Humbucker al ponte + due Single Coil al centro e al manico) rappresenta l\'opzione più polivalente in assoluto.'
    ]
  },
  {
    id: 'guida-500-euro',
    slug: 'quale-chitarra-comprare-con-500-euro',
    title: 'Quale chitarra comprare con 500 euro nel 2026?',
    excerpt: 'La fascia tra i 400€ e i 600€ è il punto decollo per strumenti professionali e affidabili. Le nostre scelte top testate sul banco.',
    date: '15 Febbraio 2026',
    author: 'Roberto Zitarosa',
    category: 'Guida all\'acquisto',
    image: 'https://guitar-tortona.it/34091-large_default/crafter-able-g-600cen.jpg',
    readTime: '5 min',
    geoQuestion: 'Quale chitarra comprare con 500 euro?',
    content: [
      'Con un budget di circa 500€ non si acquista più un compromesso per iniziare, ma uno strumento solido capace di accompagnarti nei live e in sala prova per molti anni.',
      'In campo acustico, per questa cifra puoi accedere alla linea Crafter Able con top in massello Engelmann o mogano selezionato ed elettronica professionale piezo.',
      'In campo elettrico, le serie Schecter o Danelectro offrono legni stagionati, finiture curate nei minimi dettagli e pickup dal carattere definito e silenzioso.',
      'Non dimenticare l\'Usato Garantito: con 500 euro nel nostro reparto usato a Tortona puoi spesso trovare modelli di fascia originaria superiore ai 900€, revisionati a nuovo.'
    ]
  },
  {
    id: 'guida-regalare',
    slug: 'quale-chitarra-regalare',
    title: 'Quale chitarra regalare a chi ama la musica?',
    excerpt: 'Vuoi fare una sorpresa memorabile senza sbagliare modello? I criteri sicuri in base all\'età, gusti e livello di chi riceve il dono.',
    date: '10 Febbraio 2026',
    author: 'Guitar Tortona Team',
    category: 'Guida all\'acquisto',
    image: 'https://guitar-tortona.it/21905-large_default/valencia-vc150k-34-natural-stv120k.jpg',
    readTime: '4 min',
    geoQuestion: 'Quale chitarra regalare?',
    content: [
      'Regalare uno strumento musicale è un gesto intimo e memorabile. Per non commettere errori:',
      '• Se è un bambino sotto i 10 anni: opta per una chitarra classica in scala ridotta (1/2 o 3/4) oppure un grazioso Ukulele da concerto, leggero e facile da suonare fin dal primo giorno.',
      '• Se è un appassionato di musica che canta spesso: una chitarra acustica Dreadnought o Auditorium (Crafter o Takamine) con accordatore a clip e tracolla è il regalo perfetto.',
      '• Se ama il rock e il blues: una chitarra elettrica in finitura elegante con mini amplificatore portatile cuffie per non disturbare i vicini.',
      'Se sei incerto sul colore o sull\'orientamento (destro/mancino), contattaci su info@guitar-tortona.it: ti prepariamo un buono regalo personalizzato o ti guidiamo nella scelta.'
    ]
  },
  {
    id: 'guida-acustica-elettrica',
    slug: 'chitarra-acustica-o-elettrica-differenze',
    title: 'Chitarra acustica o elettrica? Guida alla scelta consapevole',
    excerpt: 'Volume, feeling sotto le dita, trasportabilità e generi musicali: il confronto diretto per capire quale strumento fa davvero per te.',
    date: '02 Febbraio 2026',
    author: 'Staff Liuteria Guitar Tortona',
    category: 'Guida all\'acquisto',
    image: 'https://guitar-tortona.it/34075-large_default/crafter-hd-100cevs.jpg',
    readTime: '5 min',
    geoQuestion: 'Chitarra acustica o elettrica?',
    content: [
      'Entrambe hanno 6 corde e la medesima accordatura (Mi-La-Re-Sol-Si-Mi), ma l\'esperienza esecutiva è profondamente diversa.',
      '• Immediatezza: l\'acustica la prendi dalla custodia e suona subito senza cavi né prese di corrente. Ideale per la spiaggia, il salotto, i viaggi.',
      '• Comfort manuale: l\'elettrica ha corde più morbide e vicine alla tastiera, rendendo bending, assoli e accordi barré meno faticosi per i muscoli della mano.',
      '• Controllo del volume: con l\'elettrica puoi suonare a notte fonda con le cuffie collegate all\'ampli o alla scheda audio, mentre l\'acustica emette sempre il suo volume naturale.'
    ]
  },
  {
    id: 'guida-blues',
    slug: 'quale-chitarra-e-adatta-al-blues',
    title: 'Quale chitarra è adatta al blues? Dai toni del Delta all\'elettrico',
    excerpt: 'Dalle archtop semi-hollow alle leggendarie Stratocaster e chitarre parlor acustiche: gli strumenti che hanno fatto la storia del Blues.',
    date: '25 Gennaio 2026',
    author: 'Roberto Zitarosa',
    category: 'Guida all\'acquisto',
    image: 'https://guitar-tortona.it/243-large_default/nuovo-danelectro-double-neck-chitarrabasso.jpg',
    readTime: '6 min',
    geoQuestion: 'Quale chitarra è adatta al blues?',
    content: [
      'Il blues è prima di tutto espressione, dinamica e risposta al tocco del plettro e delle dita.',
      '• Blues Elettrico Urbano (stile B.B. King, Freddie King, Gary Moore): le chitarre Semi-Hollow con blocco centrale (o una solida a due humbucker) offrono quel timbro rotondo, cremoso e con sustain canoro inimitabile.',
      '• Blues alla Stevie Ray Vaughan o Jimi Hendrix: una Stratocaster o similare con single-coil al manico regala quel classico "bell tone" vetroso e penetrante.',
      '• Delta Blues & Country Blues: chitarre acustiche formato Parlor o 000, con forte risposta sui medi e basse controllate per dare risalto al thumb-picking.'
    ]
  },

  // Real store articles & product highlights from Guitar Tortona site
  {
    id: 'post-bromo-ben2c',
    slug: 'nuovamente-disponibili-bromo-ben2c-3ts-electric-nylon-string-fusion-guitar-crossover',
    title: 'Nuovamente disponibili: Bromo BEN2C 3TS Electric Nylon String Fusion Guitar',
    excerpt: 'Rientrata a magazzino l\'attesissima chitarra crossover nylon elettrificata: feeling elettrico con il calore delle corde in nylon.',
    date: '17 Settembre 2025',
    author: 'Guitar Tortona',
    category: 'News',
    image: 'https://guitar-tortona.it/34014-large_default/maxine-mcg944-14wa-chitarra-classica-14-natural.jpg',
    readTime: '3 min',
    content: [
      'Siamo felici di comunicare ai nostri clienti che sono tornate disponibili le ricercatissime Bromo BEN2C 3TS nella finitura Three-Tone Sunburst.',
      'Si tratta di una chitarra crossover pensata per chi cerca il calore del suono nylon ma con l\'ergonomia, la spalla mancante profonda e il manico confortevole tipici di una chitarra elettrica.',
      'Dotata di un sofisticato sistema di preamplificazione con accordatore e uscita diretta bilanciata, è ideale per serate dal vivo, musica brasiliana, latin-jazz e worship acustico senza rischiare fastidiosi rientri.'
    ]
  },
  {
    id: 'post-schecter-pt',
    slug: 'tra-gli-ultimi-arrivi-segnaliamo-un-paio-di-pt-pt-e-la-linea-tele-per-schecter',
    title: 'Ultimi arrivi: la linea Schecter PT e Traditional Route 66',
    excerpt: 'Nuovi arrivi a catalogo: Schecter Traditional Route 66 Lexington e Schecter PT Williams con legni pregiati e finiture spettacolari.',
    date: '12 Agosto 2025',
    author: 'Guitar Tortona',
    category: 'Recensione',
    image: 'https://guitar-tortona.it/217-large_default/schecter-traditional-route-66-lexington-sss-midnight-black.jpg',
    readTime: '4 min',
    content: [
      'Abbiamo appena sballato e preparato nel nostro laboratorio le nuove Schecter serie Route 66: modelli che uniscono l\'estetica classica Tele e Strat con la precisione della moderna liuteria.',
      'Manico in acero Roasted satinato ad altissima scorrevolezza, tasti rifiniti con cura certosina e pickup avvolti specificamente per unire calore vintage e grande definizione anche a gain elevati.',
      'Tutti gli strumenti sono disponibili in prova nella nostra sala dedicata a Tortona.'
    ]
  },
  {
    id: 'post-fender-vintage57',
    slug: 'fender-american-vintage-57-precision-bass-rarita',
    title: 'In evidenza tra le rarità: Fender American Vintage \'57 Precision Bass',
    excerpt: 'Un gioiello per bassisti esigenti: corpo in frassino leggero White Blonde, manico monoblocco e suono roccioso.',
    date: '04 Luglio 2025',
    author: 'Roberto Zitarosa',
    category: 'Liuteria & Cura',
    image: 'https://guitar-tortona.it/33998-large_default/fender-american-vintage-57-precision-bass-white-blonde-frassino-2012.jpg',
    readTime: '5 min',
    content: [
      'Entrato nel nostro archivio vintage: un Fender American Vintage \'57 Precision Bass datato 2012 in finitura White Blonde su frassino a venatura a vista.',
      'Lo strumento è stato completamente controllato dal nostro laboratorio: tasti intonsi, truss-rod perfettamente operativo, peso bilanciato e un timbro profondo con l\'inconfondibile attacco "thump" che ha definito sessant\'anni di musica mondiale.'
    ]
  }
];
