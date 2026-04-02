
import React from 'react';

interface EditorPanelProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  wordCount: number;
}

export const EditorPanel: React.FC<EditorPanelProps> = ({ value, onChange, wordCount }) => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="p-3 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Texto Original</h2>
      </div>
      <div className="flex-grow p-1">
        <textarea
          value={value}
          onChange={onChange}
          placeholder="Insira aqui o parágrafo que você deseja refinar..."
          className="w-full h-full p-3 resize-none bg-transparent focus:outline-none text-slate-600 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 text-base leading-relaxed"
          style={{ minHeight: '300px' }}
        />
      </div>
      <div className="p-3 border-t border-slate-200 dark:border-slate-700 text-right text-sm text-slate-500 dark:text-slate-400">
        Palavras: {wordCount}
      </div>
    </div>
  );
};
