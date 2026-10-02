import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/catalogue';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  ShoppingBag, 
  Heart, 
  Scale, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  CreditCard, 
  CheckCircle2, 
  Phone, 
  Mail, 
  HelpCircle,
  Share2,
  ChevronRight
} from 'lucide-react';

interface ProductDetailPageProps {
  productSlug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productSlug }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    addToComparison, 
    isComparing, 
    setIsFinderOpen,
    navigateTo,
    showToast 
  } = useApp();

  // Find product by slug or id prefix
  const product = useMemo(() => {
    const directMatch = PRODUCTS.find(p => p.slug === productSlug);
    if (directMatch) return directMatch;
    
    // Check if starts with id (e.g. 3701-fender-...)
    const id = productSlug.split('-')[0];
    return PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
  }, [productSlug]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'setup' | 'shipping'>('desc');
  const [quantity, setQuantity] = useState(1);

  // Gallery images (at least product.galleryImages or fallback)
  const gallery = product.galleryImages && product.galleryImages.length > 0 
    ? product.galleryImages 
    : [product.image];

  // Related products (same category)
  const relatedProducts = useMemo(() => {
    return PRODUCTS
      .filter(p => p.id !== product.id && p.category === product.category)
      .slice(0, 4);
  }, [product]);

  // Similar products (same brand or price tier)
  const similarProducts = useMemo(() => {
    return PRODUCTS
      .filter(p => p.id !== product.id && (p.brand === product.brand || Math.abs(p.price - product.price) < 300))
      .slice(0, 4);
  }, [product]);

  const isLiked = isInWishlist(product.id);
  const isComp = isComparing(product.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link dello strumento copiato negli appunti!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10 pb-24 lg:pb-12">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: 'Catalogo', href: '/chitarre' },
          { label: product.categoryLabel, href: `/${product.categorySlug}` },
          { label: `${product.brand} ${product.name}` }
        ]}
      />

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Image Gallery (Swipeable/Thumbnails) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image Container */}
          <div className="relative aspect-square w-full bg-white rounded-2xl border border-neutral-200 overflow-hidden p-6 sm:p-10 flex items-center justify-center shadow-xs">
            <img 
              src={gallery[selectedImageIndex] || product.image} 
              alt={`${product.brand} ${product.name} - ${product.condition}`}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            />

            {/* Condition badge */}
            <span className="absolute top-4 left-4 bg-[#333333] text-white text-xs font-extrabold uppercase px-3 py-1 rounded shadow-xs">
              {product.condition}
            </span>

            {/* Availability tag */}
            <span className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-2xs flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              {product.availability}
            </span>

            {/* Liuteria guarantee pill */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-neutral-900/80 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Collaudata e settata in sede a Tortona prima della spedizione</span>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {gallery.length > 1 && (
            <div className="flex gap-2.5 overflow-x-auto pb-2">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl bg-white border p-2 shrink-0 overflow-hidden transition-all cursor-pointer ${
                    selectedImageIndex === idx 
                      ? 'border-[#D54343] ring-2 ring-[#D54343]/30 shadow-xs' 
                      : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <img src={img} alt={`Foto ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Commercial Info, Pricing & Actions */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 space-y-6 shadow-xs">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <button 
                onClick={() => navigateTo(`/chitarre?brand=${encodeURIComponent(product.brand)}`)}
                className="text-xs font-black uppercase tracking-widest text-[#D54343] hover:underline"
              >
                {product.brand}
              </button>
              <span className="text-[11px] text-neutral-400 font-mono font-medium">
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-neutral-900 leading-tight">
              {product.name}
            </h1>

            <p className="text-xs text-neutral-500 mt-1">
              {product.shortDescription}
            </p>
          </div>

          {/* Pricing & Installment badge */}
          <div className="pt-2 border-t border-neutral-100">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-[#333333]">
                {product.priceFormatted}
              </span>
              <span className="text-xs text-neutral-400">IVA inclusa</span>
            </div>

            {/* Installments with Klarna / PayPal */}
            {product.price > 100 && (
              <div className="mt-2.5 bg-[#F4F4F4] rounded-lg p-2.5 text-xs text-neutral-700 flex items-center justify-between border border-neutral-200">
                <span className="flex items-center gap-1.5 font-medium">
                  <CreditCard className="w-4 h-4 text-[#D54343]" />
                  oppure <strong>3 rate da {(product.price / 3).toFixed(2)} €</strong> a tasso zero
                </span>
                <span className="text-[10px] font-extrabold uppercase bg-neutral-300 text-neutral-800 px-1.5 py-0.5 rounded">
                  Klarna / PayPal
                </span>
              </div>
            )}
          </div>

          {/* Actions: Add to Cart, Qty, Wishlist, Compare */}
          <div className="space-y-3 pt-2">
            <div className="flex gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-neutral-300 rounded-xl bg-[#F4F4F4] px-2 shrink-0">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 py-2 text-neutral-600 hover:text-black font-bold text-sm"
                  aria-label="Diminuisci quantità"
                >
                  -
                </button>
                <span className="px-3 font-bold text-sm text-neutral-800">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-2 text-neutral-600 hover:text-black font-bold text-sm"
                  aria-label="Aumenta quantità"
                >
                  +
                </button>
              </div>

              {/* Main Add to Cart */}
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 bg-[#D54343] hover:bg-[#b83434] active:bg-[#9d2c2c] text-white py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Aggiungi al Carrello</span>
              </button>
            </div>

            {/* Secondary actions: Wishlist, Compare, Share */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isLiked ? 'bg-[#D54343]/10 border-[#D54343] text-[#D54343]' : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-[#D54343]' : ''}`} />
                <span>{isLiked ? 'Nei Preferiti' : 'Salva nei preferiti'}</span>
              </button>

              <button
                onClick={() => addToComparison(product)}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                  isComp ? 'bg-neutral-800 border-neutral-800 text-white' : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{isComp ? 'In confronto' : 'Confronta'}</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl border border-neutral-200 text-neutral-600 hover:bg-neutral-50 transition-colors"
                title="Condividi scheda"
                aria-label="Condividi scheda"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Differentiating AI Finder Block inside PDP: "È la chitarra giusta per te?" */}
          <div className="bg-gradient-to-r from-neutral-900 to-[#333333] text-white rounded-xl p-4 space-y-2 border border-neutral-700 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                <Sparkles className="w-4 h-4" />
                <span>È la chitarra giusta per te?</span>
              </div>
              <span className="text-[10px] uppercase font-bold text-neutral-400">Verifica AI</span>
            </div>
            <p className="text-xs text-neutral-300 leading-snug">
              Scopri se questa <strong>{product.brand}</strong> si adatta al tuo stile, livello di tecnica e sonorità preferite con il test guidato.
            </p>
            <button
              onClick={() => setIsFinderOpen(true)}
              className="w-full bg-[#D54343] hover:bg-[#b83434] text-white text-xs font-bold uppercase tracking-wider py-2 rounded-lg transition-colors cursor-pointer"
            >
              Fai il test in 1 minuto →
            </button>
          </div>

          {/* Trust points list */}
          <div className="pt-2 border-t border-neutral-100 space-y-2 text-xs text-neutral-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Spedizione con corriere espresso tracciato in 24/48h</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Garanzia 24 mesi e assistenza diretta del nostro liutaio</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Diritto di recesso 14 giorni con rimborso rapido</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Dubbi? Chiamaci al negozio di Tortona: <strong>0131 821633</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Descrizione, Scheda Tecnica, Liuteria & Setup, Spedizione */}
      <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs">
        {/* Tab Headers */}
        <div className="flex border-b border-neutral-200 bg-neutral-50 overflow-x-auto">
          {[
            { id: 'desc', label: 'Descrizione Strumento' },
            { id: 'specs', label: 'Scheda Tecnica Dettagliata' },
            { id: 'setup', label: 'Liuteria & Manutenzione' },
            { id: 'shipping', label: 'Spedizione & Imballo' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer border-b-2 ${
                activeTab === tab.id
                  ? 'border-[#D54343] text-[#D54343] bg-white'
                  : 'border-transparent text-neutral-500 hover:text-black hover:bg-neutral-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-6 sm:p-8 text-neutral-700 text-sm leading-relaxed">
          {activeTab === 'desc' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="text-lg font-bold text-neutral-900">
                Informazioni su {product.brand} {product.name}
              </h3>
              <p>{product.description}</p>
              <p>
                Prima di essere messo in esposizione o confezionato per la consegna, questo strumento viene sottoposto al collaudo del nostro liutaio qualificato:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600">
                <li>Verifica planarità della tastiera e rettifica accurata di eventuali asperità sui bordi dei tasti.</li>
                <li>Settaggio action millimetrico per garantire morbidezza senza frizioni o buzz indesiderati.</li>
                <li>Controllo dell'intonazione delle ottave tramite accordatore stroboscopico.</li>
                <li>Ispezione di potenziometri, selettori e connettore jack con prodotti disossidanti specifici.</li>
              </ul>
              <div className="pt-2 text-xs text-neutral-500">
                Disponibile anche in prova presso la nostra sala dedicata a Tortona (AL), Strada Ribrocca 2/a.
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-3xl">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">
                Specifiche Tecniche di Fabbrica
              </h3>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs">
                {Object.entries(product.specs).map(([key, value]) => {
                  const labels: { [k: string]: string } = {
                    body: 'Legno Corpo',
                    neck: 'Manico',
                    fingerboard: 'Tastiera',
                    pickups: 'Configurazione Pickup',
                    bridge: 'Ponte & Meccaniche',
                    frets: 'Numero & Tipologia Tasti',
                    scale: 'Lunghezza Scala',
                    finish: 'Finitura',
                    electronics: 'Elettronica & Controlli',
                    strings: 'Corde consigliate',
                    caseIncluded: 'Custodia in dotazione',
                    origin: 'Origine & Collaudo',
                    weight: 'Peso / Struttura'
                  };
                  return (
                    <div key={key} className="bg-[#F4F4F4] p-3 rounded-lg border border-neutral-200">
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{labels[key] || key}</dt>
                      <dd className="font-semibold text-neutral-800 mt-0.5">{value}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          )}

          {activeTab === 'setup' && (
            <div className="space-y-4 max-w-3xl text-xs">
              <h3 className="text-lg font-bold text-neutral-900">
                Il servizio di Liuteria Guitar Tortona
              </h3>
              <p>
                Guitar Tortona nasce nel 1990 come laboratorio e centro specializzato. Per noi una chitarra non è una scatola da magazzino, ma uno strumento vivo che deve ispirare chi lo suona.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-[#F4F4F4] p-3 rounded-lg border border-neutral-200">
                  <span className="font-bold text-neutral-900 block mb-1">Set-up gratuito</span>
                  Incluso prima di ogni spedizione o consegna diretta.
                </div>
                <div className="bg-[#F4F4F4] p-3 rounded-lg border border-neutral-200">
                  <span className="font-bold text-neutral-900 block mb-1">Corde fresche</span>
                  Montate e tirate a dovere per garantire stabilità d'accordatura immediata.
                </div>
                <div className="bg-[#F4F4F4] p-3 rounded-lg border border-neutral-200">
                  <span className="font-bold text-neutral-900 block mb-1">Assistenza post-vendita</span>
                  Siamo sempre a tua disposizione via telefono ed email per consigli sulla cura del legno.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="space-y-3 max-w-3xl text-xs">
              <h3 className="text-lg font-bold text-neutral-900">
                Spedizioni in 24/48 ore e Imballi Protetti
              </h3>
              <p>
                Spediamo in tutta Italia con corrieri espressi primari (BRT, GLS, DHL) con codice di tracciamento inviato via email e SMS.
              </p>
              <p>
                <strong>Come confezioniamo il tuo strumento:</strong> Utilizziamo cartoni a doppia onda specifici per chitarre, con guscio interno ammortizzante, protezione della paletta per scongiurare danni da trasporto e sigillatura antiumidità.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-neutral-900">
              Altri strumenti in {product.categoryLabel}
            </h2>
            <button
              onClick={() => navigateTo(`/${product.categorySlug}`)}
              className="text-xs font-bold text-[#D54343] hover:underline"
            >
              Vedi tutta la categoria →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Similar / Brand Products */}
      {similarProducts.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-900">
            Potrebbero interessarti anche
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {similarProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Mobile Add-to-Cart Bar */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-30 bg-white border-t border-neutral-200 px-4 py-2.5 flex items-center justify-between shadow-lg">
        <div>
          <span className="text-[10px] font-bold text-neutral-400 uppercase truncate max-w-[140px] block">
            {product.brand}
          </span>
          <span className="text-base font-black text-[#333333]">
            {product.priceFormatted}
          </span>
        </div>
        <button
          onClick={() => addToCart(product, quantity)}
          className="bg-[#D54343] hover:bg-[#b83434] active:bg-[#9d2c2c] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Aggiungi</span>
        </button>
      </div>
    </div>
  );
};
