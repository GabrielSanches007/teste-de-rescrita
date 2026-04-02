
import React, { useState, useCallback } from 'react';
import { correctText } from './services/geminiService';
import { Header } from './components/Header';
import { EditorPanel } from './components/EditorPanel';
import { ResultPanel } from './components/ResultPanel';
import { ActionButtons } from './components/ActionButtons';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [originalText, setOriginalText] = useState<string>('');
  const [correctedText, setCorrectedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [wordCount, setWordCount] = useState({ original: 0, corrected: 0 });

  const calculateWords = (text: string) => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setOriginalText(newText);
    setWordCount(prev => ({ ...prev, original: calculateWords(newText) }));
  };

  const handleCorrectText = useCallback(async () => {
    if (!originalText.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setCorrectedText('');
    setWordCount(prev => ({ ...prev, corrected: 0 }));

    try {
      const result = await correctText(originalText);
      setCorrectedText(result);
      setWordCount(prev => ({ ...prev, corrected: calculateWords(result) }));
    } catch (err) {
      setError('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [originalText, isLoading]);

  const handleClear = () => {
    setOriginalText('');
    setCorrectedText('');
    setError(null);
    setWordCount({ original: 0, corrected: 0 });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-200 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 flex flex-col">
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <EditorPanel
            value={originalText}
            onChange={handleTextChange}
            wordCount={wordCount.original}
          />
          <ResultPanel
            text={correctedText}
            isLoading={isLoading}
            error={error}
            wordCount={wordCount.corrected}
          />
        </div>
        <ActionButtons
          onCorrect={handleCorrectText}
          onClear={handleClear}
          isLoading={isLoading}
          isClearDisabled={!originalText && !correctedText}
          isCorrectDisabled={!originalText.trim()}
        />
      </main>
      <Footer />
    </div>
  );
};

export default App;
