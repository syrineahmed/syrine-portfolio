import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import TechTag from '../ui/TechTag';
import { projects, type Project } from '../../data/profile';

function ProjectCard({ project, index, badge }: { project: Project; index: number; badge?: string }) {
  const { t } = useTranslation();
  const link = project.link ?? project.repo;
  const linkLabel = project.link ? t('projects.viewDemo') : t('projects.viewRepo');

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      data-tour-step
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative block p-6 rounded-lg bg-[var(--color-panel)] border border-[var(--color-line)] hover:border-[var(--color-copper)] transition-colors"
    >
      {badge && (
        <span className="absolute -top-2.5 start-5 text-[10px] font-medium px-2.5 py-1 rounded-full bg-[var(--color-trace)] text-[var(--color-ink)] shadow-sm">
          {badge}
        </span>
      )}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-[var(--font-display)] font-semibold text-lg text-[var(--color-paper)] group-hover:text-[var(--color-copper)] transition-colors">
          {t(project.titleKey)}
        </h3>
        <span className="font-mono text-xs text-[var(--color-paper-dim)] group-hover:text-[var(--color-copper)] transition-colors">
          ↗
        </span>
      </div>
      <p className="text-sm text-[var(--color-paper-dim)] mb-4 leading-relaxed">
        {t(project.descKey)}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <TechTag key={tech}>{tech}</TechTag>
        ))}
      </div>
      <p className="font-mono text-xs text-[var(--color-trace)] mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {linkLabel} →
      </p>
    </motion.a>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-6 md:px-16">
      <SectionHeader eyebrow="02 — Ce que j'ai construit" title={t('projects.title')} />

      <p className="font-mono text-xs text-[var(--color-paper-dim)] mb-4 uppercase tracking-wide">
        {t('projects.featuredLabel')}
      </p>
      <div className="grid md:grid-cols-2 gap-5 mb-14">
        {featured.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} badge={i === 0 ? t('projects.featuredBadge') : undefined} />
        ))}
      </div>

      <p className="font-mono text-xs text-[var(--color-paper-dim)] mb-4 uppercase tracking-wide">
        {t('projects.otherLabel')}
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        {other.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
