import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import HeroScene from './HeroScene';
import profilePhoto from '../../assets/profile.jpg';

interface HeroProps {
  onOpenAssistant: () => void;
  assistantPulse: number;
}

export default function Hero({ onOpenAssistant, assistantPulse }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden flex items-center bg-[var(--color-hero-bg)]">
      {/* Scène 3D en fond, ambiance */}
      <div className="absolute inset-0 opacity-70">
        <HeroScene pulse={assistantPulse} />
      </div>

      <div className="relative z-10 w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center px-6 md:px-16 py-32 lg:py-0">
        {/* Colonne gauche : texte */}
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm tracking-[0.2em] uppercase text-[var(--color-copper)] mb-4 font-medium"
          >
            Ingénieure Logiciel & IA
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-[var(--font-display)] text-4xl md:text-6xl font-semibold leading-[1.1] text-[var(--color-hero-text)]"
          >
            {t('hero.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-[var(--color-hero-text-dim)] max-w-xl"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#about"
              className="px-6 py-3 rounded-full bg-[var(--color-copper)] text-[var(--color-hero-bg)] font-medium font-[var(--font-display)] hover:bg-[var(--color-copper-dim)] transition-colors"
            >
              {t('hero.cta')}
            </a>
            <button
              onClick={onOpenAssistant}
              className="px-6 py-3 rounded-full border border-[var(--color-hero-line)] text-[var(--color-hero-text)] font-medium font-[var(--font-display)] hover:border-[var(--color-trace)] hover:text-[var(--color-trace)] transition-colors flex items-center gap-2"
            >
              <MicIcon />
              {t('hero.ctaVoice')}
            </button>
          </motion.div>
        </div>

        {/* Colonne droite : grande photo avec halo décoratif */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto lg:mx-0 w-full max-w-sm"
        >
          {/* Halo décoratif */}
          <div
            className="absolute -inset-8 rounded-[3rem] opacity-60 blur-3xl"
            style={{
              background:
                'radial-gradient(circle at 40% 30%, var(--color-copper) 0%, transparent 60%)',
            }}
          />
          <img
            src={profilePhoto}
            alt="Syrine Ahmed"
            className="relative w-full aspect-[4/5] object-cover rounded-[2rem] border-2 border-[var(--color-hero-line)] shadow-2xl"
          />
          <div className="absolute -bottom-5 -start-5 bg-[var(--color-panel)] rounded-2xl px-5 py-3 shadow-xl">
            <p className="font-[var(--font-display)] font-semibold text-[var(--color-paper)]">Syrine Ahmed</p>
            <p className="text-xs text-[var(--color-paper-dim)]">Tunis, Tunisie</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-[var(--color-hero-text-dim)] hidden lg:block"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        scroll ↓
      </motion.div>
    </section>
  );
}

function MicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}
