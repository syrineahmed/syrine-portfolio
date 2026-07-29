import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import AvatarFace from './AvatarFace';
import { useActiveSection } from '../../hooks/useActiveSection';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { LANG_TO_SPEECH_LOCALE, stripEmojisForSpeech } from '../../hooks/useVoiceAssistant';

interface AvatarGuideProps {
  /** Monte quand l'assistant vocal parle -> l'avatar "parle" aussi visuellement */
  excited?: number;
  onClick?: () => void;
  /** Coupe la narration automatique (ex : pendant que l'assistant conversationnel parle) */
  paused?: boolean;
}

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'experience', 'education', 'certificates', 'resume', 'contact'];

// Geste de la main levée selon la section, pour rester expressif sans se répéter
const SECTION_GESTURE: Record<string, 'wave' | 'thumbsUp' | 'heart'> = {
  projects: 'thumbsUp',
  contact: 'heart',
};

const VOICE_PREF_KEY = 'avatarGuide.voiceEnabled';
const ONBOARDING_SEEN_KEY = 'avatarGuide.onboardingSeen';

// Un mot est "muet" (composé uniquement d'émojis/pictogrammes) s'il ne contient
// aucun caractère alphanumérique — utile pour aligner le surlignage karaoké
// (calculé sur le texte sans émojis envoyé à la voix) avec le texte affiché
// (qui, lui, garde les émojis).
const HAS_LETTER = /[\p{L}\p{N}]/u;

