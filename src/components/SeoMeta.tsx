import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/catalogue';
import { CATEGORIES } from '../data/categories';
import { ARTICLES } from '../data/blogAndGuides';

export const SeoMeta: React.FC = () => {
  const { currentPath } = useApp();

  useEffect(() => {
    let title = 'Guitar Tortona – Centro Chitarre dal 1990 | Chitarre, Bassi, Amplificatori';
    let description = 'Redesign ecommerce ad alta fedeltà di Guitar Tortona. Chitarre elettriche, acustiche, jazz, classiche, bassi, amplificatori con il Trova la tua Chitarra AI.';
    let schemaJson: any = null;

    if (currentPath === '/') {
      title = 'Guitar Tortona – Centro Chitarre dal 1990 | Negozio & Liuteria';
      description = 'Oltre trent\'anni di esperienza nelle chitarre elettriche, acustiche, jazz, classiche e bassi. Setup professionale di liuteria e Trova la tua Chitarra AI.';
      schemaJson = {
        '@context': 'https://schema.org',
        '@type': 'MusicStore',
        'name': 'Guitar Tortona',
        'legalName': 'GUITAR di Zitarosa Roberto & C. s.n.c.',
        'url': 'https://guitar-tortona.it/',
        'logo': 'https://guitar-tortona.it/img/guitar-centro-chitarre-tortona-logo-1624306735.jpg',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Strada Ribrocca, 2/a',
          'addressLocality': 'Tortona',
          'addressRegion': 'AL',
          'postalCode': '15057',
          'addressCountry': 'IT'
        },
        'telephone': '+390131821633',
        'email': 'info@guitar-tortona.it'
      };
    } else if (currentPath.startsWith('/prodotto/')) {
      const slug = currentPath.replace('/prodotto/', '');
      const product = PRODUCTS.find(p => p.slug === slug || p.id === slug.split('-')[0]);
      if (product) {
        title = `${product.brand} ${product.name} (${product.condition}) | Guitar Tortona`;
        description = `Acquista ${product.brand} ${product.name}. Prezzo: ${product.priceFormatted}. ${product.conditionDescription || ''}. Setup liuteria gratuito e spedizione 24/48h.`;
        schemaJson = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          'name': `${product.brand} ${product.name}`,
          'image': product.image,
          'description': product.description,
          'sku': product.sku,
          'brand': {
            '@type': 'Brand',
            'name': product.brand
          },
          'itemCondition': product.condition === 'Nuovo' 
            ? 'https://schema.org/NewCondition' 
            : 'https://schema.org/UsedCondition',
          'offers': {
            '@type': 'Offer',
            'url': window.location.href,
            'priceCurrency': 'EUR',
            'price': product.price,
            'availability': product.inStock 
              ? 'https://schema.org/InStock' 
              : 'https://schema.org/OutOfStock',
            'seller': {
              '@type': 'Organization',
              'name': 'Guitar Tortona'
            }
          }
        };
      }
    } else if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '');
      const article = ARTICLES.find(a => a.slug === slug);
      if (article) {
        title = `${article.title} | Guide Liuteria Guitar Tortona`;
        description = article.excerpt;
        schemaJson = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          'headline': article.title,
          'image': article.image,
          'author': {
            '@type': 'Person',
            'name': article.author
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'Guitar Tortona',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://guitar-tortona.it/img/guitar-centro-chitarre-tortona-logo-1624306735.jpg'
            }
          },
          'datePublished': article.date
        };
      }
    } else {
      // Category
      const cat = CATEGORIES.find(c => c.urlPath === currentPath);
      if (cat) {
        title = `${cat.seoTitle} | Guitar Tortona`;
        description = cat.metaDescription;
      }
    }

    document.title = title;
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + currentPath);

    // Update dynamic JSON-LD script tag
    let jsonLdScript = document.getElementById('dynamic-jsonld');
    if (schemaJson) {
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.id = 'dynamic-jsonld';
        jsonLdScript.setAttribute('type', 'application/ld+json');
        document.head.appendChild(jsonLdScript);
      }
      jsonLdScript.textContent = JSON.stringify(schemaJson);
    } else if (jsonLdScript) {
      jsonLdScript.remove();
    }
  }, [currentPath]);

  return null;
};
