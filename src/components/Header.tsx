import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/categories';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Scale, 
  Menu, 
  X, 
  Sparkles, 
  Phone, 
  MapPin, 
  ChevronDown, 
  Guitar,
  ShieldCheck,
  Truck
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    currentPath, 
    navigateTo, 
    cartCount, 
    setIsCartOpen, 
    wishlistCount, 
    comparisonList, 
    setIsComparisonModalOpen,
    setIsFinderOpen,
    setIsSearchOpen 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [chitarreDropdownOpen, setChitarreDropdownOpen] = useState(false);

  const handleNav = (path: string) => {
    navigateTo(path);
    setMobileMenuOpen(false);
    setChitarreDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 shadow-sm">
      {/* Top utility notification bar */}
      <div className="bg-[#333333] text-white text-xs py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-neutral-300">
              <Truck className="w-3.5 h-3.5 text-[#D54343]" /> Spedizione corriere espresso 24/48h • Gratuita da 199€
            </span>
            <span className="flex items-center gap-1.5 text-neutral-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D54343]" /> Setup e collaudo liuteria incluso prima dell'invio
            </span>
          </div>
          <div className="flex items-center gap-4 text-neutral-300">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#D54343]" /> Tortona (AL), Strada Ribrocca 2/a
            </span>
            <a href="tel:+390131821633" className="hover:text-white flex items-center gap-1 transition-colors">
              <Phone className="w-3 h-3 text-[#D54343]" /> 0131 821633
            </a>
          </div>
        </div>
      </div>

      {/* Main Logo Fascia with Red #D54343 Background */}
      <div className="bg-[#D54343] text-white">
        <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-6">
          {/* Mobile Hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-white hover:text-neutral-200 focus:outline-hidden"
            aria-label="Menu di navigazione"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo with original logo-guitar.png */}
          <button 
            onClick={() => handleNav('/')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer focus:outline-hidden shrink-0"
            aria-label="Guitar Tortona Homepage"
          >
            <img 
              src="/logo-guitar.png" 
              alt="GUITAR" 
              className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-102"
            />
            <div className="hidden md:block border-l border-white/30 pl-2.5">
              <span className="block font-black tracking-wider text-xs uppercase text-white leading-none">
                TORTONA
              </span>
              <span className="text-[9px] tracking-wider uppercase text-white/85 font-bold block mt-0.5">
                Centro Chitarre dal 1990
              </span>
            </div>
          </button>

          {/* Search trigger bar with clean white container */}
          <div className="flex-1 max-w-md mx-2 sm:mx-4">
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="w-full flex items-center justify-between bg-white text-neutral-700 hover:bg-neutral-50 rounded-lg px-3.5 py-2 text-sm transition-all shadow-xs group text-left border border-white/40 cursor-pointer"
              aria-label="Cerca prodotti nel catalogo"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-4 h-4 text-[#D54343] shrink-0" />
                <span className="truncate text-neutral-600 font-medium text-xs sm:text-sm">Cerca chitarre, bassi, marchi, modelli...</span>
              </div>
              <kbd className="hidden sm:inline-block bg-neutral-100 border border-neutral-200 text-[10px] font-mono px-1.5 py-0.5 rounded text-neutral-500 font-semibold">
                Cerca
              </kbd>
            </button>
          </div>

          {/* Actions & Differentiator CTA */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Key Feature: "Trova la tua chitarra" CTA */}
            <button 
              onClick={() => setIsFinderOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 bg-[#333333] hover:bg-black active:bg-neutral-900 text-white px-3.5 py-2 rounded-lg font-bold text-xs tracking-wide uppercase transition-all shadow-xs border border-white/20 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Trova la tua chitarra</span>
            </button>

            {/* Compare Button */}
            <button 
              onClick={() => setIsComparisonModalOpen(true)}
              className="relative p-2 text-white hover:text-white hover:bg-white/15 rounded-lg transition-colors cursor-pointer hidden md:flex items-center justify-center"
              title="Confronta strumenti"
              aria-label="Confronta strumenti musicali"
            >
              <Scale className="w-5 h-5" />
              {comparisonList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#333333] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white/30">
                  {comparisonList.length}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button 
              onClick={() => handleNav('/preferiti')}
              className="relative p-2 text-white hover:text-white hover:bg-white/15 rounded-lg transition-colors cursor-pointer hidden sm:flex items-center justify-center"
              title="I tuoi preferiti"
              aria-label="Preferiti"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#333333] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white/30">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button with high contrast */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-white hover:bg-neutral-100 text-[#333333] px-3 py-2 rounded-lg font-bold text-xs uppercase transition-colors shadow-xs cursor-pointer"
              aria-label={`Carrello: ${cartCount} articoli`}
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#D54343]" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#D54343] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale-in">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline font-bold text-xs text-[#333333]">Carrello</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Row (Su sfondo bianco come richiesto) */}
      <nav className="hidden lg:block border-b border-neutral-200 bg-white" aria-label="Menu Principale">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-sm font-medium">
          <ul className="flex items-center gap-1">
            {/* Chitarre dropdown */}
            <li className="relative group">
              <button 
                onClick={() => handleNav('/chitarre')}
                onMouseEnter={() => setChitarreDropdownOpen(true)}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-md hover:text-[#D54343] transition-colors ${
                  currentPath.startsWith('/chitarre') ? 'text-[#D54343] font-bold' : 'text-[#333333]'
                }`}
              >
                <span>Chitarre</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {/* Submenu Dropdown */}
              <div 
                onMouseLeave={() => setChitarreDropdownOpen(false)}
                className={`absolute top-full left-0 w-64 bg-white border border-neutral-200 rounded-lg shadow-lg py-2 z-50 transition-all ${
                  chitarreDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'
                }`}
              >
                <button 
                  onClick={() => handleNav('/chitarre/elettriche')}
                  className="w-full text-left px-4 py-2 hover:bg-[#F4F4F4] text-xs font-semibold text-[#333333] flex items-center justify-between hover:text-[#D54343]"
                >
                  Chitarre Elettriche
                  <span className="text-[10px] text-neutral-400 uppercase font-normal">Fender, Schecter</span>
                </button>
                <button 
                  onClick={() => handleNav('/chitarre/acustiche')}
                  className="w-full text-left px-4 py-2 hover:bg-[#F4F4F4] text-xs font-semibold text-[#333333] flex items-center justify-between hover:text-[#D54343]"
                >
                  Chitarre Acustiche
                  <span className="text-[10px] text-neutral-400 uppercase font-normal">Crafter, Takamine</span>
                </button>
                <button 
                  onClick={() => handleNav('/chitarre/jazz')}
                  className="w-full text-left px-4 py-2 hover:bg-[#F4F4F4] text-xs font-semibold text-[#333333] flex items-center justify-between hover:text-[#D54343]"
                >
                  Chitarre Jazz & Semi-Hollow
                  <span className="text-[10px] text-neutral-400 uppercase font-normal">Archtop & Vintage</span>
                </button>
                <button 
                  onClick={() => handleNav('/chitarre/classiche')}
                  className="w-full text-left px-4 py-2 hover:bg-[#F4F4F4] text-xs font-semibold text-[#333333] flex items-center justify-between hover:text-[#D54343]"
                >
                  Chitarre Classiche
                  <span className="text-[10px] text-neutral-400 uppercase font-normal">Studio e concerto</span>
                </button>
                <div className="border-t border-neutral-100 my-1"></div>
                <button 
                  onClick={() => handleNav('/strumenti-mancini')}
                  className="w-full text-left px-4 py-2 hover:bg-[#F4F4F4] text-xs font-semibold text-[#333333] flex items-center justify-between hover:text-[#D54343]"
                >
                  Strumenti Mancini (Lefty)
                </button>
                <button 
                  onClick={() => handleNav('/chitarre')}
                  className="w-full text-left px-4 py-2 bg-neutral-50 hover:bg-neutral-100 text-xs font-bold text-[#D54343] text-center"
                >
                  Vedi Tutte le Chitarre →
                </button>
              </div>
            </li>

            <li>
              <button 
                onClick={() => handleNav('/bassi')}
                className={`px-3 py-2.5 rounded-md hover:text-[#D54343] transition-colors ${
                  currentPath === '/bassi' ? 'text-[#D54343] font-bold' : 'text-[#333333]'
                }`}
              >
                Bassi
              </button>
            </li>

            <li>
              <button 
                onClick={() => handleNav('/amplificatori')}
                className={`px-3 py-2.5 rounded-md hover:text-[#D54343] transition-colors ${
                  currentPath === '/amplificatori' ? 'text-[#D54343] font-bold' : 'text-[#333333]'
                }`}
              >
                Amplificatori
              </button>
            </li>

            <li>
              <button 
                onClick={() => handleNav('/effetti')}
                className={`px-3 py-2.5 rounded-md hover:text-[#D54343] transition-colors ${
                  currentPath === '/effetti' ? 'text-[#D54343] font-bold' : 'text-[#333333]'
                }`}
              >
                Effetti
              </button>
            </li>

            <li>
              <button 
                onClick={() => handleNav('/usato')}
                className={`px-3 py-2.5 rounded-md hover:text-[#D54343] transition-colors flex items-center gap-1.5 ${
                  currentPath === '/usato' ? 'text-[#D54343] font-bold' : 'text-[#333333]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Usato Garantito
              </button>
            </li>

            <li>
              <button 
                onClick={() => handleNav('/rarita')}
                className={`px-3 py-2.5 rounded-md hover:text-[#D54343] transition-colors flex items-center gap-1.5 ${
                  currentPath === '/rarita' ? 'text-[#D54343] font-bold' : 'text-[#333333]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                Rarità & Vintage
              </button>
            </li>

            <li>
              <button 
                onClick={() => handleNav('/accessori')}
                className={`px-3 py-2.5 rounded-md hover:text-[#D54343] transition-colors ${
                  currentPath === '/accessori' ? 'text-[#D54343] font-bold' : 'text-[#333333]'
                }`}
              >
                Accessori
              </button>
            </li>

            <li>
              <button 
                onClick={() => handleNav('/ukulele')}
                className={`px-3 py-2.5 rounded-md hover:text-[#D54343] transition-colors ${
                  currentPath === '/ukulele' ? 'text-[#D54343] font-bold' : 'text-[#333333]'
                }`}
              >
                Ukulele
              </button>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNav('/guide')}
              className={`px-3 py-2.5 text-xs font-semibold uppercase tracking-wider hover:text-[#D54343] transition-colors ${
                currentPath.startsWith('/guide') ? 'text-[#D54343]' : 'text-neutral-600'
              }`}
            >
              Guide all'acquisto
            </button>
            <button 
              onClick={() => handleNav('/blog')}
              className={`px-3 py-2.5 text-xs font-semibold uppercase tracking-wider hover:text-[#D54343] transition-colors ${
                currentPath.startsWith('/blog') ? 'text-[#D54343]' : 'text-neutral-600'
              }`}
            >
              Blog & Novità
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="w-4/5 max-w-sm bg-white h-full overflow-y-auto p-5 flex flex-col justify-between shadow-2xl" 
            onClick={e => e.stopPropagation()}
          >
            <div>
              {/* Header inside mobile menu */}
              <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <div className="bg-[#D54343] px-2.5 py-1.5 rounded-md">
                    <img src="/logo-guitar.png" alt="GUITAR" className="h-6 w-auto object-contain" />
                  </div>
                  <span className="font-black text-xs text-[#333333] tracking-widest">TORTONA</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-neutral-500 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile "Trova la tua chitarra" CTA */}
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsFinderOpen(true);
                }}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-[#D54343] text-white py-3 rounded-lg font-bold text-sm tracking-wide uppercase shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                Trova la tua chitarra
              </button>

              {/* Nav links */}
              <div className="mt-6 flex flex-col gap-1 text-sm font-medium">
                <span className="text-[10px] uppercase font-bold text-neutral-400 px-2 py-1">Catalogo Strumenti</span>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.slug}
                    onClick={() => handleNav(cat.urlPath)}
                    className="text-left px-3 py-2.5 rounded-lg hover:bg-neutral-100 text-[#333333] flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-neutral-400">›</span>
                  </button>
                ))}

                <span className="text-[10px] uppercase font-bold text-neutral-400 px-2 py-1 mt-4">Approfondimenti & Store</span>
                <button 
                  onClick={() => handleNav('/guide')}
                  className="text-left px-3 py-2.5 rounded-lg hover:bg-neutral-100 text-[#333333]"
                >
                  Guide all'acquisto & FAQ
                </button>
                <button 
                  onClick={() => handleNav('/blog')}
                  className="text-left px-3 py-2.5 rounded-lg hover:bg-neutral-100 text-[#333333]"
                >
                  Blog & Notizie Liuteria
                </button>
                <button 
                  onClick={() => handleNav('/preferiti')}
                  className="text-left px-3 py-2.5 rounded-lg hover:bg-neutral-100 text-[#333333] flex items-center justify-between"
                >
                  <span>I miei preferiti</span>
                  {wishlistCount > 0 && (
                    <span className="bg-[#D54343] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {wishlistCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Store contact bottom in mobile drawer */}
            <div className="pt-6 border-t border-neutral-200 text-xs text-neutral-500">
              <p className="font-semibold text-neutral-800">Guitar Tortona</p>
              <p>Strada Ribrocca, 2/a - 15057 Tortona (AL)</p>
              <a href="tel:+390131821633" className="block text-[#D54343] font-bold mt-1">
                Tel. 0131 821633
              </a>
              <p className="text-[11px] text-neutral-400 mt-1">Mar-Sab 09:30-12:30 / 15:30-19:00</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
