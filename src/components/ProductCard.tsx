import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Heart, Scale, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    navigateTo, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    addToComparison, 
    isComparing,
    setIsFinderOpen 
  } = useApp();

  const handleCardClick = () => {
    navigateTo(`/prodotto/${product.slug}`);
  };

  const isLiked = isInWishlist(product.id);
  const isComp = isComparing(product.id);

  // Badge styling according to condition
  const getBadgeStyle = (condition: string) => {
    switch (condition) {
      case 'Usato':
        return 'bg-emerald-700 text-white';
      case 'Ex-demo':
        return 'bg-blue-600 text-white';
      case 'B-stock':
        return 'bg-amber-600 text-white';
      case 'Rarità':
        return 'bg-purple-700 text-white';
      default:
        return 'bg-[#333333] text-white';
    }
  };

  return (
    <article className="group bg-white rounded-xl border border-neutral-200 overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-200 relative">
      {/* Top Image & Floating Badges */}
      <div className="relative aspect-square w-full bg-[#F4F4F4] overflow-hidden cursor-pointer" onClick={handleCardClick}>
        <img
          src={product.image}
          alt={`${product.brand} ${product.name} - ${product.condition}`}
          loading="lazy"
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
        />

        {/* Condition Badge */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
          <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-2xs ${getBadgeStyle(product.condition)}`}>
            {product.condition}
          </span>
          {product.isRare && (
            <span className="bg-amber-400 text-neutral-900 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
              Vintage / Raro
            </span>
          )}
        </div>

        {/* Action icons (Wishlist & Compare) */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
          <button
            onClick={e => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-2 rounded-full shadow-md transition-all cursor-pointer ${
              isLiked 
                ? 'bg-[#D54343] text-white' 
                : 'bg-white text-neutral-600 hover:text-[#D54343] hover:scale-110'
            }`}
            title={isLiked ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
            aria-label="Aggiungi ai preferiti"
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
          </button>

          <button
            onClick={e => {
              e.stopPropagation();
              addToComparison(product);
            }}
            className={`p-2 rounded-full shadow-md transition-all cursor-pointer ${
              isComp 
                ? 'bg-neutral-800 text-white' 
                : 'bg-white text-neutral-600 hover:text-black hover:scale-110'
            }`}
            title="Confronta strumento"
            aria-label="Confronta strumento"
          >
            <Scale className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Liuteria check mark badge */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-2xs text-[10px] text-neutral-600 font-medium px-2 py-0.5 rounded flex items-center gap-1 shadow-2xs">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          <span>Setup liutaio incluso</span>
        </div>
      </div>

      {/* Info Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              {product.brand}
            </span>
            <span className="text-[10px] text-neutral-500 font-medium truncate max-w-[120px]">
              {product.categoryLabel}
            </span>
          </div>

          <h3 
            onClick={handleCardClick}
            className="text-sm font-bold text-neutral-900 group-hover:text-[#D54343] transition-colors line-clamp-2 cursor-pointer leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Quick specs pill */}
          {product.specs.pickups && (
            <p className="text-[11px] text-neutral-500 mt-1 line-clamp-1">
              {product.specs.pickups}
            </p>
          )}
        </div>

        {/* Pricing & Add to cart */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div>
            <div className="text-base sm:text-lg font-black text-[#333333] leading-none">
              {product.priceFormatted}
            </div>
            <span className="text-[10px] text-neutral-400 font-medium">IVA inclusa</span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="bg-[#D54343] hover:bg-[#b83434] active:bg-[#9d2c2c] text-white p-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer group-hover:scale-105"
            title="Aggiungi al carrello"
            aria-label="Aggiungi al carrello"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-bold uppercase">Acquista</span>
          </button>
        </div>
      </div>
    </article>
  );
};
