import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant';

interface VoiceAssistantProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onPulseChange: (pulse: number) => void;
}

export default function VoiceAssistant({ isOpen, onOpenChange, onPulseChange }: VoiceAssistantProps) {
  const { t, i18n } = useTranslation();
  const [textInput, setTextInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const { status, messages, pulse, isSupported, error, ask, startListening, stopListening } =
    useVoiceAssistant(i18n.language, t('assistant.fallback'));

  useEffect(() => {
    onPulseChange(pulse);
  }, [pulse, onPulseChange]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleMicClick = () => {
    if (status === 'listening') {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      ask(textInput);
      setTextInput('');
    }
  };

  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        onClick={() => onOpenChange(!isOpen)}
        className="fixed bottom-6 end-6 z-50 w-14 h-14 rounded-full bg-[var(--color-copper)] text-[var(--color-ink)] shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={status !== 'idle' ? { boxShadow: ['0 0 0 0 rgba(242,166,90,0.5)', '0 0 0 14px rgba(242,166,90,0)'] } : {}}
        transition={status !== 'idle' ? { duration: 1.2, repeat: Infinity } : {}}
        aria-label={t('assistant.title')}
      >
        {isOpen ? <CloseIcon /> : <MicIcon />}
      </motion.button>

      {/* Panneau de conversation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 end-6 z-50 w-[min(380px,calc(100vw-3rem))] h-[min(520px,calc(100vh-10rem))]
                       bg-[var(--color-panel)] border border-[var(--color-line)] rounded-xl shadow-2xl
                       flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-[var(--color-line)] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-trace)] animate-pulse" />
                <p className="text-sm font-medium text-[var(--color-paper)]">{t('assistant.title')}</p>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[var(--color-paper-dim)] hover:bg-[var(--color-panel-raised)] hover:text-[var(--color-paper)] transition-colors"
                aria-label="Fermer"
              >
                <CloseIcon small />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-sm text-[var(--color-paper-dim)] leading-relaxed">
                  {t('assistant.greeting')}
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[var(--color-copper)] text-[var(--color-ink)] ms-auto'
                      : 'bg-[var(--color-panel-raised)] text-[var(--color-paper)]'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {status === 'thinking' && (
                <div className="max-w-[85%] px-3 py-2 rounded-lg text-sm bg-[var(--color-panel-raised)] text-[var(--color-paper-dim)]">
                  {t('assistant.thinking')}
                </div>
              )}
            </div>

            {/* Status bar */}
            {status === 'listening' && (
              <div className="px-4 py-2 text-xs text-[var(--color-trace)] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-trace)] animate-ping" />
                {t('assistant.listening')}
              </div>
            )}

            {!isSupported && (
              <p className="px-4 py-2 text-xs text-[var(--color-paper-dim)]">
                {t('assistant.notSupported')}
              </p>
            )}

            {error && (
              <p className="px-4 py-2 text-xs text-red-500">
                {error === 'mic-denied'
                  ? "Accès au micro refusé. Autorisez le micro dans les paramètres de votre navigateur, puis réessayez."
                  : error === 'no-speech'
                  ? "Je n'ai rien entendu, réessayez en parlant un peu plus fort."
                  : "Un souci est survenu avec le micro. Réessayez, ou écrivez votre question ci-dessous."}
              </p>
            )}

            {/* Input */}
            <form onSubmit={handleTextSubmit} className="p-3 border-t border-[var(--color-line)] flex gap-2">
              {isSupported && (
                <button
                  type="button"
                  onClick={handleMicClick}
                  className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                    status === 'listening'
                      ? 'bg-[var(--color-trace)] text-[var(--color-ink)]'
                      : 'bg-[var(--color-panel-raised)] text-[var(--color-paper-dim)] hover:text-[var(--color-paper)]'
                  }`}
                  aria-label={t('assistant.micLabel')}
                >
                  <MicIcon small />
                </button>
              )}
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={t('assistant.typePlaceholder')}
                className="flex-1 min-w-0 bg-[var(--color-ink)] border border-[var(--color-line)] rounded-md px-3 py-2 text-sm text-[var(--color-paper)] focus:border-[var(--color-copper)] outline-none"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-md bg-[var(--color-copper)] text-[var(--color-ink)] text-sm font-medium shrink-0"
              >
                {t('assistant.send')}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MicIcon({ small }: { small?: boolean }) {
  const size = small ? 16 : 22;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

function CloseIcon({ small }: { small?: boolean } = {}) {
  const size = small ? 14 : 20;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
