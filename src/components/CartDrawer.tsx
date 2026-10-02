import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    cartTotal, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    navigateTo 
  } = useApp();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'klarna' | 'paypal' | 'bank'>('klarna');
  
  // Checkout form fields
  const [formData, setFormData] = useState({
    name: 'Marco Rossi',
    email: 'marco.rossi@example.com',
    phone: '+39 340 1234567',
    address: 'Via Roma 14',
    city: 'Milano',
    zip: '20121'
  });

  if (!isCartOpen) return null;

  const freeShippingThreshold = 199;
  const shippingCost = cartTotal >= freeShippingThreshold || cartTotal === 0 ? 0 : 9.90;
  const finalTotal = cartTotal + shippingCost;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
    clearCart();
  };

  const handleClose = () => {
    setIsCartOpen(false);
    if (checkoutStep === 'success') {
      setCheckoutStep('cart');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end" onClick={handleClose}>
      <div 
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-slide-left relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#D54343]" />
            <h3 className="font-bold text-base text-[#333333]">
              {checkoutStep === 'cart' && 'Il tuo Carrello'}
              {checkoutStep === 'checkout' && 'Cassa Veloce & Sicura'}
              {checkoutStep === 'success' && 'Ordine Confermato'}
            </h3>
          </div>
          <button 
            onClick={handleClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-black hover:bg-neutral-100"
            aria-label="Chiudi carrello"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress (only in cart view) */}
        {checkoutStep === 'cart' && cart.length > 0 && (
          <div className="bg-[#F4F4F4] px-4 py-2.5 border-b border-neutral-200">
            <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
              <span className="flex items-center gap-1.5 text-neutral-700">
                <Truck className="w-3.5 h-3.5 text-[#D54343]" />
                {cartTotal >= freeShippingThreshold ? (
                  <span className="font-bold text-emerald-700">Spedizione gratuita raggiunta!</span>
                ) : (
                  <span>Aggiungi ancora <strong>{(freeShippingThreshold - cartTotal).toFixed(2)} €</strong> per la spedizione gratuita</span>
                )}
              </span>
            </div>
            <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#D54343] h-full transition-all duration-300" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4">
          {checkoutStep === 'cart' && (
            cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-bold text-neutral-800 text-base">Il tuo carrello è vuoto</p>
                  <p className="text-xs text-neutral-500 mt-1">Scopri gli strumenti selezionati da Guitar Tortona</p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('/chitarre');
                  }}
                  className="bg-[#D54343] hover:bg-[#b83434] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg shadow-sm"
                >
                  Esplora le chitarre
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.product.id} className="flex gap-3 pb-3 border-b border-neutral-100">
                    <div className="w-18 h-18 bg-[#F4F4F4] rounded-lg p-1.5 shrink-0 flex items-center justify-center border border-neutral-200">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-neutral-400">{item.product.brand}</span>
                      <h4 className="text-xs font-bold text-neutral-800 truncate" title={item.product.name}>
                        {item.product.name}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] bg-neutral-100 text-neutral-600 px-1 rounded font-medium">
                          {item.product.condition}
                        </span>
                        <span className="text-xs font-black text-[#333333]">
                          {item.product.priceFormatted}
                        </span>
                      </div>

                      {/* Qty and Remove */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-neutral-200 rounded-md bg-white">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-neutral-100 text-neutral-600"
                            aria-label="Riduci quantità"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-neutral-800">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-neutral-100 text-neutral-600"
                            aria-label="Aumenta quantità"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-neutral-400 hover:text-[#D54343] p-1"
                          title="Rimuovi dal carrello"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Liuteria badge */}
                <div className="bg-neutral-50 rounded-lg p-3 text-[11px] text-neutral-600 flex items-start gap-2 border border-neutral-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-neutral-800 block">Laboratorio Liuteria Guitar Tortona</span>
                    Prima della spedizione ogni strumento viene intonato, controllato nell'action e dotato di imballo corazzato anti-urto.
                  </div>
                </div>
              </div>
            )
          )}

          {checkoutStep === 'checkout' && (
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase text-neutral-400 tracking-wider mb-2">1. Dati di Spedizione</h4>
                <div className="space-y-2 text-xs">
                  <input
                    type="text"
                    required
                    placeholder="Nome e Cognome"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:border-[#D54343]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Email per tracciamento"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:border-[#D54343]"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Telefono per il corriere"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:border-[#D54343]"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Indirizzo (Via e Civico)"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:border-[#D54343]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Città"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:border-[#D54343]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="CAP"
                      value={formData.zip}
                      onChange={e => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-neutral-300 focus:outline-hidden focus:border-[#D54343]"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-neutral-200">
                <h4 className="text-xs font-bold uppercase text-neutral-400 tracking-wider mb-2">2. Metodo di Pagamento</h4>
                <div className="space-y-2">
                  {[
                    { id: 'klarna', title: 'Klarna – 3 Rate a Tasso Zero', desc: 'Paga in 3 comode rate mensili senza interessi' },
                    { id: 'card', title: 'Carta di Credito / Debito', desc: 'Visa, Mastercard, Maestro protette 3D Secure' },
                    { id: 'paypal', title: 'PayPal', desc: 'Paga con il tuo account PayPal in sicurezza' },
                    { id: 'bank', title: 'Bonifico Bancario', desc: 'Spedizione dopo ricezione accredito su IBAN' }
                  ].map(method => (
                    <label 
                      key={method.id} 
                      className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                        paymentMethod === method.id 
                          ? 'border-[#D54343] bg-[#D54343]/5' 
                          : 'border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id as any)}
                        className="mt-1 text-[#D54343] focus:ring-[#D54343]"
                      />
                      <div>
                        <span className="text-xs font-bold text-neutral-800 block">{method.title}</span>
                        <span className="text-[11px] text-neutral-500">{method.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-[#D54343] hover:bg-[#b83434] active:bg-[#9d2c2c] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
                >
                  Conferma Ordine • {finalTotal.toLocaleString('it-IT', { minimumFractionDigits: 2 })} €
                </button>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="w-full text-center text-xs font-semibold text-neutral-500 hover:text-black py-2 mt-1"
                >
                  ← Torna al carrello
                </button>
              </div>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-black text-neutral-900">Grazie per il tuo ordine!</h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Ordine N. <strong>GT-{Math.floor(100000 + Math.random() * 900000)}</strong>
                </p>
              </div>
              <div className="bg-[#F4F4F4] rounded-xl p-4 text-xs text-neutral-700 text-left space-y-1.5 border border-neutral-200">
                <p><strong>Destinatario:</strong> {formData.name}</p>
                <p><strong>Spedizione a:</strong> {formData.address}, {formData.zip} {formData.city}</p>
                <p><strong>Tracking:</strong> Riceverai l'email di conferma e il link BRT / GLS appena affidato al corriere.</p>
                <p className="text-[11px] text-neutral-500 pt-1 border-t border-neutral-200">
                  Laboratorio Guitar Tortona: i nostri liutai effettueranno il set-up prima dell'affidamento al corriere.
                </p>
              </div>
              <button
                onClick={handleClose}
                className="w-full bg-[#333333] hover:bg-black text-white text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-colors"
              >
                Continua a navigare
              </button>
            </div>
          )}
        </div>

        {/* Drawer Bottom Bar (when in cart view and cart is not empty) */}
        {checkoutStep === 'cart' && cart.length > 0 && (
          <div className="p-4 border-t border-neutral-200 bg-neutral-50 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotale articoli:</span>
                <span className="font-bold">{cartTotal.toLocaleString('it-IT', { minimumFractionDigits: 2 })} €</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Spedizione assicurata:</span>
                <span>
                  {shippingCost === 0 ? (
                    <strong className="text-emerald-700">GRATUITA</strong>
                  ) : (
                    `${shippingCost.toFixed(2)} €`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-neutral-900 pt-1.5 border-t border-neutral-200">
                <span>Totale:</span>
                <span className="text-[#333333]">{finalTotal.toLocaleString('it-IT', { minimumFractionDigits: 2 })} €</span>
              </div>
              <p className="text-[10px] text-neutral-400 text-right">IVA inclusa</p>
            </div>

            <button
              onClick={() => setCheckoutStep('checkout')}
              className="w-full bg-[#D54343] hover:bg-[#b83434] active:bg-[#9d2c2c] text-white py-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span>Procedi all'acquisto</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
