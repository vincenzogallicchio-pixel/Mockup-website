import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ARTICLES } from '../data/blogAndGuides';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { BookOpen, Sparkles, ChevronRight, Clock, User } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { navigateTo, setIsFinderOpen } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredArticles = selectedCategory === 'all'
    ? ARTICLES
    : ARTICLES.filter(a => a.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs 
        items={[
          { label: 'Blog & Guide all\'acquisto' }
        ]}
      />

      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200">
        <div className="max-w-2xl space-y-2">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D54343] bg-[#D54343]/10 px-2 py-0.5 rounded">
            Magazine & Liuteria
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Guide all'Acquisto, Notizie e Approfondimenti
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1">
            I consigli e le risposte del nostro laboratorio a Tortona per aiutarti a scegliere lo strumento perfetto e prendertene cura nel tempo.
          </p>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 pt-4">
            {['all', 'Guida all\'acquisto', 'News', 'Recensione', 'Liuteria & Cura'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#D54343] text-white shadow-xs'
                    : 'bg-[#F4F4F4] text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat === 'all' ? 'Tutti gli articoli' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Finder prompt */}
      <div className="bg-[#333333] text-white rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D54343] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Preferisci un consiglio personalizzato?</h2>
            <p className="text-xs text-neutral-300">Prova il nostro questionario "Trova la tua chitarra" per una raccomandazione immediata.</p>
          </div>
        </div>
        <button
          onClick={() => setIsFinderOpen(true)}
          className="bg-[#D54343] hover:bg-[#b83434] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shrink-0 transition-colors"
        >
          Fai il test ora
        </button>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map(article => (
          <article
            key={article.id}
            onClick={() => navigateTo(`/blog/${article.slug}`)}
            className="group bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="aspect-video w-full bg-[#F4F4F4] overflow-hidden relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-[#333333]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-2xs">
                  {article.category}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center gap-3 text-[11px] text-neutral-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                  <span>•</span>
                  <span>{article.date}</span>
                </div>

                <h3 className="text-base font-bold text-neutral-900 group-hover:text-[#D54343] transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-neutral-500 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between text-xs font-bold text-[#D54343]">
              <span>Leggi l'articolo</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
