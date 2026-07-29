import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { skills } from '../../data/profile';
import { getTechIcon } from '../../data/techIcons';

const CATEGORIES = ['ai', 'backend', 'frontend', 'devops', 'tools'] as const;

export default function Skills() {
  const { t } = useTranslation();

  return (
    <section id="skills" className="py-24 px-6 md:px-16">
      <SectionHeader eyebrow="03 — Boîte à outils" title={t('skills.title')} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat}
            data-tour-step
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="p-6 rounded-2xl bg-[var(--color-panel)] border border-[var(--color-line)]"
          >
            <h3 className="font-[var(--font-display)] font-semibold text-lg text-[var(--color-paper)] mb-4">
              {t(`skills.${cat}`)}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills[cat].map((skill) => {
                const Icon = getTechIcon(skill);
                return (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs bg-[var(--color-panel-raised)] text-[var(--color-paper-dim)] border border-[var(--color-line)]"
                  >
                    <Icon size={13} className="text-[var(--color-copper)]" />
                    {skill}
                  </span>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
