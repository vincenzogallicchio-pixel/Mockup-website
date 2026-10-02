import React from 'react';
import { BreadcrumbItem } from '../types';
import { useApp } from '../context/AppContext';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { navigateTo } = useApp();

  return (
    <nav aria-label="Breadcrumb" className="py-3 text-xs text-neutral-500 overflow-x-auto whitespace-nowrap">
      <ol className="flex items-center gap-1.5 list-none p-0 m-0">
        <li className="flex items-center">
          <button 
            onClick={() => navigateTo('/')}
            className="flex items-center gap-1 text-neutral-500 hover:text-black transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </button>
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              <ChevronRight className="w-3 h-3 text-neutral-400 shrink-0" />
              {isLast || !item.href ? (
                <span className="font-semibold text-neutral-900 truncate max-w-[200px] sm:max-w-none" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => item.href && navigateTo(item.href)}
                  className="text-neutral-500 hover:text-black transition-colors truncate max-w-[150px] sm:max-w-none"
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
