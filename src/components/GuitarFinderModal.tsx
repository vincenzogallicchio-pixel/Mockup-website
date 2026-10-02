import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FinderAnswers, 
  FinderRecommendation,
  MusicGenreAnswer, 
  InstrumentTypeAnswer, 
  ExperienceAnswer, 
  BudgetAnswer, 
  MattersMostAnswer, 
  ForWhoAnswer 
} from '../types';
import { guitarFinderService } from '../services/guitarFinderService';
import { 
  X, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  ShoppingBag, 
  ArrowRight, 
  RotateCcw,
  Scale,
  Award,
  ShieldCheck,
  Tag
} from 'lucide-react';

export const GuitarFinderModal: React.FC = () => {
  const { isFinderOpen, setIsFinderOpen, navigateTo, addToCart, addToComparison, isComparing } = useApp();

  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const [answers, setAnswers] = useState<FinderAnswers>({
    musicGenre: 'Rock',
    instrumentType: 'Electric',
    experience: 'Beginner',
    budget: '200-500',
    mattersMost: 'Playability',
    forWho: 'For me'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<FinderRecommendation[] | null>(null);

  if (!isFinderOpen) return null;

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Final step: calculate recommendations
      setIsLoading(true);
      try {
        const results = await guitarFinderService.getRecommendations(answers);
        setRecommendations(results);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (recommendations) {
      setRecommendations(null);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetFinder = () => {
    setStep(1);
    setRecommendations(null);
  };

  const closeFinder = () => {
    setIsFinderOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl border border-neutral-200 flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#333333] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#D54343] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-200" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">Trova la tua chitarra</h2>
              <p className="text-[11px] text-neutral-300">
                {recommendations 
                  ? 'I 3 strumenti perfetti per te, selezionati dal nostro catalogo' 
                  : `Domanda ${step} di ${totalSteps} • Consigli basati su dati reali`}
              </p>
            </div>
          </div>
          <button 
            onClick={closeFinder} 
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
            aria-label="Chiudi finestra"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar (when questionnaire is active) */}
        {!recommendations && (
          <div className="w-full bg-neutral-100 h-1.5">
            <div 
              className="bg-[#D54343] h-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        )}

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="py-16 text-center">
              <div className="w-12 h-12 border-4 border-[#D54343] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="font-bold text-neutral-800 text-lg">Analisi del catalogo Guitar Tortona...</p>
              <p className="text-sm text-neutral-500 mt-1">Confronto tra caratteristiche timbriche, legni, livello e budget</p>
            </div>
          ) : recommendations ? (
            /* RESULTS VIEW: TOP 3 RECOMMENDATIONS */
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-950">
                  <p className="font-bold">Consigli deterministici basati sul nostro catalogo reale</p>
                  <p className="text-emerald-800 mt-0.5">
                    Tutti gli strumenti consigliati includono il <strong>setup professionale di liuteria gratuito</strong> prima della spedizione per garantire la migliore suonabilità dal primo tocco.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.map((rec, idx) => (
                  <div 
                    key={rec.product.id}
                    className={`rounded-xl border transition-all flex flex-col justify-between overflow-hidden bg-white ${
                      idx === 0 ? 'border-[#D54343] ring-2 ring-[#D54343]/20 shadow-md relative' : 'border-neutral-200 shadow-2xs hover:shadow-md'
                    }`}
                  >
                    {idx === 0 && (
                      <div className="bg-[#D54343] text-white text-[10px] font-extrabold uppercase py-1 text-center tracking-wider flex items-center justify-center gap-1">
                        <Award className="w-3 h-3 text-amber-200" />
                        Scelta N. 1 Consigliata
                      </div>
                    )}

                    <div className="p-4 flex-1 flex flex-col">
                      {/* Product Image */}
                      <div className="relative aspect-square w-full rounded-lg bg-[#F4F4F4] overflow-hidden mb-3 group cursor-pointer"
                           onClick={() => { closeFinder(); navigateTo(`/prodotto/${rec.product.slug}`); }}>
                        <img 
                          src={rec.product.image} 
                          alt={rec.product.name}
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 bg-white/95 text-[10px] font-bold px-2 py-0.5 rounded shadow-2xs text-[#333333]">
                          {rec.product.condition}
                        </span>
                      </div>

                      {/* Brand & Name */}
                      <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">{rec.product.brand}</p>
                      <h4 
                        onClick={() => { closeFinder(); navigateTo(`/prodotto/${rec.product.slug}`); }}
                        className="text-sm font-bold text-neutral-900 line-clamp-2 hover:text-[#D54343] cursor-pointer mt-0.5 leading-snug"
                      >
                        {rec.product.name}
                      </h4>

                      {/* Price */}
                      <div className="mt-2 mb-3">
                        <span className="text-lg font-black text-[#333333]">{rec.product.priceFormatted}</span>
                      </div>

                      {/* "Perché te la consigliamo" Box with strictly factual reasons */}
                      <div className="bg-[#F4F4F4] rounded-lg p-3 text-xs mb-3 mt-auto">
                        <p className="font-bold text-neutral-800 text-[11px] uppercase tracking-wider mb-1.5 flex items-center gap-1 text-[#D54343]">
                          Perché te la consigliamo:
                        </p>
                        <ul className="space-y-1 text-neutral-700 text-[11px]">
                          {rec.factualReasons.map((reason, rIdx) => (
                            <li key={rIdx} className="leading-tight flex items-start gap-1">
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="p-3 bg-neutral-50 border-t border-neutral-100 flex flex-col gap-2">
                      <button 
                        onClick={() => addToCart(rec.product)}
                        className="w-full bg-[#D54343] hover:bg-[#b83434] active:bg-[#9d2c2c] text-white py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs cursor-pointer transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Aggiungi al carrello
                      </button>

                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => { closeFinder(); navigateTo(`/prodotto/${rec.product.slug}`); }}
                          className="flex-1 bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-700 py-1.5 rounded-lg text-xs font-semibold text-center transition-colors"
                        >
                          Vedi scheda
                        </button>
                        <button 
                          onClick={() => addToComparison(rec.product)}
                          className={`p-1.5 rounded-lg border text-xs font-medium transition-colors ${
                            isComparing(rec.product.id) ? 'bg-neutral-800 text-white border-neutral-800' : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                          }`}
                          title="Aggiungi al confronto"
                        >
                          <Scale className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Finder Action */}
              <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                <button 
                  onClick={resetFinder}
                  className="flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-black transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  Ricomincia il test
                </button>
                <button 
                  onClick={closeFinder}
                  className="bg-[#333333] hover:bg-black text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Esplora catalogo completo
                </button>
              </div>
            </div>
          ) : (
            /* QUESTIONNAIRE STEPS */
            <div className="py-2">
              {/* Question 1: What kind of music do you play? */}
              {step === 1 && (
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">Che genere di musica suoni o vuoi suonare?</h3>
                  <p className="text-xs text-neutral-500 mb-6">Ogni genere predilige conformazioni di pickup e risonanze specifiche.</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {(['Rock', 'Blues', 'Metal', 'Pop', 'Jazz', 'Country', 'Fingerstyle', 'Classical', 'Other', "I don't know"] as MusicGenreAnswer[]).map(genre => (
                      <button
                        key={genre}
                        onClick={() => setAnswers(prev => ({ ...prev, musicGenre: genre }))}
                        className={`p-3.5 rounded-xl border text-left font-semibold text-sm transition-all flex items-center justify-between cursor-pointer ${
                          answers.musicGenre === genre 
                            ? 'border-[#D54343] bg-[#D54343]/5 text-[#D54343] shadow-xs' 
                            : 'border-neutral-200 bg-white hover:border-neutral-300 text-neutral-700'
                        }`}
                      >
                        <span>{genre === "I don't know" ? "Non lo so ancora" : genre === "Classical" ? "Classica" : genre}</span>
                        {answers.musicGenre === genre && <Check className="w-4 h-4 text-[#D54343]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 2: What type of instrument? */}
              {step === 2 && (
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">Che tipo di strumento cerchi?</h3>
                  <p className="text-xs text-neutral-500 mb-6">Seleziona la tipologia per filtrare con precisione il catalogo.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {([
                      { id: 'Electric', title: 'Chitarra Elettrica', desc: 'Solid body, versatile con amplificatore, suoni rock/blues/pop' },
                      { id: 'Acoustic', title: 'Chitarra Acustica', desc: 'Corde in metallo, volume naturale, fingerstyle e cantautorato' },
                      { id: 'Classical', title: 'Chitarra Classica', desc: 'Corde in nylon, tocco morbido, musica classica e bossa nova' },
                      { id: 'Jazz/Semi-Hollow', title: 'Chitarra Jazz / Semi-Hollow', desc: 'Camere tonali, suoni caldi, blues, fusion ed eleganza archtop' },
                      { id: 'Bass', title: 'Basso Elettrico', desc: '4 o 5 corde, linea di basso e groove portante' },
                      { id: "I don't know", title: 'Non lo so ancora', desc: 'Suggeriscimi la soluzione migliore in base al mio percorso' }
                    ] as { id: InstrumentTypeAnswer; title: string; desc: string }[]).map(item => (
                      <button
                        key={item.id}
                        onClick={() => setAnswers(prev => ({ ...prev, instrumentType: item.id }))}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          answers.instrumentType === item.id 
                            ? 'border-[#D54343] bg-[#D54343]/5 shadow-xs' 
                            : 'border-neutral-200 bg-white hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-bold text-sm ${answers.instrumentType === item.id ? 'text-[#D54343]' : 'text-neutral-800'}`}>
                            {item.title}
                          </span>
                          {answers.instrumentType === item.id && <Check className="w-4 h-4 text-[#D54343]" />}
                        </div>
                        <p className="text-xs text-neutral-500">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 3: Experience? */}
              {step === 3 && (
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">Qual è il tuo livello di esperienza?</h3>
                  <p className="text-xs text-neutral-500 mb-6">Ci aiuta a selezionare l'ergonomia del manico e la tipologia di finitura più adatta.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {([
                      { id: 'Beginner', title: 'Principiante', desc: 'Prima chitarra in assoluto o suoni da pochi mesi' },
                      { id: 'Intermediate', title: 'Intermedio', desc: 'Conosci accordi e scale, suoni con costanza o in sala prove' },
                      { id: 'Advanced', title: 'Avanzato', desc: 'Buona tecnica, cerchi precisione costruttiva e dinamica superiore' },
                      { id: 'Professional', title: 'Professionista', desc: 'Live regolari, studio di registrazione o insegnamento' }
                    ] as { id: ExperienceAnswer; title: string; desc: string }[]).map(item => (
                      <button
                        key={item.id}
                        onClick={() => setAnswers(prev => ({ ...prev, experience: item.id }))}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          answers.experience === item.id 
                            ? 'border-[#D54343] bg-[#D54343]/5 shadow-xs' 
                            : 'border-neutral-200 bg-white hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-bold text-sm ${answers.experience === item.id ? 'text-[#D54343]' : 'text-neutral-800'}`}>
                            {item.title}
                          </span>
                          {answers.experience === item.id && <Check className="w-4 h-4 text-[#D54343]" />}
                        </div>
                        <p className="text-xs text-neutral-500">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 4: Budget? */}
              {step === 4 && (
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">Qual è il tuo budget indicativo?</h3>
                  <p className="text-xs text-neutral-500 mb-6">Vincolo fondamentale per selezionare solo opzioni realistiche e vantaggiose.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {([
                      { id: '0-200', label: '0 – 200 €', desc: 'Fascia entry level, primi passi e studio' },
                      { id: '200-500', label: '200 – 500 €', desc: 'Ottimo rapporto qualità/prezzo, strumenti affidabili' },
                      { id: '500-1000', label: '500 – 1.000 €', desc: 'Legni selezionati, finiture curate, palcoscenico' },
                      { id: '1000-2000', label: '1.000 – 2.000 €', desc: 'Fascia alta, brand storici, precisione professionale' },
                      { id: '2000+', label: '2.000 € +', desc: 'Top di gamma, Custom Shop, Vintage e collezionismo' }
                    ] as { id: BudgetAnswer; label: string; desc: string }[]).map(b => (
                      <button
                        key={b.id}
                        onClick={() => setAnswers(prev => ({ ...prev, budget: b.id }))}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          answers.budget === b.id 
                            ? 'border-[#D54343] bg-[#D54343]/5 shadow-xs' 
                            : 'border-neutral-200 bg-white hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-bold text-base ${answers.budget === b.id ? 'text-[#D54343]' : 'text-neutral-800'}`}>
                            {b.label}
                          </span>
                          {answers.budget === b.id && <Check className="w-4 h-4 text-[#D54343]" />}
                        </div>
                        <p className="text-xs text-neutral-500">{b.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 5: What matters most? */}
              {step === 5 && (
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">Cosa conta di più per te?</h3>
                  <p className="text-xs text-neutral-500 mb-6">Assegniamo un peso prioritario a ciò che valorizzi maggiormente.</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {([
                      { id: 'Sound', title: 'Suono (Timbro)', desc: 'Profondità, sustain e calore' },
                      { id: 'Playability', title: 'Suonabilità', desc: 'Manico comodo e azione agevole' },
                      { id: 'Appearance', title: 'Estetica & Finitura', desc: 'Look, verniciatura e dettagli' },
                      { id: 'Brand', title: 'Prestigio Marchio', desc: 'Fender, Schecter, Crafter ecc.' },
                      { id: 'Value for money', title: 'Qualità / Prezzo', desc: 'Massima resa per ogni euro speso' },
                      { id: 'Versatility', title: 'Versatilità', desc: 'Suonare generi diversi con lo stesso strumento' }
                    ] as { id: MattersMostAnswer; title: string; desc: string }[]).map(item => (
                      <button
                        key={item.id}
                        onClick={() => setAnswers(prev => ({ ...prev, mattersMost: item.id }))}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                          answers.mattersMost === item.id 
                            ? 'border-[#D54343] bg-[#D54343]/5 shadow-xs' 
                            : 'border-neutral-200 bg-white hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-bold text-sm ${answers.mattersMost === item.id ? 'text-[#D54343]' : 'text-neutral-800'}`}>
                            {item.title}
                          </span>
                          {answers.mattersMost === item.id && <Check className="w-4 h-4 text-[#D54343]" />}
                        </div>
                        <p className="text-[11px] text-neutral-500">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Question 6: Is it for you or as a gift? */}
              {step === 6 && (
                <div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-1">È per te o è un regalo?</h3>
                  <p className="text-xs text-neutral-500 mb-6">Per i regali privilegiamo strumenti nuovi in imballo originale e dotazione completa.</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {([
                      { id: 'For me', title: 'È per me', desc: 'Cerco lo strumento ideale per la mia crescita musicale' },
                      { id: 'Gift', title: 'È un regalo per qualcuno', desc: 'Desidero fare una bella figura con garanzia, imballo perfetto e facilità di cambio' }
                    ] as { id: ForWhoAnswer; title: string; desc: string }[]).map(item => (
                      <button
                        key={item.id}
                        onClick={() => setAnswers(prev => ({ ...prev, forWho: item.id }))}
                        className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                          answers.forWho === item.id 
                            ? 'border-[#D54343] bg-[#D54343]/5 shadow-xs' 
                            : 'border-neutral-200 bg-white hover:border-neutral-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`font-bold text-base ${answers.forWho === item.id ? 'text-[#D54343]' : 'text-neutral-800'}`}>
                            {item.title}
                          </span>
                          {answers.forWho === item.id && <Check className="w-5 h-5 text-[#D54343]" />}
                        </div>
                        <p className="text-xs text-neutral-500">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {!recommendations && (
          <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                step === 1 
                  ? 'text-neutral-300 cursor-not-allowed' 
                  : 'text-neutral-700 hover:text-black hover:bg-neutral-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Indietro
            </button>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-[#D54343] hover:bg-[#b83434] active:bg-[#9d2c2c] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              <span>{step === totalSteps ? 'Mostra Risultati' : 'Avanti'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
