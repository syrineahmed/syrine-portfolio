import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const QUOTES: Record<string, { text: string; author: string }> = {
  fr: {
    text: "Les personnes assez folles pour penser qu'elles peuvent changer le monde sont celles qui y arrivent.",
    author: 'Steve Jobs',
  },
  en: {
    text: 'The people who are crazy enough to think they can change the world are the ones who do.',
    author: 'Steve Jobs',
  },
  ar: {
    text: 'الأشخاص الذين يجرؤون على الاعتقاد بأنهم قادرون على تغيير العالم هم من يفعلون ذلك فعلاً.',
    author: 'ستيف جوبز',
  },
};

export default function Quote() {
  const { i18n } = useTranslation();
  const quote = QUOTES[i18n.language] ?? QUOTES.fr;

  return (
    <section className="py-16 px-6 md:px-16 max-w-4xl mx-auto text-center">
      <motion.blockquote
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-[var(--font-display)] text-2xl md:text-3xl italic text-[var(--color-paper)] leading-snug">
          "{quote.text}"
        </p>
        <footer className="mt-4 text-sm text-[var(--color-copper)] font-medium">
          — {quote.author}
        </footer>
      </motion.blockquote>
    </section>
  );
}