export default function AvatarGuide({ excited = 0, onClick, paused = false }: AvatarGuideProps) {
  const { t, i18n } = useTranslation();
  const activeSection = useActiveSection();
  const reducedMotion = usePrefersReducedMotion();
  const [blink, setBlink] = useState(false);
  const [visible, setVisible] = useState(false);
  const bubbleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showBubble, setShowBubble] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [wordCursor, setWordCursor] = useState<number | null>(null);
  const [tourActive, setTourActive] = useState(false);
  const touring = useRef(false);
  const tourStepIndex = useRef(-1);
  const [cursorPos, setCursorPos] = useState<{ top: number; left: number } | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const hasInteracted = useRef(false);
  const lastSpokenSection = useRef<string | null>(null);

  const speechSupported = typeof window !== 'undefined' && !!window.speechSynthesis;

  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const saved = window.localStorage.getItem(VOICE_PREF_KEY);
    return saved === null ? true : saved === 'true';
  });

  // Le personnage se déplace doucement d'un côté à l'autre de l'écran selon
  // les sections, pour occuper l'espace disponible plutôt que de rester figé.
  const sectionIndex = SECTION_IDS.indexOf(activeSection);
  const side: 'start' | 'end' = sectionIndex % 2 === 0 ? 'start' : 'end';
  const gesture = SECTION_GESTURE[activeSection] ?? 'wave';

  // Apparition après un court instant, pour un effet d'entrée agréable
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  // Petite bulle d'aide affichée une seule fois (mémorisée) pour expliquer le
  // rôle des boutons 🔊 et "Visite guidée", qui n'était pas clair sans elle.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = window.localStorage.getItem(ONBOARDING_SEEN_KEY);
    if (seen) return;
    const showTimer = setTimeout(() => setShowOnboarding(true), 2200);
    return () => clearTimeout(showTimer);
  }, []);

  const dismissOnboarding = () => {
    setShowOnboarding(false);
    if (typeof window !== 'undefined') window.localStorage.setItem(ONBOARDING_SEEN_KEY, 'true');
  };

  // Clignement des yeux périodique et naturel (coupé si l'utilisateur préfère moins d'animation)
  useEffect(() => {
    if (reducedMotion) return;
    let cancelled = false;
    const loop = () => {
      const delay = 2500 + Math.random() * 2500;
      bubbleTimeout.current = setTimeout(() => {
        if (cancelled) return;
        setBlink(true);
        setTimeout(() => setBlink(false), 150);
        loop();
      }, delay);
    };
    loop();
    return () => {
      cancelled = true;
      if (bubbleTimeout.current) clearTimeout(bubbleTimeout.current);
    };
  }, [reducedMotion]);

  // Un premier geste de l'utilisateur (clic ou scroll) autorise la voix du
  // navigateur, qui l'exige souvent avant de pouvoir parler automatiquement.
  useEffect(() => {
    const markInteracted = () => {
      hasInteracted.current = true;
    };
    window.addEventListener('pointerdown', markInteracted, { once: true });
    window.addEventListener('scroll', markInteracted, { once: true, passive: true });
    window.addEventListener('keydown', markInteracted, { once: true });
    return () => {
      window.removeEventListener('pointerdown', markInteracted);
      window.removeEventListener('scroll', markInteracted);
      window.removeEventListener('keydown', markInteracted);
    };
  }, []);

  const message = t(`guide.${activeSection}`, { defaultValue: t('guide.hero') });

  // Découpe le message en mots pour l'affichage karaoké, et calcule la liste
  // des mots "parlables" (hors émojis) afin d'aligner l'index reçu depuis la
  // synthèse vocale (qui ne voit jamais les émojis) avec le texte affiché.
  const displayWords = useMemo(() => message.split(/\s+/).filter(Boolean), [message]);
  const speakableDisplayIndices = useMemo(
    () => displayWords.reduce<number[]>((acc, w, i) => (HAS_LETTER.test(w) ? [...acc, i] : acc), []),
    [displayWords]
  );
  const highlightedIndex = wordCursor !== null ? speakableDisplayIndices[wordCursor] ?? null : null;

  // Réaffiche la bulle à chaque changement de section, prononce le message à
  // voix haute (bouche + karaoké synchronisés), puis enchaîne sur la section
  // suivante si le mode "visite guidée" est actif.
  useEffect(() => {
    setShowBubble(true);
    setWordCursor(null);

    if (
      voiceEnabled &&
      !paused &&
      hasInteracted.current &&
      speechSupported &&
      lastSpokenSection.current !== activeSection
    ) {
      lastSpokenSection.current = activeSection;
      window.speechSynthesis.cancel();
      const spokenText = stripEmojisForSpeech(message);
      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.lang = LANG_TO_SPEECH_LOCALE[i18n.language] ?? 'fr-FR';
      utterance.rate = 1.02;
      utterance.pitch = 1.08;

      let wordIndex = -1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onboundary = (e) => {
        if (e.name === 'word' || e.name === undefined) {
          wordIndex += 1;
          setWordCursor(wordIndex);
        }
      };
      utterance.onend = () => {
        setIsSpeaking(false);
        setShowBubble(false);
        setWordCursor(null);

        if (touring.current) {
          const nextIndex = SECTION_IDS.indexOf(activeSection) + 1;
          if (nextIndex < SECTION_IDS.length) {
            setTimeout(() => {
              document.getElementById(SECTION_IDS[nextIndex])?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 500);
          } else {
            touring.current = false;
            setTourActive(false);
            setCursorPos(null);
          }
        }
      };
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      const hideTimer = setTimeout(() => setShowBubble(false), 4200);
      return () => clearTimeout(hideTimer);
    }
  }, [activeSection, voiceEnabled, paused, message, i18n.language, speechSupported]);

  useEffect(() => {
    return () => {
      if (speechSupported) window.speechSynthesis.cancel();
    };
  }, [speechSupported]);

  // Réinitialise le curseur de visite à chaque changement de section
  useEffect(() => {
    tourStepIndex.current = -1;
    setCursorPos(null);
  }, [activeSection]);

  // Pendant la visite guidée, déplace un petit curseur lumineux d'un élément
  // à l'autre à l'intérieur de la section active — paragraphe par paragraphe
  // pour un texte, ou barre par barre pour une timeline / une grille de
  // certificats — au rythme de la progression réelle de la voix (wordCursor).
  useEffect(() => {
    if (!tourActive || !isSpeaking) return;
    const steps = Array.from(document.querySelectorAll<HTMLElement>(`#${activeSection} [data-tour-step]`));
    if (steps.length === 0) return;

    const total = Math.max(1, displayWords.length);
    const progress = wordCursor !== null ? (wordCursor + 1) / total : 0;
    const stepIndex = Math.min(steps.length - 1, Math.floor(progress * steps.length));

    if (stepIndex !== tourStepIndex.current) {
      tourStepIndex.current = stepIndex;
      const el = steps[stepIndex];
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const positionTimer = setTimeout(() => {
        const rect = el.getBoundingClientRect();
        setCursorPos({
          top: rect.top + rect.height / 2,
          left: Math.min(window.innerWidth - 28, rect.right + 14),
        });
      }, 380);
      return () => clearTimeout(positionTimer);
    }
  }, [wordCursor, tourActive, isSpeaking, activeSection, displayWords.length]);

  const talking = isSpeaking || excited > 0.3;

  const toggleVoice = () => {
    hasInteracted.current = true;
    setVoiceEnabled((v) => {
      const next = !v;
      if (typeof window !== 'undefined') window.localStorage.setItem(VOICE_PREF_KEY, String(next));
      if (!next && speechSupported) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      return next;
    });
  };

  const toggleTour = () => {
    hasInteracted.current = true;
    if (tourActive) {
      touring.current = false;
      setTourActive(false);
      setCursorPos(null);
      if (speechSupported) window.speechSynthesis.cancel();
      return;
    }
    if (!voiceEnabled) {
      setVoiceEnabled(true);
      if (typeof window !== 'undefined') window.localStorage.setItem(VOICE_PREF_KEY, 'true');
    }
    touring.current = true;
    setTourActive(true);
    lastSpokenSection.current = null; // force la relecture de la section actuelle
    document.getElementById(SECTION_IDS[0])?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      {/* Curseur de la visite guidée : rendu hors du conteneur animé (layout)
          pour que sa position "fixed" reste bien relative au viewport. */}
      <AnimatePresence>
        {tourActive && cursorPos && (
          <motion.div
            className="fixed z-[60] w-6 h-6 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, var(--color-copper) 0%, transparent 72%)',
              boxShadow: '0 0 18px 5px var(--color-copper)',
            }}
            initial={{ opacity: 0, top: cursorPos.top - 12, left: cursorPos.left }}
            animate={{ opacity: 1, top: cursorPos.top - 12, left: cursorPos.left }}
            exit={{ opacity: 0 }}
            transition={{ top: { type: 'spring', stiffness: 120, damping: 22 }, left: { type: 'spring', stiffness: 120, damping: 22 } }}
          >
            <motion.span
              className="absolute inset-0 rounded-full bg-[var(--color-copper)]"
              animate={reducedMotion ? undefined : { scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
      layout
      className={`fixed bottom-6 z-40 hidden md:flex items-end gap-3 ${
        side === 'start' ? 'start-6' : 'end-6 flex-row-reverse'
      }`}
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      animate={
        visible
          ? reducedMotion
            ? { opacity: 1, scale: 1 }
            : { opacity: 1, y: [0, -6, 0], x: [0, side === 'start' ? 8 : -8, 0], scale: 1 }
          : { opacity: 0, y: 30, scale: 0.85 }
      }
      transition={{
        layout: { duration: 0.9, ease: 'easeInOut' },
        y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
        x: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
        opacity: { duration: 0.5 },
        scale: { duration: 0.5 },
      }}
      style={{ width: 'clamp(180px, 20vw, 260px)' }}
    >
      {/* Bulle de dialogue contextuelle, parlée à voix haute avec surlignage karaoké */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, x: side === 'start' ? -10 : 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: side === 'start' ? -10 : 10, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative mb-6 max-w-[220px] bg-[var(--color-panel)] border border-[var(--color-line)] rounded-2xl rounded-bs-sm px-4 py-3 shadow-xl"
          >
            <p className="text-sm text-[var(--color-paper)] leading-snug">
              {displayWords.map((word, i) => (
                <span
                  key={i}
                  className={i === highlightedIndex ? 'text-[var(--color-copper)] font-semibold' : undefined}
                >
                  {word}
                  {i < displayWords.length - 1 ? ' ' : ''}
                </span>
              ))}
            </p>
            {talking && (
              <span className="absolute top-2 end-2 flex gap-0.5 items-end h-3">
                <motion.span
                  className="w-0.5 bg-[var(--color-copper)] rounded-full"
                  animate={{ height: [3, 10, 4, 12, 3] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
                <motion.span
                  className="w-0.5 bg-[var(--color-copper)] rounded-full"
                  animate={{ height: [8, 3, 12, 4, 8] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                />
                <motion.span
                  className="w-0.5 bg-[var(--color-copper)] rounded-full"
                  animate={{ height: [4, 12, 3, 9, 4] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
              </span>
            )}
            <div
              className={`absolute -bottom-1.5 w-3 h-3 bg-[var(--color-panel)] border-b border-e border-[var(--color-line)] rotate-45 ${
                side === 'start' ? 'start-4' : 'end-4'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Personnage : taille responsive selon l'espace disponible */}
      <div className="relative shrink-0 flex flex-col items-center gap-1.5">
        <button
          onClick={() => {
            hasInteracted.current = true;
            setShowBubble(true);
            onClick?.();
          }}
          className="relative shrink-0"
          style={{ width: 'clamp(72px, 8vw, 108px)', aspectRatio: '200 / 260' }}
          aria-label="Ouvrir l'assistant"
        >
          <div
            className="absolute -inset-3 rounded-full blur-xl opacity-50"
            style={{ background: 'radial-gradient(circle, var(--color-copper) 0%, transparent 70%)' }}
          />
          {/* Petit point vert : invite à cliquer quand le personnage n'est pas déjà en train de parler */}
          {!talking && !paused && (
            <motion.span
              className="absolute top-0 end-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[var(--color-ink)] z-10"
              animate={reducedMotion ? undefined : { scale: [1, 1.3, 1], opacity: [1, 0.65, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <div className="relative w-full h-full">
            <AvatarFace blink={blink} talking={talking} gesture={gesture} reducedMotion={reducedMotion} />
          </div>
        </button>

        <div className="relative flex items-center gap-1">
          {/* Bulle d'aide affichée une seule fois : explique le rôle des boutons */}
          <AnimatePresence>
            {showOnboarding && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-full mb-2 start-1/2 -translate-x-1/2 w-56 p-3 rounded-xl bg-[var(--color-copper)] text-[var(--color-ink)] shadow-xl text-start z-10"
              >
                <p className="text-xs font-semibold mb-1">{t('guide.onboardingTitle')}</p>
                <p className="text-[11px] leading-snug opacity-90">{t('guide.onboardingText')}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissOnboarding();
                  }}
                  className="mt-2 text-[10px] font-medium underline underline-offset-2"
                >
                  {t('guide.onboardingDismiss')}
                </button>
                <div className="absolute top-full start-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[var(--color-copper)] rotate-45 -mt-1.5" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Coupe/rétablit la voix, mémorisé d'une visite à l'autre */}
          {speechSupported ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                dismissOnboarding();
                toggleVoice();
              }}
              title={voiceEnabled ? t('guide.voiceLabel') : t('guide.voiceLabel')}
              className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-paper)] opacity-70 hover:opacity-100 transition-opacity"
              aria-label={voiceEnabled ? 'Couper la voix' : 'Activer la voix'}
            >
              <span>{voiceEnabled ? '🔊' : '🔇'}</span>
              <span>{t('guide.voiceLabel')}</span>
            </button>
          ) : (
            <span className="text-[9px] px-2 py-0.5 rounded-full border border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-paper-dim)] opacity-70 max-w-[120px] text-center leading-tight">
              {t('guide.voiceUnavailable')}
            </span>
          )}

          {/* Visite guidée : scroll + narration automatique de section en section, avec curseur qui suit le texte */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              dismissOnboarding();
              toggleTour();
            }}
            title={t('guide.startTour')}
            className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
              tourActive
                ? 'border-[var(--color-copper)] bg-[var(--color-copper)] text-[var(--color-ink)]'
                : 'border-[var(--color-line)] bg-[var(--color-panel)] text-[var(--color-paper)] opacity-70 hover:opacity-100'
            }`}
            aria-label={tourActive ? t('guide.stopTour') : t('guide.startTour')}
          >
            {tourActive ? t('guide.stopTour') : t('guide.startTour')}
          </button>
        </div>
      </div>
    </motion.div>
    </>
  );
}
