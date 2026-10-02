import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/catalogue';
import { CATEGORIES } from '../data/categories';
import { ARTICLES } from '../data/blogAndGuides';
import { Search, X, Guitar, ArrowRight, Tag, BookOpen, Layers } from 'lucide-react';

export const PredictiveSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  // Extract unique brands from catalogue
  const allBrands = useMemo(() => {
    const set = new Set(PRODUCTS.map(p => p.brand).filter(Boolean));
    return [...set];
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        products: PRODUCTS.slice(0, 4),
        categories: CATEGORIES.slice(0, 4),
        brands: allBrands.slice(0, 6),
        articles: ARTICLES.slice(0, 3)
      };
    }

    // Filter products
    const matchedProducts = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    ).slice(0, 6);

    // Filter categories
    const matchedCategories = CATEGORIES.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.subcategories.some(sub => sub.toLowerCase().includes(q))
    ).slice(0, 4);

    // Filter brands
    const matchedBrands = allBrands.filter(b =>
      b.toLowerCase().includes(q)
    ).slice(0, 5);

    // Filter articles / guides
    const matchedArticles = ARTICLES.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      (a.geoQuestion && a.geoQuestion.toLowerCase().includes(q))
    ).slice(0, 3);

    return {
      products: matchedProducts,
      categories: matchedCategories,
      brands: matchedBrands,
      articles: matchedArticles
    };
  }, [query, allBrands]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (slug: string) => {
    setIsSearchOpen(false);
    navigateTo(`/prodotto/${slug}`);
  };

  const handleSelectCategory = (urlPath: string) => {
    setIsSearchOpen(false);
    navigateTo(urlPath);
  };

  const handleSelectArticle = (slug: string) => {
    setIsSearchOpen(false);
    navigateTo(`/blog/${slug}`);
  };

  const handleSelectBrand = (brand: string) => {
    setIsSearchOpen(false);
    navigateTo(`/chitarre?brand=${encodeURIComponent(brand)}`);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-10 sm:pt-20 px-4"
      onClick={() => setIsSearchOpen(false)}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-neutral-200 flex flex-col max-h-[85vh] animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input field */}
        <div className="p-4 border-b border-neutral-200 flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#D54343] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cerca chitarre, bassi, amplificatori, marchi, guide..."
            className="w-full text-base bg-transparent focus:outline-hidden text-neutral-800 placeholder:text-neutral-400 font-medium"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-xs text-neutral-400 hover:text-black font-semibold px-2 py-1"
            >
              Cancella
            </button>
          )}
          <button 
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-neutral-400 hover:text-black hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-6">
          {/* CATEGORIES & BRANDS ROW */}
          {(results.categories.length > 0 || results.brands.length > 0) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-neutral-100">
              {/* Categories */}
              {results.categories.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-neutral-500" />
                    Categorie
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {results.categories.map(cat => (
                      <button
                        key={cat.slug}
                        onClick={() => handleSelectCategory(cat.urlPath)}
                        className="px-2.5 py-1 rounded-md bg-[#F4F4F4] hover:bg-neutral-200 text-xs font-semibold text-neutral-700 transition-colors"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Brands */}
              {results.brands.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-neutral-500" />
                    Marchi Ufficiali
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {results.brands.map(brand => (
                      <button
                        key={brand}
                        onClick={() => handleSelectBrand(brand)}
                        className="px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 text-xs font-semibold text-neutral-700 transition-colors"
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PRODUCTS LIST */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <Guitar className="w-3.5 h-3.5 text-[#D54343]" />
                Strumenti Musicali ({results.products.length})
              </p>
              {query && (
                <button 
                  onClick={() => {
                    setIsSearchOpen(false);
                    navigateTo(`/chitarre?q=${encodeURIComponent(query)}`);
                  }}
                  className="text-xs font-bold text-[#D54343] hover:underline"
                >
                  Vedi tutti i risultati →
                </button>
              )}
            </div>

            {results.products.length === 0 ? (
              <p className="text-xs text-neutral-500 py-3">Nessun prodotto trovato per "{query}". Prova a cercare un marchio (es. Fender, Schecter, Crafter) o una categoria.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {results.products.map(product => (
                  <div
                    key={product.id}
                    onClick={() => handleSelectProduct(product.slug)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F4F4F4] cursor-pointer transition-colors border border-transparent hover:border-neutral-200 group"
                  >
                    <div className="w-14 h-14 bg-white rounded-lg border border-neutral-100 p-1 shrink-0 flex items-center justify-center">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 block">{product.brand}</span>
                      <p className="text-xs font-bold text-neutral-800 truncate group-hover:text-[#D54343] transition-colors">
                        {product.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-extrabold text-[#333333]">{product.priceFormatted}</span>
                        <span className="text-[9px] bg-neutral-200 text-neutral-600 px-1 rounded font-medium">
                          {product.condition}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ARTICLES & BUYING GUIDES */}
          {results.articles.length > 0 && (
            <div className="pt-2 border-t border-neutral-100">
              <p className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-neutral-500" />
                Guide all'acquisto & Articoli
              </p>
              <div className="space-y-1.5">
                {results.articles.map(article => (
                  <div
                    key={article.id}
                    onClick={() => handleSelectArticle(article.slug)}
                    className="p-2.5 rounded-lg hover:bg-[#F4F4F4] cursor-pointer flex items-center justify-between group transition-colors"
                  >
                    <div>
                      <p className="text-xs font-bold text-neutral-800 group-hover:text-[#D54343] transition-colors">
                        {article.title}
                      </p>
                      <p className="text-[11px] text-neutral-500 line-clamp-1">{article.excerpt}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#D54343] shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
