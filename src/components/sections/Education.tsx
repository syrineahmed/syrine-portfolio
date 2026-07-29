import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { education } from '../../data/profile';
import graduationPhoto from '../../assets/graduation.jpg';

export default function Education() {
  const { t } = useTranslation();

  return (
    <section id="education" className="py-24 px-6 md:px-16 max-w-6xl">
      <SectionHeader eyebrow="04b — Formation académique" title={t('education.title')} />

      <div className="grid md:grid-cols-[1fr_320px] gap-12 items-center">
        <div className="space-y-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              data-tour-step
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-5 rounded-2xl bg-[var(--color-panel)] border border-[var(--color-line)] flex items-center justify-between gap-4 flex-wrap"
            >
              <div>
                <h3 className="font-[var(--font-display)] font-semibold text-lg text-[var(--color-paper)]">
                  {t(edu.degreeKey)}
                </h3>
                <p className="text-sm text-[var(--color-paper-dim)] mt-1">{edu.school}</p>
              </div>
              <span className="text-xs text-[var(--color-trace)] whitespace-nowrap font-medium">
                {edu.period}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          src={graduationPhoto}
          alt="Syrine Ahmed - remise de diplôme"
          className="w-full aspect-square object-cover rounded-2xl border border-[var(--color-line)] shadow-lg"
        />
      </div>
    </section>
  );
}
