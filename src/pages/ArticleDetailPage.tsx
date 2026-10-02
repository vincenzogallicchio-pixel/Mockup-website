import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ARTICLES } from '../data/blogAndGuides';
import { PRODUCTS } from '../data/catalogue';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Sparkles, Clock, User, ArrowLeft, HelpCircle } from 'lucide-react';

interface ArticleDetailPageProps {
  articleSlug: string;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ articleSlug }) => {
  const { navigateTo, setIsFinderOpen } = useApp();

  const article = useMemo(() => {
    return ARTICLES.find(a => a.slug === articleSlug) || ARTICLES[0];
  }, [articleSlug]);

  // Suggested products matching this guide
  const suggestedProducts = useMemo(() => {
    if (article.slug.includes('acustic')) {
      return PRODUCTS.filter(p => p.category === 'chitarre-acustiche').slice(0, 3);
    }
    if (article.slug.includes('elettric')) {
      return PRODUCTS.filter(p => p.category === 'chitarre-elettriche').slice(0, 3);
    }
    if (article.slug.includes('500')) {
      return PRODUCTS.filter(p => p.price >= 300 && p.price <= 600).slice(0, 3);
    }
    if (article.slug.includes('blues')) {
      return PRODUCTS.filter(p => p.genres.includes('Blues')).slice(0, 3);
    }
    return PRODUCTS.slice(0, 3);
  }, [article]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: 'Blog & Guide', href: '/blog' },
          { label: article.title }
        ]}
      />

      {/* Article Container */}
      <article className="bg-white rounded-2xl p-6 sm:p-10 border border-neutral-200 space-y-6">
        {/* Header */}
        <div className="space-y-3 pb-6 border-b border-neutral-100">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D54343] bg-[#D54343]/10 px-2.5 py-1 rounded inline-block">
            {article.category}
          </span>

          <h1 className="text-2xl sm:text-4xl font-black text-neutral-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
            <span className="flex items-center gap-1.5 text-neutral-700 font-semibold">
              <User className="w-3.5 h-3.5 text-[#D54343]" />
              {article.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Tempo di lettura: {article.readTime}
            </span>
            <span>•</span>
            <span>{article.date}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-video w-full rounded-xl overflow-hidden bg-[#F4F4F4] border border-neutral-200">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Intro Excerpt */}
        <div className="text-base sm:text-lg font-medium text-neutral-700 leading-relaxed italic border-l-4 border-[#D54343] pl-4">
          {article.excerpt}
        </div>

        {/* Article Body Paragraphs */}
        <div className="space-y-4 text-sm sm:text-base text-neutral-800 leading-relaxed pt-2">
          {article.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* FAQ box if present */}
        {article.faq && article.faq.length > 0 && (
          <div className="bg-[#F4F4F4] rounded-xl p-6 border border-neutral-200 space-y-3 mt-8">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#D54343]" />
              <h2 className="text-base font-bold text-neutral-900">
                Domande frequenti su questo tema
              </h2>
            </div>
            <div className="space-y-3 pt-2">
              {article.faq.map((item, fIdx) => (
                <div key={fIdx} className="bg-white p-4 rounded-lg border border-neutral-200">
                  <h3 className="text-xs font-bold text-neutral-900 mb-1">{item.q}</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to action: AI Guitar Finder */}
        <div className="bg-neutral-900 text-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-amber-300 shrink-0" />
            <div>
              <h3 className="font-bold text-sm">Vuoi trovare la chitarra su misura per te?</h3>
              <p className="text-xs text-neutral-300">Usa il nostro strumento di raccomandazione intelligente.</p>
            </div>
          </div>
          <button
            onClick={() => setIsFinderOpen(true)}
            className="bg-[#D54343] hover:bg-[#b83434] text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shrink-0 transition-colors"
          >
            Trova la tua chitarra
          </button>
        </div>
      </article>

      {/* Suggested Products Section */}
      {suggestedProducts.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-neutral-900">
            Strumenti consigliati correlati a questa guida
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {suggestedProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('/blog')}
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 hover:text-black py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Torna a tutte le guide & articoli</span>
        </button>
      </div>
    </div>
  );
};
