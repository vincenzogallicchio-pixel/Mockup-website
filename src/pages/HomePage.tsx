import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/catalogue';
import { CATEGORIES } from '../data/categories';
import { ARTICLES } from '../data/blogAndGuides';
import { ProductCard } from '../components/ProductCard';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Wrench, 
  Music, 
  Flame, 
  Gem, 
  BookOpen, 
  ChevronRight,
  HelpCircle,
  Clock,
  MapPin,
  Phone
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, setIsFinderOpen } = useApp();

  // Highlighted product subsets
  const newArrivals = useMemo(() => PRODUCTS.filter(p => p.isNewArrival).slice(0, 4), []);
  const usedAndRare = useMemo(() => PRODUCTS.filter(p => p.condition === 'Usato' || p.condition === 'Rarità' || p.condition === 'Ex-demo').slice(0, 4), []);
  const bestSellers = useMemo(() => PRODUCTS.filter(p => p.isBestSeller).slice(0, 4), []);

  // Unique brands
  const brands = ['Fender', 'Schecter', 'Crafter', 'Takamine', 'Danelectro', 'Breedlove', 'Framus', 'Ibanez', 'Strymon', 'Peavey', 'Tokai'];

  // Buying guides for GEO questions
  const geoGuides = ARTICLES.filter(a => a.geoQuestion);

  return (
    <div className="space-y-14 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#333333] text-white">
        {/* Subtle background glow & texture */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-10" />
        <img
          src="https://guitar-tortona.it/34051-large_default/fender-american-ultra-stratocaster-hss-rw-cobra-blue.jpg"
          alt="Guitar Tortona - Centro Chitarre dal 1990"
          className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 h-full object-cover object-center opacity-40 md:opacity-70 filter brightness-90 mix-blend-screen scale-105"
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 py-16 sm:py-24 lg:py-32 flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#D54343]/20 border border-[#D54343]/40 text-[#D54343] px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-[#D54343] animate-ping" />
              Centro Specializzato Chitarre a Tortona dal 1990
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Trova il tuo suono.
            </h1>

            <p className="text-neutral-300 text-base sm:text-lg leading-relaxed font-normal">
              Oltre tre decenni di esperienza, sala prova dedicata e laboratorio di liuteria. Dalle grandi icone americane ai modelli artigianali con setup professionale incluso prima della consegna.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={() => setIsFinderOpen(true)}
                className="bg-[#D54343] hover:bg-[#b83434] active:bg-[#9d2c2c] text-white px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide uppercase transition-all shadow-lg hover:shadow-[#D54343]/30 flex items-center gap-2.5 cursor-pointer hover:scale-102"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Trova la tua chitarra</span>
              </button>

              <button
                onClick={() => navigateTo('/chitarre')}
                className="bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/20 backdrop-blur-xs px-6 py-3.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Scopri le chitarre</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Micro value props in hero */}
            <div className="pt-4 flex flex-wrap gap-4 text-xs text-neutral-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Setup liuteria gratuito
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Spedizione tracciata 24/48h
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Usato ispezionato e garantito
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES OVERVIEW GRID */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
              Esplora per Categoria
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Chitarre, bassi, amplificatori ed effettistica per ogni stile musicale
            </p>
          </div>
          <button 
            onClick={() => navigateTo('/chitarre')}
            className="text-xs font-bold text-[#D54343] hover:underline flex items-center gap-1"
          >
            Tutte le categorie →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          {CATEGORIES.slice(0, 10).map(cat => (
            <div
              key={cat.slug}
              onClick={() => navigateTo(cat.urlPath)}
              className="group bg-white rounded-xl border border-neutral-200 p-3 hover:border-[#D54343] hover:shadow-md transition-all cursor-pointer flex flex-col items-center text-center"
            >
              <div className="w-full aspect-square bg-[#F4F4F4] rounded-lg p-2 mb-2.5 overflow-hidden flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xs font-bold text-neutral-800 group-hover:text-[#D54343] transition-colors">
                {cat.name}
              </h3>
              <span className="text-[10px] text-neutral-400 mt-0.5">
                Scopri modelli →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. AI GUITAR FINDER INTERACTIVE BANNER / DIFFERENTIATOR */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-br from-[#333333] via-neutral-900 to-[#222222] text-white rounded-2xl p-6 sm:p-10 border border-neutral-700 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
            <Sparkles className="w-96 h-96 -mr-20 -mt-20 text-[#D54343]" />
          </div>

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#D54343] text-white text-xs font-extrabold uppercase px-3 py-1 rounded-full tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              Algoritmo Deterministico Guitar Tortona
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Indeciso sul modello giusto? Prova "Trova la tua chitarra"
            </h2>

            <p className="text-neutral-300 text-sm leading-relaxed">
              Rispondi a 6 semplici domande su genere musicale, livello di esperienza, forma desiderata e budget. Il nostro motore incrocia le caratteristiche tecniche dei modelli reali in negozio e ti propone i <strong>3 strumenti perfetti</strong> con spiegazione fattuale punto per punto.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsFinderOpen(true)}
                className="bg-[#D54343] hover:bg-[#b83434] active:bg-[#9d2c2c] text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Avvia il questionario (1 min)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-neutral-400">
                100% gratuito • Senza registrazione richiesta
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. NUOVI ARRIVI */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D54343]/10 text-[#D54343] flex items-center justify-center">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
                Nuovi Arrivi
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500">
                Le ultime novità sballate e collaudate nel nostro laboratorio
              </p>
            </div>
          </div>
          <button 
            onClick={() => navigateTo('/chitarre')}
            className="text-xs font-bold text-[#D54343] hover:underline"
          >
            Vedi tutti →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {newArrivals.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 5. USATO GARANTITO & RARITÀ VINTAGE */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#F4F4F4] rounded-2xl p-6 sm:p-8 border border-neutral-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-700 flex items-center justify-center">
                <Gem className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
                  Usato Garantito & Rarità Vintage
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Pezzi unici, chitarre d'epoca e strumenti ex-demo revisionati e garantiti
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navigateTo('/usato')}
                className="bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200 text-xs font-bold px-3.5 py-2 rounded-lg transition-colors"
              >
                Tutto l'usato
              </button>
              <button 
                onClick={() => navigateTo('/rarita')}
                className="bg-[#333333] hover:bg-black text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors"
              >
                Rarità Vintage
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {usedAndRare.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. PIÙ VENDUTI (BEST SELLERS) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Music className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
                I Più Venduti
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500">
                Gli strumenti più apprezzati dai nostri clienti per affidabilità e timbro
              </p>
            </div>
          </div>
          <button 
            onClick={() => navigateTo('/chitarre')}
            className="text-xs font-bold text-[#D54343] hover:underline"
          >
            Vedi catalogo →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bestSellers.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 7. MARCHI UFFICIALI TRATTATI */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200">
          <h2 className="text-center text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
            Marchi Trattati e Assistenza Ufficiale
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {brands.map(brand => (
              <button
                key={brand}
                onClick={() => navigateTo(`/chitarre?brand=${encodeURIComponent(brand)}`)}
                className="text-neutral-500 hover:text-[#D54343] font-bold text-sm sm:text-base tracking-wider uppercase transition-colors"
              >
                {brand}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GEO / EDITORIAL CONTENT BLOCKS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#D54343]" />
            <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
              Guide all'acquisto & Risposte dei nostri Liutai
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
            Domande frequenti per orientarsi nella scelta del primo o del prossimo strumento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {geoGuides.map(guide => (
            <div
              key={guide.id}
              onClick={() => navigateTo(`/blog/${guide.slug}`)}
              className="bg-white rounded-xl border border-neutral-200 p-5 hover:border-[#D54343] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#D54343] block mb-1">
                  Guida Liuteria
                </span>
                <h3 className="text-sm font-bold text-neutral-900 mb-2 leading-snug">
                  {guide.geoQuestion || guide.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3">
                  {guide.excerpt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-semibold text-[#D54343]">
                <span>Leggi la guida completa</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. LIUTERIA & STORE STORY AT TORTONA */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-10 border border-neutral-800 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#D54343]/20 border border-[#D54343]/40 text-[#D54343] text-xs font-bold px-3 py-1 rounded-full uppercase">
              <Wrench className="w-3.5 h-3.5" />
              Laboratorio & Setup dal 1990
            </div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Perché comprare da Guitar Tortona fa la differenza
            </h2>

            <p className="text-neutral-300 text-sm leading-relaxed">
              A differenza dei grandi magazzini automatizzati, da Guitar Tortona non spediamo mai una scatola chiusa senza aprirla. Ogni chitarra e basso viene tirato fuori dal cartone, accordato, controllato nella rettifica dei tasti, settato con altezza corde (action) confortevole e verificato nell'elettronica.
            </p>

            <ul className="space-y-2 text-xs text-neutral-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Controllo del truss-rod e regolazione del manico
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Intonazione ottave su accordatore stroboscopico di precisione
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Lubrificazione tastiera in palissandro / ebano e lucidatura tasti
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Imballo corazzato multistrato per garantire arrivo perfetto in 24/48h
              </li>
            </ul>
          </div>

          <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 space-y-4 text-xs">
            <h3 className="font-bold text-sm text-white border-b border-neutral-700 pb-2">
              Vieni a trovarci a Tortona
            </h3>
            <p className="text-neutral-300">
              Disponiamo di una sala prova insonorizzata dove potrai provare tutti i modelli con amplificatori valvolari o cuffie dedicate.
            </p>
            <div className="space-y-2 text-neutral-300">
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D54343]" />
                Strada Ribrocca, 2/a – 15057 Tortona (AL)
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D54343]" />
                0131 821633 (Prenotazioni sala prova)
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#D54343]" />
                Martedì – Sabato: 09:30-12:30 / 15:30-19:00
              </p>
            </div>
            <button
              onClick={() => setIsFinderOpen(true)}
              className="w-full bg-[#D54343] hover:bg-[#b83434] text-white py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Fai il test "Trova la tua chitarra"
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
