import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/catalogue';
import { CATEGORIES, CategoryItem } from '../data/categories';
import { ARTICLES } from '../data/blogAndGuides';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Product } from '../types';
import { 
  SlidersHorizontal, 
  X, 
  Sparkles, 
  ChevronDown, 
  HelpCircle, 
  BookOpen, 
  RotateCcw,
  Check
} from 'lucide-react';

interface CategoryPageProps {
  categorySlug?: string;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ categorySlug = 'chitarre' }) => {
  const { currentPath, navigateTo, setIsFinderOpen } = useApp();

  // Determine active category metadata
  const currentCategory = useMemo(() => {
    // If specific slug matches in categories
    const found = CATEGORIES.find(c => c.slug === categorySlug || c.urlPath === currentPath);
    if (found) return found;

    // Default umbrella category "Tutte le Chitarre"
    return {
      slug: 'chitarre',
      urlPath: '/chitarre',
      name: 'Tutte le Chitarre e Strumenti',
      shortName: 'Tutti gli strumenti',
      seoTitle: 'Catalogo Chitarre, Bassi ed Effetti | Guitar Tortona',
      metaDescription: 'Esplora il catalogo completo di chitarre elettriche, acustiche, jazz, classiche e bassi di Guitar Tortona. Setup liuteria gratuito.',
      introText: 'La nostra selezione completa di strumenti a corda, amplificatori ed effettistica. Dai modelli per cominciare agli strumenti di alta liuteria e rarità vintage.',
      image: 'https://guitar-tortona.it/34051-large_default/fender-american-ultra-stratocaster-hss-rw-cobra-blue.jpg',
      subcategories: ['Elettriche', 'Acustiche', 'Jazz', 'Classiche', 'Bassi', 'Mancini'],
      filterKey: 'all',
      faqList: [
        {
          q: 'Come vengono imballati gli strumenti per la spedizione?',
          a: 'Utilizziamo cartoni protettivi a doppia onda sagomati specificamente per strumenti musicali, con abbondante materiale ammortizzante e blocca-manico.'
        },
        {
          q: 'Posso richiedere un setup personalizzato con una scalatura specifica di corde?',
          a: 'Certamente! Al momento dell\'ordine o via email a info@guitar-tortona.it puoi comunicarci la scalatura (es. 009-042 o 010-046) e l\'accordatura desiderata.'
        }
      ]
    };
  }, [categorySlug, currentPath]);

  // Extract query params (search or brand from URL)
  const urlParams = useMemo(() => {
    return new URLSearchParams(window.location.search);
  }, [currentPath]);

  // Filter state
  const [selectedBrands, setSelectedBrands] = useState<string[]>(() => {
    const b = urlParams.get('brand');
    return b ? [b] : [];
  });
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [sortBy, setSortBy] = useState<'relevant' | 'price-asc' | 'price-desc' | 'newest'>('relevant');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Sync category filter
  const baseProducts = useMemo(() => {
    const q = urlParams.get('q')?.toLowerCase();

    return PRODUCTS.filter(p => {
      // Free text query filter if present
      if (q) {
        const matches = p.name.toLowerCase().includes(q) || 
                        p.brand.toLowerCase().includes(q) ||
                        p.categoryLabel.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Category filter
      if (currentCategory.slug === 'usato') {
        return p.condition === 'Usato' || p.condition === 'Ex-demo';
      }
      if (currentCategory.slug === 'rarita') {
        return p.condition === 'Rarità' || p.isRare;
      }
      if (currentCategory.filterKey !== 'all') {
        return p.category === currentCategory.filterKey;
      }
      return true;
    });
  }, [currentCategory, urlParams]);

  // All available brands within this category for filter checkboxes
  const availableBrands = useMemo(() => {
    const set = new Set(baseProducts.map(p => p.brand).filter(Boolean));
    return [...set].sort();
  }, [baseProducts]);

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let list = baseProducts.filter(p => {
      // Brand
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }
      // Condition
      if (selectedConditions.length > 0 && !selectedConditions.includes(p.condition)) {
        return false;
      }
      // Availability
      if (selectedAvailability === 'in-stock' && !p.inStock) {
        return false;
      }
      // Price
      if (p.price < priceRange[0] || p.price > priceRange[1]) {
        return false;
      }
      return true;
    });

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      default:
        // relevance: featured and in-stock first
        list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return list;
  }, [baseProducts, selectedBrands, selectedConditions, selectedAvailability, priceRange, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrands, selectedConditions, selectedAvailability, priceRange, sortBy, currentCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedConditions([]);
    setSelectedAvailability('all');
    setPriceRange([0, 5000]);
    setSortBy('relevant');
  };

  const activeFiltersCount = selectedBrands.length + selectedConditions.length + (selectedAvailability !== 'all' ? 1 : 0);

  // Related buying guides for this category
  const relatedGuides = useMemo(() => {
    return ARTICLES.slice(0, 3);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: 'Catalogo', href: '/chitarre' },
          { label: currentCategory.name }
        ]}
      />

      {/* Category Header (H1 & Intro) */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D54343] bg-[#D54343]/10 px-2 py-0.5 rounded">
              Guitar Tortona • Catalogo Ufficiale
            </span>
            <span className="text-xs text-neutral-400">
              {filteredProducts.length} strumenti disponibili
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            {currentCategory.name}
          </h1>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1">
            {currentCategory.introText}
          </p>

          {/* Quick Subcategory tags */}
          {currentCategory.subcategories && (
            <div className="flex flex-wrap gap-2 pt-3">
              {currentCategory.subcategories.map(sub => (
                <span 
                  key={sub}
                  className="px-2.5 py-1 rounded-md bg-[#F4F4F4] text-xs font-semibold text-neutral-700 border border-neutral-200"
                >
                  {sub}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* AI Guitar Finder Quick Promotion Banner */}
      <div className="bg-gradient-to-r from-[#333333] to-neutral-800 text-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-neutral-700 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D54343] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Non sai quale modello scegliere?</h2>
            <p className="text-xs text-neutral-300">
              Usa il nostro motore <strong>"Trova la tua chitarra"</strong> per confrontare i modelli in base a genere, budget ed esperienza.
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsFinderOpen(true)}
          className="bg-[#D54343] hover:bg-[#b83434] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shrink-0 shadow-xs cursor-pointer"
        >
          Fai il test (1 min)
        </button>
      </div>

      {/* Top Filter & Sort Bar (Mobile trigger + Sorting) */}
      <div className="flex items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-neutral-200">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden flex items-center gap-2 bg-[#F4F4F4] hover:bg-neutral-200 px-3 py-2 rounded-lg text-xs font-bold text-neutral-800 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#D54343]" />
          <span>Filtri</span>
          {activeFiltersCount > 0 && (
            <span className="bg-[#D54343] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>

        <div className="hidden lg:flex items-center gap-2 text-xs text-neutral-500 font-medium">
          <span>Mostrati {paginatedProducts.length} di {filteredProducts.length} strumenti</span>
          {activeFiltersCount > 0 && (
            <button
              onClick={resetFilters}
              className="text-[#D54343] hover:underline flex items-center gap-1 font-bold ml-2"
            >
              <RotateCcw className="w-3 h-3" />
              Azzera filtri
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="category-sort-select" className="text-xs text-neutral-500 font-medium hidden sm:inline">Ordina per:</label>
          <select
            id="category-sort-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-[#F4F4F4] border border-neutral-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-neutral-800 focus:outline-hidden focus:border-[#D54343] cursor-pointer"
          >
            <option value="relevant">Più rilevanti</option>
            <option value="price-asc">Prezzo: dal più basso</option>
            <option value="price-desc">Prezzo: dal più alto</option>
            <option value="newest">Nuovi Arrivi</option>
          </select>
        </div>
      </div>

      {/* Main Grid + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* DESKTOP SIDEBAR FILTERS */}
        <aside className="hidden lg:block bg-white rounded-xl border border-neutral-200 p-5 space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
            <h3 className="font-bold text-sm text-neutral-900 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-[#D54343]" />
              Filtra Prodotti
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-[#D54343] font-bold hover:underline"
              >
                Azzera
              </button>
            )}
          </div>

          {/* Condition Filter */}
          <div>
            <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2.5">
              Condizione
            </h4>
            <div className="space-y-1.5 text-xs">
              {['Nuovo', 'Usato', 'Ex-demo', 'B-stock', 'Rarità'].map(cond => (
                <label key={cond} className="flex items-center gap-2 text-neutral-700 hover:text-black cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedConditions.includes(cond)}
                    onChange={() => {
                      setSelectedConditions(prev => 
                        prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
                      );
                    }}
                    className="rounded text-[#D54343] focus:ring-[#D54343]"
                  />
                  <span>{cond}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="pt-4 border-t border-neutral-100">
            <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2.5">
              Disponibilità
            </h4>
            <div className="space-y-1.5 text-xs">
              <label className="flex items-center gap-2 text-neutral-700 cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  checked={selectedAvailability === 'all'}
                  onChange={() => setSelectedAvailability('all')}
                  className="text-[#D54343] focus:ring-[#D54343]"
                />
                <span>Tutti gli strumenti</span>
              </label>
              <label className="flex items-center gap-2 text-neutral-700 cursor-pointer">
                <input
                  type="radio"
                  name="availability"
                  checked={selectedAvailability === 'in-stock'}
                  onChange={() => setSelectedAvailability('in-stock')}
                  className="text-[#D54343] focus:ring-[#D54343]"
                />
                <span>Solo disponibili subito in negozio</span>
              </label>
            </div>
          </div>

          {/* Brands Filter */}
          {availableBrands.length > 0 && (
            <div className="pt-4 border-t border-neutral-100">
              <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2.5">
                Marchio ({availableBrands.length})
              </h4>
              <div className="space-y-1.5 text-xs max-h-48 overflow-y-auto pr-1">
                {availableBrands.map(brand => (
                  <label key={brand} className="flex items-center gap-2 text-neutral-700 hover:text-black cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => {
                        setSelectedBrands(prev => 
                          prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
                        );
                      }}
                      className="rounded text-[#D54343] focus:ring-[#D54343]"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Price Range Slider */}
          <div className="pt-4 border-t border-neutral-100">
            <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2.5">
              Fascia di Prezzo
            </h4>
            <div className="flex items-center justify-between text-xs font-semibold text-neutral-700 mb-2">
              <span>Fino a: {priceRange[1]} €</span>
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full accent-[#D54343] cursor-pointer"
            />
          </div>
        </aside>

        {/* PRODUCT GRID & PAGINATION */}
        <div className="lg:col-span-3 space-y-6">
          {paginatedProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200 space-y-3">
              <p className="font-bold text-base text-neutral-800">Nessuno strumento corrisponde ai filtri selezionati</p>
              <p className="text-xs text-neutral-500">Prova a rimuovere alcuni filtri o ad allargare la fascia di prezzo.</p>
              <button
                onClick={resetFilters}
                className="bg-[#D54343] text-white px-5 py-2 rounded-lg text-xs font-bold uppercase transition-colors"
              >
                Azzera filtri
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-1.5 pt-6">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className={`w-9 h-9 rounded-lg text-xs font-bold transition-colors ${
                      currentPage === pageNum
                        ? 'bg-[#D54343] text-white'
                        : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Category FAQ Section */}
      {currentCategory.faqList && currentCategory.faqList.length > 0 && (
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#D54343]" />
            <h2 className="text-xl font-bold text-neutral-900">
              Domande frequenti su {currentCategory.name}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {currentCategory.faqList.map((faq, idx) => (
              <div key={idx} className="bg-[#F4F4F4] rounded-xl p-4 border border-neutral-200">
                <h3 className="text-xs font-bold text-neutral-900 mb-1.5">{faq.q}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Buying Guides */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#D54343]" />
          <h2 className="text-xl font-bold text-neutral-900">
            Guide correlate e consigli dei nostri liutai
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          {relatedGuides.map(guide => (
            <div
              key={guide.id}
              onClick={() => navigateTo(`/blog/${guide.slug}`)}
              className="bg-[#F4F4F4] rounded-xl p-4 border border-neutral-200 hover:border-[#D54343] transition-colors cursor-pointer flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold text-[#D54343] uppercase block mb-1">
                  Guida all'acquisto
                </span>
                <h3 className="text-xs font-bold text-neutral-900 mb-1.5 line-clamp-2">
                  {guide.title}
                </h3>
                <p className="text-xs text-neutral-500 line-clamp-2">{guide.excerpt}</p>
              </div>
              <span className="text-[11px] font-bold text-[#D54343] mt-3 block">
                Leggi approfondimento →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* MOBILE BOTTOM SHEET FILTERS */}
      {isMobileFilterOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end justify-center"
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div 
            className="w-full max-h-[85vh] bg-white rounded-t-2xl p-6 overflow-y-auto shadow-2xl animate-slide-up space-y-5"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <h3 className="font-bold text-base text-neutral-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#D54343]" />
                Filtri di Ricerca
              </h3>
              <button 
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 rounded-lg text-neutral-500 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Condition */}
            <div>
              <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                Condizione
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['Nuovo', 'Usato', 'Ex-demo', 'B-stock', 'Rarità'].map(cond => (
                  <button
                    key={cond}
                    onClick={() => {
                      setSelectedConditions(prev => 
                        prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
                      );
                    }}
                    className={`p-2 rounded-lg border text-left font-medium ${
                      selectedConditions.includes(cond) ? 'border-[#D54343] bg-[#D54343]/10 text-[#D54343]' : 'border-neutral-200'
                    }`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                Disponibilità
              </h4>
              <div className="space-y-1 text-xs">
                <label className="flex items-center gap-2 p-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="mobile-avail"
                    checked={selectedAvailability === 'all'}
                    onChange={() => setSelectedAvailability('all')}
                  />
                  <span>Tutti</span>
                </label>
                <label className="flex items-center gap-2 p-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="mobile-avail"
                    checked={selectedAvailability === 'in-stock'}
                    onChange={() => setSelectedAvailability('in-stock')}
                  />
                  <span>Solo disponibili subito</span>
                </label>
              </div>
            </div>

            {/* Price */}
            <div>
              <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                Prezzo massimo: {priceRange[1]} €
              </h4>
              <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-[#D54343]"
              />
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-neutral-200 flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 py-3 rounded-lg text-xs font-bold uppercase transition-colors"
              >
                Azzera
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-2 bg-[#D54343] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md"
              >
                Vedi {filteredProducts.length} risultati
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
