import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Sparkles, Grid, Heart, ShoppingBag } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { currentPath, navigateTo, cartCount, wishlistCount, setIsCartOpen, setIsFinderOpen } = useApp();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 px-2 py-1.5 shadow-lg flex items-center justify-around">
      {/* Home */}
      <button 
        onClick={() => navigateTo('/')}
        className={`flex flex-col items-center justify-center p-1.5 text-[10px] font-semibold transition-colors ${
          currentPath === '/' ? 'text-[#D54343]' : 'text-neutral-500 hover:text-neutral-800'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span>Home</span>
      </button>

      {/* Catalogo */}
      <button 
        onClick={() => navigateTo('/chitarre')}
        className={`flex flex-col items-center justify-center p-1.5 text-[10px] font-semibold transition-colors ${
          currentPath.startsWith('/chitarre') || currentPath.startsWith('/bassi') ? 'text-[#D54343]' : 'text-neutral-500 hover:text-neutral-800'
        }`}
      >
        <Grid className="w-5 h-5 mb-0.5" />
        <span>Catalogo</span>
      </button>

      {/* Central Highlighted CTA: Trova Chitarra */}
      <button 
        onClick={() => setIsFinderOpen(true)}
        className="flex flex-col items-center justify-center relative -top-3 group"
        aria-label="Avvia questionario Trova la tua Chitarra"
      >
        <div className="w-12 h-12 rounded-full bg-[#D54343] text-white flex items-center justify-center shadow-lg group-active:scale-95 transition-transform border-2 border-white">
          <Sparkles className="w-6 h-6 text-amber-200" />
        </div>
        <span className="text-[10px] font-bold text-[#D54343] mt-0.5">Trova</span>
      </button>

      {/* Wishlist */}
      <button 
        onClick={() => navigateTo('/preferiti')}
        className={`flex flex-col items-center justify-center p-1.5 text-[10px] font-semibold relative transition-colors ${
          currentPath === '/preferiti' ? 'text-[#D54343]' : 'text-neutral-500 hover:text-neutral-800'
        }`}
      >
        <Heart className="w-5 h-5 mb-0.5" />
        <span>Preferiti</span>
        {wishlistCount > 0 && (
          <span className="absolute top-1 right-2 bg-[#D54343] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
      </button>

      {/* Cart */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="flex flex-col items-center justify-center p-1.5 text-[10px] font-semibold text-neutral-500 hover:text-neutral-800 relative transition-colors"
      >
        <ShoppingBag className="w-5 h-5 mb-0.5" />
        <span>Carrello</span>
        {cartCount > 0 && (
          <span className="absolute top-1 right-2 bg-[#D54343] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>
    </nav>
  );
};
