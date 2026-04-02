
import React from 'react';
import { SparklesIcon, TrashIcon } from './icons';

interface ActionButtonsProps {
  onCorrect: () => void;
  onClear: () => void;
  isLoading: boolean;
  isCorrectDisabled: boolean;
  isClearDisabled: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onCorrect, onClear, isLoading, isCorrectDisabled, isClearDisabled }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 py-6 md:py-8">
      <button
        onClick={onCorrect}
        disabled={isLoading || isCorrectDisabled}
        className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900 disabled:bg-indigo-400 disabled:cursor-not-allowed"
      >
        <SparklesIcon className="h-5 w-5" />
        <span>{isLoading ? 'Processando...' : 'Corrigir Texto'}</span>
      </button>
       <button
        onClick={onClear}
        disabled={isClearDisabled}
        className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-lg hover:bg-slate-300 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600 dark:focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <TrashIcon className="h-5 w-5" />
        <span>Limpar</span>
      </button>
    </div>
  );
};
