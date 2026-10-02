import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { ARTICLES } from '../data/blogAndGuides';
import { 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Sparkles,
  Send,
  Guitar
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, setIsFinderOpen } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#333333] text-white border-t border-neutral-700 pt-12 pb-24 lg:pb-12 text-xs">
      {/* 1. TRUST SECTION / VALUE PROPOSITIONS */}
      <div className="max-w-7xl mx-auto px-4 pb-12 border-b border-neutral-700/80">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/50">
            <div className="w-10 h-10 rounded-lg bg-[#D54343]/15 text-[#D54343] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white mb-1">Laboratorio Liuteria in Sede</h4>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Controllo tastiera, action, intonazione e montaggio corde fresche eseguito prima di ogni spedizione.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/50">
            <div className="w-10 h-10 rounded-lg bg-[#D54343]/15 text-[#D54343] flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white mb-1">Spedizione Sicura 24/48h</h4>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Imballo rinforzato per strumenti delicati. Corriere tracciato e assicurato. Gratuita per ordini oltre 199€.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/50">
            <div className="w-10 h-10 rounded-lg bg-[#D54343]/15 text-[#D54343] flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white mb-1">Garanzia Ufficiale & Reso 14gg</h4>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Garanzia 2 anni sul nuovo, collaudo certificato sull'usato garantito. Diritto di recesso sereno entro 14 giorni.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-800/40 border border-neutral-700/50">
            <div className="w-10 h-10 rounded-lg bg-[#D54343]/15 text-[#D54343] flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-white mb-1">Pagamenti Protetti & Rateali</h4>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Klarna 3 rate a tasso zero, PayPal, Carta di Credito 3D Secure e Bonifico Bancario.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN FOOTER COLUMNS */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 border-b border-neutral-700/80">
        {/* Brand & Store Bio */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#D54343] px-2.5 py-1.5 rounded-lg inline-block shadow-sm">
              <img src="/logo-guitar.png" alt="GUITAR" className="h-7 w-auto object-contain" />
            </div>
            <div>
              <span className="font-black text-sm text-white block tracking-widest">TORTONA</span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold">
                Centro Chitarre dal 1990
              </span>
            </div>
          </div>

          <p className="text-neutral-400 leading-relaxed text-xs">
            Punto di riferimento per musicisti, appassionati e collezionisti. Ampia disponibilità di chitarre elettriche, acustiche, jazz, classiche, bassi, amplificatori ed effettistica boutique. Sala prove in sede e laboratorio specializzato di liuteria per settaggi e riparazioni.
          </p>

          <div className="space-y-2 text-neutral-300 pt-2">
            <p className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D54343] shrink-0" />
              Strada Ribrocca, 2/a – 15057 Tortona (AL), Italia
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#D54343] shrink-0" />
              <a href="tel:+390131821633" className="hover:text-white transition-colors">
                +39 0131 821633
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#D54343] shrink-0" />
              <a href="mailto:info@guitar-tortona.it" className="hover:text-white transition-colors">
                info@guitar-tortona.it
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D54343] shrink-0" />
              Mar – Sab: 09:30 - 12:30 / 15:30 - 19:00 (Dom e Lun mattina chiuso)
            </p>
          </div>
        </div>

        {/* Categories Links */}
        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 border-l-2 border-[#D54343] pl-2">
            Catalogo
          </h4>
          <ul className="space-y-2 text-neutral-400">
            {CATEGORIES.slice(0, 7).map(cat => (
              <li key={cat.slug}>
                <button
                  onClick={() => navigateTo(cat.urlPath)}
                  className="hover:text-white hover:translate-x-1 transition-all text-left"
                >
                  {cat.name}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => navigateTo('/usato')}
                className="text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                Usato Garantito
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo('/rarita')}
                className="text-amber-400 hover:text-amber-300 font-semibold"
              >
                Rarità & Vintage
              </button>
            </li>
          </ul>
        </div>

        {/* Buying Guides & GEO Questions */}
        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 border-l-2 border-[#D54343] pl-2">
            Guide all'acquisto
          </h4>
          <ul className="space-y-2 text-neutral-400">
            {ARTICLES.slice(0, 6).map(art => (
              <li key={art.id}>
                <button
                  onClick={() => navigateTo(`/blog/${art.slug}`)}
                  className="hover:text-white line-clamp-1 text-left transition-colors"
                  title={art.title}
                >
                  {art.geoQuestion || art.title}
                </button>
              </li>
            ))}
            <li className="pt-1">
              <button
                onClick={() => setIsFinderOpen(true)}
                className="text-[#D54343] font-bold flex items-center gap-1.5 hover:underline"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Trova la tua chitarra (Test)
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 border-l-2 border-[#D54343] pl-2">
            Novità & Rarità
          </h4>
          <p className="text-neutral-400 text-xs mb-3 leading-relaxed">
            Iscriviti per ricevere in anteprima i nuovi arrivi, gli strumenti usati rari e gli sconti dedicati.
          </p>

          {newsletterSubscribed ? (
            <div className="bg-emerald-900/40 border border-emerald-600/50 p-3 rounded-lg text-emerald-300 text-xs">
              ✓ Grazie! Ti abbiamo iscritto alle novità di Guitar Tortona.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex gap-1.5">
                <input
                  type="email"
                  required
                  placeholder="La tua email..."
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-xs text-white placeholder:text-neutral-500 flex-1 focus:outline-hidden focus:border-[#D54343]"
                />
                <button
                  type="submit"
                  className="bg-[#D54343] hover:bg-[#b83434] text-white px-3 py-2 rounded-lg font-bold text-xs uppercase transition-colors shrink-0"
                  aria-label="Iscriviti alla newsletter"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-[10px] text-neutral-500">Niente spam, puoi disiscriverti in ogni momento.</p>
            </form>
          )}

          {/* Social / contact buttons */}
          <div className="mt-6 pt-4 border-t border-neutral-700/80">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest block mb-2">
              Hai bisogno di un consiglio?
            </span>
            <a
              href="mailto:info@guitar-tortona.it"
              className="inline-block bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-600 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors"
            >
              Scrivi a info@guitar-tortona.it
            </a>
          </div>
        </div>
      </div>

      {/* 3. COPYRIGHT & LEGAL ROW */}
      <div className="max-w-7xl mx-auto px-4 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
        <div>
          © {new Date().getFullYear()} GUITAR di Zitarosa Roberto & C. s.n.c. • P.IVA / C.F. 01549400062 • Tutti i diritti riservati.
        </div>
        <div className="flex items-center gap-4">
          <span className="hover:text-neutral-300">Termini e Condizioni</span>
          <span>•</span>
          <span className="hover:text-neutral-300">Privacy & Cookie Policy</span>
          <span>•</span>
          <span className="hover:text-neutral-300">Spedizioni e Resi</span>
        </div>
      </div>
    </footer>
  );
};
