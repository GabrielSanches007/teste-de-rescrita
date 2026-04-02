
import React from 'react';
import { SparklesIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-slate-900/75 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <SparklesIcon className="h-8 w-8 text-indigo-500" />
            <div>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                Corretor Acadêmico
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Educação, Sexualidade e Relações de Gênero</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
