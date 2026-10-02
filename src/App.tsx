/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { CartDrawer } from './components/CartDrawer';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { GuitarFinderModal } from './components/GuitarFinderModal';
import { PredictiveSearchModal } from './components/PredictiveSearchModal';
import { ToastContainer } from './components/ToastContainer';
import { SeoMeta } from './components/SeoMeta';

import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BlogPage } from './pages/BlogPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { WishlistPage } from './pages/WishlistPage';

const AppContent: React.FC = () => {
  const { currentPath } = useApp();

  const renderCurrentView = () => {
    // 1. Product Detail Page: /prodotto/:slug
    if (currentPath.startsWith('/prodotto/')) {
      const slug = currentPath.replace('/prodotto/', '');
      return <ProductDetailPage productSlug={slug} />;
    }

    // 2. Article Detail Page: /blog/:slug
    if (currentPath.startsWith('/blog/') && currentPath !== '/blog') {
      const slug = currentPath.replace('/blog/', '');
      return <ArticleDetailPage articleSlug={slug} />;
    }

    // 3. Blog & Guides Listing: /blog or /guide
    if (currentPath === '/blog' || currentPath.startsWith('/guide')) {
      return <BlogPage />;
    }

    // 4. Wishlist: /preferiti
    if (currentPath === '/preferiti') {
      return <WishlistPage />;
    }

    // 5. Specific Category Pages
    if (currentPath === '/chitarre/elettriche') {
      return <CategoryPage categorySlug="chitarre-elettriche" />;
    }
    if (currentPath === '/chitarre/acustiche') {
      return <CategoryPage categorySlug="chitarre-acustiche" />;
    }
    if (currentPath === '/chitarre/jazz') {
      return <CategoryPage categorySlug="chitarre-jazz" />;
    }
    if (currentPath === '/chitarre/classiche') {
      return <CategoryPage categorySlug="chitarre-classiche" />;
    }
    if (currentPath === '/bassi') {
      return <CategoryPage categorySlug="bassi" />;
    }
    if (currentPath === '/amplificatori') {
      return <CategoryPage categorySlug="amplificatori" />;
    }
    if (currentPath === '/effetti') {
      return <CategoryPage categorySlug="effetti" />;
    }
    if (currentPath === '/strumenti-mancini') {
      return <CategoryPage categorySlug="strumenti-mancini" />;
    }
    if (currentPath === '/accessori') {
      return <CategoryPage categorySlug="accessori" />;
    }
    if (currentPath === '/ukulele') {
      return <CategoryPage categorySlug="ukulele" />;
    }
    if (currentPath === '/usato') {
      return <CategoryPage categorySlug="usato" />;
    }
    if (currentPath === '/rarita') {
      return <CategoryPage categorySlug="rarita" />;
    }
    if (currentPath === '/chitarre') {
      return <CategoryPage categorySlug="chitarre" />;
    }

    // Default: HomePage
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F4F4] text-[#333333] font-sans antialiased">
      <SeoMeta />
      <Header />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />
      <MobileBottomNav />

      {/* Global interactive drawers & modals */}
      <CartDrawer />
      <ComparisonDrawer />
      <GuitarFinderModal />
      <PredictiveSearchModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
