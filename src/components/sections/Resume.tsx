import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HiOutlineDocumentText, HiOutlineArrowDownTray } from 'react-icons/hi2';
import SectionHeader from '../ui/SectionHeader';

const RESUME_FILES: Record<string, string> = {
  fr: '/resume/syrine-ahmed-cv-fr.pdf',
  en: '/resume/syrine-ahmed-resume-en.pdf',
  ar: '/resume/syrine-ahmed-resume-en.pdf',
};

export default function Resume() {
  const { t, i18n } = useTranslation();
  const fileHref = RESUME_FILES[i18n.language] ?? RESUME_FILES.en;
  const fileName = fileHref.split('/').pop();

  return (
    <section id="resume" className="py-24 px-6 md:px-16 max-w-4xl">
      <SectionHeader eyebrow="07 — Un seul document" title={t('resume.title')} />

      <motion.div
        data-tour-step
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-8 rounded-2xl bg-[var(--color-panel)] border border-[var(--color-line)]"
      >
        <div className="w-14 h-14 rounded-2xl bg-[var(--color-panel-raised)] flex items-center justify-center shrink-0">
          <HiOutlineDocumentText size={28} className="text-[var(--color-copper)]" />
        </div>

        <div className="flex-1">
          <p className="text-[var(--color-paper)] font-medium">{t('resume.subtitle')}</p>
          <p className="text-xs text-[var(--color-paper-dim)] mt-1">{t('resume.lang_note')}</p>
        </div>

        <div className="flex gap-3 shrink-0">
          <a
            href={fileHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium bg-[var(--color-copper)] text-[var(--color-ink)] hover:opacity-90 transition-opacity"
          >
            <HiOutlineDocumentText size={16} />
            {t('resume.view')}
          </a>
          <a
            href={fileHref}
            download={fileName}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium border border-[var(--color-line)] text-[var(--color-paper)] hover:border-[var(--color-copper)] transition-colors"
          >
            <HiOutlineArrowDownTray size={16} />
            {t('resume.download')}
          </a>
        </div>
      </motion.div>
    </section>
  );
}
