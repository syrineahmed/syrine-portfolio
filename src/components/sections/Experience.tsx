import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import TechTag from '../ui/TechTag';
import { experiences } from '../../data/profile';

export default function Experience() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Progression du scroll le long de la timeline : 0 en haut, 1 en bas.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 25, restDelta: 0.001 });
  const dotTop = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className="py-24 px-6 md:px-16 max-w-4xl">
      <SectionHeader eyebrow="04 — Parcours" title={t('experience.title')} />

      <div ref={containerRef} className="relative ps-10">
        {/* Ligne de fond, statique */}
        <div className="absolute start-[7px] top-0 bottom-0 w-[2px] bg-[var(--color-line)]" />

        {/* Ligne qui se remplit progressivement au scroll */}
        <motion.div
          className="absolute start-[7px] top-0 w-[2px] bg-[var(--color-copper)] origin-top"
          style={{ height: '100%', scaleY: smoothProgress }}
        />

        {/* Point lumineux qui suit précisément le scroll */}
        <motion.div
          className="absolute start-[7px] z-10 -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2"
          style={{ top: dotTop }}
        >
          <div className="relative w-4 h-4">
            <motion.span
              className="absolute inset-0 rounded-full bg-[var(--color-copper)]"
              animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="absolute inset-0 rounded-full bg-[var(--color-copper)] shadow-[0_0_10px_var(--color-copper)]" />
          </div>
        </motion.div>

        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            data-tour-step
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative mb-10 last:mb-0"
          >
            <span className="absolute -start-[37px] top-1.5 w-3 h-3 rounded-full bg-[var(--color-panel)] border-2 border-[var(--color-copper)]" />
            <p className="text-xs text-[var(--color-paper-dim)] mb-1 font-medium">{exp.period}</p>
            <h3 className="font-[var(--font-display)] font-semibold text-lg text-[var(--color-paper)]">
              {t(exp.roleKey)} — {exp.company}
            </h3>
            <p className="text-sm text-[var(--color-paper-dim)] mt-1 mb-3">
              {exp.location}
            </p>
            <p className="text-sm text-[var(--color-paper-dim)] mb-3 leading-relaxed">
              {t(exp.descKey)}
            </p>
            <div className="flex flex-wrap gap-2">
              {exp.tech.map((tech) => (
                <TechTag key={tech}>{tech}</TechTag>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
