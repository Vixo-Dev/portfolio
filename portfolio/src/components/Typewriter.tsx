import { useState, useEffect } from 'react';

interface TypewriterProps {
  texts: string[];
  delay?: number;
  startDelay?: number;
  pauseTime?: number;
  deleteDelay?: number;
}

export function Typewriter({ texts, delay = 70, startDelay = 0, pauseTime = 2000, deleteDelay = 40 }: TypewriterProps) {
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    const currentWord = texts[textIndex];

    if (isDeleting) {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentWord.substring(0, charIndex - 1));
          setCharIndex(prev => prev - 1);
        }, deleteDelay);
        return () => clearTimeout(timeout);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    } else {
      if (charIndex < currentWord.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentWord.substring(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        }, delay);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
        return () => clearTimeout(timeout);
      }
    }
  }, [charIndex, isDeleting, textIndex, texts, delay, deleteDelay, pauseTime, started]);

  return (
    <span className="inline-flex items-center">
      {currentText}
      <span className="animate-pulse border-r-[3px] border-primary ml-[2px] h-[1.1em] inline-block mb-[2px]"></span>
    </span>
  );
}
