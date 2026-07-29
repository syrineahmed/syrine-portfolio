import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { contact } from '../../data/profile';
import profilePhoto from '../../assets/profile.jpg';

export default function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 px-6 md:px-16 max-w-6xl">
      <SectionHeader eyebrow="01 — Découvrez-moi" title={t('about.title')} />

      <div className="grid md:grid-cols-[360px_1fr] gap-12 items-center">
        <motion.img
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          src={profilePhoto}
          alt="Syrine Ahmed"
          className="w-full aspect-[4/5] object-cover rounded-[2rem] border border-[var(--color-line)] shadow-lg"
        />

        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-[var(--color-paper-dim)] leading-relaxed"
          >
            {t('about.text')
              .split(/(?<=[.!?])\s+/)
              .filter(Boolean)
              .map((sentence, i) => (
                <span key={i} data-tour-step className="inline">
                  {sentence}{' '}
                </span>
              ))}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-copper)] hover:underline font-medium"
            >
              github.com/syrineahmed →
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-copper)] hover:underline font-medium"
            >
              linkedin →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
