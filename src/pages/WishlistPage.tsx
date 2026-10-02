import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/catalogue';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, navigateTo, setIsFinderOpen } = useApp();

  const savedProducts = useMemo(() => {
    return PRODUCTS.filter(p => wishlist.includes(p.id));
  }, [wishlist]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: 'I tuoi Preferiti' }
        ]}
      />

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#D54343]/10 text-[#D54343] flex items-center justify-center">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-neutral-900 tracking-tight">
              I Tuoi Strumenti Preferiti
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500">
              {savedProducts.length} {savedProducts.length === 1 ? 'strumento salvato' : 'strumenti salvati'} nella tua lista dei desideri
            </p>
          </div>
        </div>
      </div>

      {savedProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200 space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-900">La tua lista dei preferiti è vuota</h2>
            <p className="text-xs text-neutral-500 mt-1">
              Esplora il catalogo di chitarre, bassi e amplificatori e clicca sull'icona del cuore per salvare gli strumenti che più ti ispirano.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('/chitarre')}
              className="bg-[#D54343] hover:bg-[#b83434] text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider"
            >
              Esplora il catalogo
            </button>
            <button
              onClick={() => setIsFinderOpen(true)}
              className="bg-[#333333] hover:bg-black text-white px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              Trova la tua chitarra
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {savedProducts.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
};
