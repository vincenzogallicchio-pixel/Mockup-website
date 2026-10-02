export interface CategoryItem {
  slug: string;
  urlPath: string;
  name: string;
  shortName: string;
  seoTitle: string;
  metaDescription: string;
  introText: string;
  image: string;
  subcategories: string[];
  filterKey: string;
  faqList: { q: string; a: string }[];
}

export const CATEGORIES: CategoryItem[] = [
  {
    slug: 'chitarre-elettriche',
    urlPath: '/chitarre/elettriche',
    name: 'Chitarre Elettriche',
    shortName: 'Elettriche',
    seoTitle: 'Chitarre Elettriche Nuove e Usate | Guitar Tortona Centro Chitarre',
    metaDescription: 'Scopri il catalogo di chitarre elettriche di Guitar Tortona. Fender, Schecter, G&L, Danelectro, Tokai. Setup liuteria incluso su ogni ordine.',
    introText: 'Dalle intramontabili forme Stratocaster e Telecaster ai modelli moderni con configurazioni humbucker ad alta uscita, il nostro catalogo offre strumenti selezionati con cura. Ogni chitarra viene collaudata e settata nel nostro laboratorio di Tortona prima di arrivare tra le tue mani.',
    image: 'https://guitar-tortona.it/34051-large_default/fender-american-ultra-stratocaster-hss-rw-cobra-blue.jpg',
    subcategories: ['Solid Body', 'HSS & SSS', 'Vintage Style', '7 & 8 Corde', 'Mancine'],
    filterKey: 'chitarre-elettriche',
    faqList: [
      {
        q: 'Le chitarre elettriche vengono regolate prima della spedizione?',
        a: 'Assolutamente sì. Il nostro liutaio in sede esegue il controllo completo di action, curvatura del manico (truss rod), ottave, tastiera e tenuta dell\'accordatura prima di ogni invio.'
      },
      {
        q: 'Qual è la differenza tra pickup Single-Coil e Humbucker?',
        a: 'I Single-Coil offrono un suono cristallino, dinamico e brillante (perfetto per funk, blues e pop rock classico), mentre gli Humbucker garantiscono un suono più corposo, caldo e privo del ronzio di fondo a 50Hz, ideale per overdrive densi, hard rock e metal.'
      }
    ]
  },
  {
    slug: 'chitarre-acustiche',
    urlPath: '/chitarre/acustiche',
    name: 'Chitarre Acustiche',
    shortName: 'Acustiche',
    seoTitle: 'Chitarre Acustiche ed Elettrificate | Guitar Tortona',
    metaDescription: 'Chitarre acustiche Dreadnought, Parlor, Auditorium e concert. Crafter, Takamine, Breedlove, Bromo, Martin. Prove in negozio a Tortona.',
    introText: 'Strumenti acustici ricchi di risonanza e proiezione timbrica. Trovi modelli acustici puri o dotati di sofisticati sistemi di elettrificazione piezoattivi, ideali per palcoscenico e home recording.',
    image: 'https://guitar-tortona.it/34036-large_default/crafter-dg-g-mahoce.jpg',
    subcategories: ['Dreadnought', 'Auditorium & Grand Concert', 'Parlor', 'Elettrificate', '12 Corde'],
    filterKey: 'chitarre-acustiche',
    faqList: [
      {
        q: 'Meglio una tavola armonica in massello o laminato?',
        a: 'Il legno massello vibra con maggiore profondità ed evolve nel tempo maturando armoniche più calde. I modelli in massello offrono dinamica e sustain nettamente superiori.'
      }
    ]
  },
  {
    slug: 'chitarre-jazz',
    urlPath: '/chitarre/jazz',
    name: 'Chitarre Jazz & Semi-Hollow',
    shortName: 'Jazz',
    seoTitle: 'Chitarre Jazz, Archtop e Semi-Acustiche | Guitar Tortona',
    metaDescription: 'Chitarre Jazz semi-hollow e full hollow archtop. Suoni vellutati, sustain caldo e grande risonanza. Selezione Guitar Tortona.',
    introText: 'La magia dell\'archtop e delle camere tonali. Dai timbri scuri e vellutati del bebop al sound caldo del blues elettrico e dell\'indie rock contemporaneo.',
    image: 'https://guitar-tortona.it/243-large_default/nuovo-danelectro-double-neck-chitarrabasso.jpg',
    subcategories: ['Semi-Hollow con blocco centrale', 'Full Hollow Archtop', 'Single Cutaway', 'Double Cutaway'],
    filterKey: 'chitarre-jazz',
    faqList: [
      {
        q: 'A cosa serve il blocco centrale (Center Block)?',
        a: 'Il blocco centrale riduce drasticamente l\'innesco di feedback acustico agli alti volumi o in presenza di distorsioni, aumentando al contempo l\'attacco e il sustain.'
      }
    ]
  },
  {
    slug: 'chitarre-classiche',
    urlPath: '/chitarre/classiche',
    name: 'Chitarre Classiche',
    shortName: 'Classiche',
    seoTitle: 'Chitarre Classiche da Studio e da Concerto | Guitar Tortona',
    metaDescription: 'Chitarre classiche per principianti, conservatori e concertisti. Misure 4/4, 3/4, 1/2 e 1/4. Maxine, Valencia, Cordoba a Tortona.',
    introText: 'Corde in nylon per il massimo comfort e dolcezza d\'emissione. Ideali sia per i corsi di studio musicali sia per la musica classica, bossa nova e cantautorato.',
    image: 'https://guitar-tortona.it/34013-large_default/maxine-mcg944-12-wa-chitarra-classica-12-natural.jpg',
    subcategories: ['Misura 4/4', 'Misura 3/4', 'Misura 1/2', 'Crossover con spalla mancante'],
    filterKey: 'chitarre-classiche',
    faqList: [
      {
        q: 'Quale misura di chitarra classica scegliere per un bambino?',
        a: 'Per bambini dai 5 agli 8 anni consigliamo la misura 1/2 o 1/4. Dai 9 agli 11 anni la misura 3/4 è l\'ideale. Dagli 11-12 anni in su si può passare alla misura standard 4/4.'
      }
    ]
  },
  {
    slug: 'bassi',
    urlPath: '/bassi',
    name: 'Bassi Elettrici e Acustici',
    shortName: 'Bassi',
    seoTitle: 'Bassi Elettrici 4 e 5 Corde Nuovi e Usati | Guitar Tortona',
    metaDescription: 'Bassi Fender Precision, Jazz Bass, Warwick, Sire Marcus Miller. Bassi acustici ed elettrici garantiti a Tortona.',
    introText: 'Il fondamento del groove. Scopri bassi a 4 e 5 corde, tastati e fretless, con elettroniche passive o preamplificazioni attive.',
    image: 'https://guitar-tortona.it/33998-large_default/fender-american-vintage-57-precision-bass-white-blonde-frassino-2012.jpg',
    subcategories: ['Bassi 4 Corde', 'Bassi 5 Corde', 'Bassi Attivi', 'Bassi Passivi', 'Bassi Acustici'],
    filterKey: 'bassi',
    faqList: [
      {
        q: 'Per iniziare è meglio un basso a 4 o a 5 corde?',
        a: 'Consigliamo un 4 corde per iniziare: il manico più stretto facilita l\'impostazione della mano sinistra e le geometrie dei tasti.'
      }
    ]
  },
  {
    slug: 'amplificatori',
    urlPath: '/amplificatori',
    name: 'Amplificatori e Casse',
    shortName: 'Amplificatori',
    seoTitle: 'Amplificatori per Chitarra e Basso Valvolari e Digitali | Guitar Tortona',
    metaDescription: 'Amplificatori combo, testate valvolari e casse. Hughes & Kettner, Peavey, ENGL, Blackstar a Tortona.',
    introText: 'La voce del tuo strumento. Combo da studio casalingo, testate valvolari ad alta potenza per il palco e cabinet di grande impatto dinamico.',
    image: 'https://guitar-tortona.it/24288-large_default/peavey-invective-112-20w-combo-1x12.jpg',
    subcategories: ['Combo Valvolari', 'Combo a Transistor & Modeling', 'Testate', 'Casse 1x12 e 2x12', 'Ampli Basso'],
    filterKey: 'amplificatori',
    faqList: [
      {
        q: 'Meglio valvolare o modeling digitale?',
        a: 'Il valvolare offre calore naturale e risposta organica al tocco delle dita. I moderni amplificatori modeling offrono versatilità assoluta, peso ridotto e suoni eccellenti a bassi volumi.'
      }
    ]
  },
  {
    slug: 'effetti',
    urlPath: '/effetti',
    name: 'Effetti e Processori',
    shortName: 'Effetti',
    seoTitle: 'Pedali Effetti Chitarra e Basso | Guitar Tortona',
    metaDescription: 'Overdrive, distorsioni, delay, riverberi, multieffetto. Strymon, JHS, Seymour Duncan, T-Rex da Guitar Tortona.',
    introText: 'Dai riverberi shimmer ambientali agli overdrive organici e ai looper da palco. Personalizza il tuo segnale con i migliori marchi boutique.',
    image: 'https://guitar-tortona.it/25224-large_default/strymon-cloudburst.jpg',
    subcategories: ['Overdrive & Distorsioni', 'Riverberi & Delay', 'Modulazioni (Chorus, Phaser, Flanger)', 'Multieffetto & Looper'],
    filterKey: 'effetti',
    faqList: [
      {
        q: 'Qual è l\'ordine corretto dei pedali in pedaliera?',
        a: 'La sequenza consigliata è solitamente: Accordatore -> Wah/Fuzz -> Compressore -> Overdrive/Distorsione -> Modulazioni (Chorus, Phaser) -> Delay -> Riverbero.'
      }
    ]
  },
  {
    slug: 'strumenti-mancini',
    urlPath: '/strumenti-mancini',
    name: 'Strumenti Mancini',
    shortName: 'Mancini',
    seoTitle: 'Chitarre e Bassi Mancini (Left-Handed) | Guitar Tortona',
    metaDescription: 'Ampia selezione di chitarre elettriche, acustiche e bassi per mancini. Strumenti pronti e collaudati dal liutaio.',
    introText: 'I chitarristi mancini meritano la stessa eccellenza e ampiezza di catalogo. Scopri le migliori proposte left-handed selezionate per te.',
    image: 'https://guitar-tortona.it/24694-large_default/warwick-streamer-cv5-lefty-nirvana-black-mancino.jpg',
    subcategories: ['Elettriche Mancine', 'Acustiche Mancine', 'Bassi Mancini'],
    filterKey: 'strumenti-mancini',
    faqList: [
      {
        q: 'Posso girare le corde su una chitarra da destri?',
        a: 'Sconsigliamo vivamente di girare le corde su chitarre destre senza sostituire capotasto, compensazione del ponte e manopole: l\'intonazione e l\'ergonomia risulterebbero gravemente compromesse.'
      }
    ]
  },
  {
    slug: 'accessori',
    urlPath: '/accessori',
    name: 'Accessori',
    shortName: 'Accessori',
    seoTitle: 'Accessori per Chitarra e Basso | Custodie, Corde, Tracolle',
    metaDescription: 'Corde per chitarra Ernie Ball, D\'Addario, custodie rigide Rockbag, tracolle, stand e alimentatori.',
    introText: 'Tutto ciò che serve per proteggere, suonare e mantenere sempre al meglio il tuo strumento.',
    image: 'https://guitar-tortona.it/25022-large_default/warwick-s-security-lock-system-black.jpg',
    subcategories: ['Corde', 'Custodie e Borse', 'Tracolle e Sicurezze', 'Stand e Supporti', 'Cavi'],
    filterKey: 'accessori',
    faqList: [
      {
        q: 'Ogni quanto tempo vanno cambiate le corde?',
        a: 'Chi suona regolarmente dovrebbe sostituirle ogni 1-2 mesi per preservare brillantezza timbrica, intonazione accurata ed evitare ossidazioni sui tasti.'
      }
    ]
  },
  {
    slug: 'ukulele',
    urlPath: '/ukulele',
    name: 'Ukulele e Strumenti a Corda',
    shortName: 'Ukulele',
    seoTitle: 'Ukulele Soprano, Concerto, Tenore e Baritono | Guitar Tortona',
    metaDescription: 'Vasto assortimento di ukulele acustici ed elettrificati. Kala, Mahalo, Bromo a prezzi competitivi.',
    introText: 'Divertenti, compatti e ricchi di sonorità solari. Disponibili in formato soprano, concerto, tenore ed elettrificati.',
    image: 'https://guitar-tortona.it/21905-large_default/valencia-vc150k-34-natural-stv120k.jpg',
    subcategories: ['Soprano', 'Concerto', 'Tenore', 'Elettrificati'],
    filterKey: 'ukulele',
    faqList: [
      {
        q: 'Qual è la misura di ukulele più versatile per cominciare?',
        a: 'L\'ukulele Concerto rappresenta il miglior compromesso tra maneggevolezza, spaziatura confortevole dei tasti e volume sonoro.'
      }
    ]
  },
  {
    slug: 'usato',
    urlPath: '/usato',
    name: 'Usato Garantito',
    shortName: 'Usato',
    seoTitle: 'Chitarre Usate Garantite | Laboratorio Liuteria Guitar Tortona',
    metaDescription: 'Chitarre e bassi usati garantiti. Ispezione liuteria, pulizia e set-up inclusi. Spedizione tracciata e sicura in 24/48h.',
    introText: 'Acquistare un usato da Guitar Tortona significa sicurezza totale. Ogni strumento di seconda mano viene smontato, controllato nell\'elettronica, rettificato nei tasti se necessario, pulito e regolato con corde nuove dal nostro liutaio prima di essere messo in vendita.',
    image: 'https://guitar-tortona.it/33998-large_default/fender-american-vintage-57-precision-bass-white-blonde-frassino-2012.jpg',
    subcategories: ['Chitarre Elettriche Usate', 'Acustiche Usate', 'Bassi Usati', 'Amplificatori Usati', 'Pedali Usati'],
    filterKey: 'usato',
    faqList: [
      {
        q: 'Cosa include la garanzia sull\'usato di Guitar Tortona?',
        a: 'Tutti i nostri strumenti usati sono coperti da garanzia sul perfetto funzionamento di tutte le componenti elettroniche e meccaniche, con diritto di recesso entro 14 giorni.'
      }
    ]
  },
  {
    slug: 'rarita',
    urlPath: '/rarita',
    name: 'Rarità & Vintage',
    shortName: 'Rarità',
    seoTitle: 'Chitarre da Collezione e Strumenti Rari Vintage | Guitar Tortona',
    metaDescription: 'Pezzi unici, vintage d\'epoca, edizioni limitate e strumenti da collezione accuratamente verificati da Guitar Tortona.',
    introText: 'La sezione dedicata ai collezionisti, agli amanti del vintage e a chi cerca strumenti dal fascino irripetibile. Chitarre e bassi con decenni di storia, fascino intramontabile e valore che cresce nel tempo.',
    image: 'https://guitar-tortona.it/24938-large_default/framus-star-bass-1967-red-sunburst.jpg',
    subcategories: ['Vintage Anni 60 & 70', 'Custom Shop & Edizioni Limitate', 'Modelli Storici Introvabili'],
    filterKey: 'rarita',
    faqList: [
      {
        q: 'Posso richiedere ulteriori fotografie o video di uno strumento raro?',
        a: 'Certamente. Scrivici via email a info@guitar-tortona.it o contattaci su WhatsApp: possiamo inviarti scatti in alta definizione dei minimi dettagli, vano controlli, matricola e registrazioni audio.'
      }
    ]
  }
];
