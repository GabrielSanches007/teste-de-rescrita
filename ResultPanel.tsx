
import React, { useState, useEffect } from 'react';
import { ClipboardIcon, CheckIcon } from './icons';
import { Loader } from './Loader';

interface ResultPanelProps {
  text: string;
  isLoading: boolean;
  error: string | null;
  wordCount: number;
}

export const ResultPanel: React.FC<ResultPanelProps> = ({ text, isLoading, error, wordCount }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopy = () => {
    if (text) {
      navigator.clipboard.writeText(text);
      setIsCopied(true);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-slate-500 dark:text-slate-400">
          <Loader />
          <p className="mt-4 text-center">Analisando e reescrevendo o texto...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex items-center justify-center h-full text-red-500">
          <p>{error}</p>
        </div>
      );
    }
    if (!text) {
      return (
        <div className="flex items-center justify-center h-full text-slate-400 dark:text-slate-500">
          <p>O texto corrigido aparecerá aqui.</p>
        </div>
      );
    }
    return (
      <div className="prose prose-slate dark:prose-invert max-w-none p-4 whitespace-pre-wrap leading-relaxed">
        {text}
      </div>
    );
  };
  
  return (
    <div className="relative flex flex-col h-full bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex justify-between items-center p-3 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Texto Corrigido</h2>
        <button
          onClick={handleCopy}
          disabled={!text || isLoading}
          className="flex items-center space-x-1.5 px-3 py-1.5 text-sm rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300"
        >
          {isCopied ? <CheckIcon className="h-4 w-4 text-green-500" /> : <ClipboardIcon className="h-4 w-4" />}
          <span>{isCopied ? 'Copiado!' : 'Copiar'}</span>
        </button>
      </div>
      <div className="flex-grow overflow-y-auto" style={{ minHeight: '300px' }}>
          {renderContent()}
      </div>
      <div className="p-3 border-t border-slate-200 dark:border-slate-700 text-right text-sm text-slate-500 dark:text-slate-400">
        Palavras: {wordCount}
      </div>
    </div>
  );
};
