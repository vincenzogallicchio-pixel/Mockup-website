import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Scale, ShoppingBag, ArrowRight } from 'lucide-react';

export const ComparisonDrawer: React.FC = () => {
  const { 
    comparisonList, 
    removeFromComparison, 
    clearComparison, 
    isComparisonModalOpen, 
    setIsComparisonModalOpen,
    addToCart,
    navigateTo 
  } = useApp();

  if (!isComparisonModalOpen && comparisonList.length === 0) return null;

  // Floating bottom bar when comparison modal is closed but items > 0
  if (!isComparisonModalOpen && comparisonList.length > 0) {
    return (
      <aside aria-label="Confronto prodotti" className="fixed bottom-16 lg:bottom-4 left-4 right-4 max-w-lg mx-auto z-30 bg-[#333333] text-white rounded-xl shadow-2xl p-3 flex items-center justify-between border border-neutral-700 animate-slide-up">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#D54343] flex items-center justify-center">
            <Scale className="w-4 h-4 text-white" />
          </div>
          <div className="text-xs">
            <p className="font-bold">{comparisonList.length} strumenti in confronto</p>
            <p className="text-[11px] text-neutral-400">Massimo 4 strumenti contemporaneamente</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsComparisonModalOpen(true)}
            className="bg-[#D54343] hover:bg-[#b83434] text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors"
          >
            Confronta ora
          </button>
          <button
            onClick={clearComparison}
            className="p-1.5 text-neutral-400 hover:text-white"
            title="Svuota confronto"
            aria-label="Svuota confronto"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </aside>
    );
  }

  // Full Comparison Modal
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      onClick={() => setIsComparisonModalOpen(false)}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl border border-neutral-200 flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-[#333333] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#D54343]" />
            <h3 className="font-bold text-base">Confronto Caratteristiche Strumenti</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={clearComparison}
              className="text-xs text-neutral-300 hover:text-white"
            >
              Rimuovi tutti
            </button>
            <button
              onClick={() => setIsComparisonModalOpen(false)}
              className="p-1 rounded-lg text-neutral-400 hover:text-white"
              aria-label="Chiudi confronto"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="p-6 overflow-x-auto flex-1">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="p-3 w-40 text-neutral-400 font-bold uppercase tracking-wider bg-neutral-50">
                  Caratteristica
                </th>
                {comparisonList.map(prod => (
                  <th key={prod.id} className="p-3 min-w-[200px] align-top bg-white">
                    <div className="relative">
                      <button
                        onClick={() => removeFromComparison(prod.id)}
                        className="absolute -top-1 -right-1 p-1 bg-neutral-100 hover:bg-neutral-200 rounded-full text-neutral-500 hover:text-black"
                        title="Rimuovi"
                        aria-label={`Rimuovi ${prod.name} dal confronto`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <div className="w-24 h-24 bg-[#F4F4F4] rounded-lg p-2 mx-auto mb-2 flex items-center justify-center">
                        <img src={prod.image} alt={prod.name} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[10px] font-bold uppercase text-neutral-400 block text-center">{prod.brand}</span>
                      <h4 className="text-xs font-bold text-neutral-800 text-center line-clamp-2 mt-0.5">{prod.name}</h4>
                      <p className="text-sm font-black text-center text-[#333333] mt-1">{prod.priceFormatted}</p>
                      
                      <button
                        onClick={() => addToCart(prod)}
                        className="w-full mt-2 bg-[#D54343] hover:bg-[#b83434] text-white py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow-xs"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        Carrello
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              <tr>
                <td className="p-3 font-bold text-neutral-700 bg-neutral-50">Condizione</td>
                {comparisonList.map(p => (
                  <td key={p.id} className="p-3 font-semibold text-neutral-800">{p.condition}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-neutral-700 bg-neutral-50">Tipologia</td>
                {comparisonList.map(p => (
                  <td key={p.id} className="p-3 text-neutral-800">{p.categoryLabel}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-neutral-700 bg-neutral-50">Configurazione Pickup</td>
                {comparisonList.map(p => (
                  <td key={p.id} className="p-3 text-neutral-800">{p.specs.pickups || 'Acustica naturale'}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-neutral-700 bg-neutral-50">Legno Corpo</td>
                {comparisonList.map(p => (
                  <td key={p.id} className="p-3 text-neutral-800">{p.specs.body || 'N/D'}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-neutral-700 bg-neutral-50">Manico & Profilo</td>
                {comparisonList.map(p => (
                  <td key={p.id} className="p-3 text-neutral-800">{p.specs.neck || 'Standard comfort'}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-neutral-700 bg-neutral-50">Tastiera</td>
                {comparisonList.map(p => (
                  <td key={p.id} className="p-3 text-neutral-800">{p.specs.fingerboard || 'N/D'}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-neutral-700 bg-neutral-50">Scala & Tasti</td>
                {comparisonList.map(p => (
                  <td key={p.id} className="p-3 text-neutral-800">{p.specs.scale || 'Standard'} ({p.specs.frets || 'Standard'})</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-neutral-700 bg-neutral-50">Custodia inclusa</td>
                {comparisonList.map(p => (
                  <td key={p.id} className="p-3 text-neutral-800">{p.specs.caseIncluded || 'Opzionale'}</td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-neutral-700 bg-neutral-50">Liuteria Tortona</td>
                {comparisonList.map(p => (
                  <td key={p.id} className="p-3 text-emerald-700 font-semibold">✓ Setup e verifica ottave inclusi</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
