import { useState, useRef, useCallback, useEffect } from 'react';
import { matchQuestion } from '../lib/knowledgeBase';

type Status = 'idle' | 'listening' | 'thinking' | 'speaking';

export interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export const LANG_TO_SPEECH_LOCALE: Record<string, string> = {
  fr: 'fr-FR',
  en: 'en-US',
  ar: 'ar-SA',
};

// Retire les émojis avant de parler : sans ça, certains moteurs de synthèse
// vocale les épellent ("visage souriant", "fusée"...), ce qui est indésirable.
const EMOJI_PATTERN =
  /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2190}-\u{21FF}\u{2B00}-\u{2BFF}\u{FE0F}\u{200D}]/gu;

export function stripEmojisForSpeech(text: string): string {
  return text.replace(EMOJI_PATTERN, '').replace(/\s{2,}/g, ' ').trim();
}

export function useVoiceAssistant(lang: string, fallbackText: string) {
  const [status, setStatus] = useState<Status>('idle');
  const [messages, setMessages] = useState<Message[]>([]);
  const [pulse, setPulse] = useState(0); // 0..1, monte quand l'assistant parle -> anime la sphère 3D
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const isSupported =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(stripEmojisForSpeech(text));
      utterance.lang = LANG_TO_SPEECH_LOCALE[lang] ?? 'en-US';
      utterance.rate = 1;
      utterance.pitch = 1;

      utterance.onstart = () => {
        setStatus('speaking');
        setPulse(1);
      };
      utterance.onend = () => {
        setStatus('idle');
        setPulse(0);
      };
      utterance.onerror = () => {
        setStatus('idle');
        setPulse(0);
      };

      window.speechSynthesis.speak(utterance);
    },
    [lang]
  );

  const ask = useCallback(
    (question: string) => {
      if (!question.trim()) return;
      setMessages((prev) => [...prev, { role: 'user', text: question }]);
      setStatus('thinking');

      // Petite latence artificielle pour un ressenti "réfléchi" plutôt qu'instantané/robotique
      setTimeout(() => {
        const answer = matchQuestion(question, lang) ?? fallbackText;
        setMessages((prev) => [...prev, { role: 'assistant', text: answer }]);
        speak(answer);
      }, 400);
    },
    [lang, fallbackText, speak]
  );

  const startListening = useCallback(() => {
    if (!isSupported) return;
    setError(null);

    const SpeechRecognitionCtor: typeof SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = LANG_TO_SPEECH_LOCALE[lang] ?? 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setStatus('listening');
    recognition.onerror = (event: any) => {
      setStatus('idle');
      if (event?.error === 'not-allowed' || event?.error === 'service-not-allowed') {
        setError('mic-denied');
      } else if (event?.error === 'no-speech') {
        setError('no-speech');
      } else {
        setError('generic');
      }
    };
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      ask(transcript);
    };
    recognition.onend = () => {
      setStatus((s) => (s === 'listening' ? 'idle' : s));
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch {
      setError('generic');
      setStatus('idle');
    }
  }, [lang, isSupported, ask]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setStatus('idle');
  }, []);

  const reset = useCallback(() => {
    window.speechSynthesis?.cancel();
    recognitionRef.current?.stop();
    setMessages([]);
    setStatus('idle');
    setPulse(0);
  }, []);

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
      recognitionRef.current?.stop();
    };
  }, []);

  return { status, messages, pulse, isSupported, error, ask, startListening, stopListening, speak, reset };
}
