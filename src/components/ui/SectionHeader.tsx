import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
}

export default function SectionHeader({ eyebrow, title }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <p className="text-xs tracking-[0.2em] uppercase text-[var(--color-copper)] mb-3 font-medium">
        {eyebrow}
      </p>
      <h2 className="font-[var(--font-display)] text-3xl md:text-4xl font-semibold text-[var(--color-paper)]">
        {title}
      </h2>
      <div className="w-14 h-[3px] rounded-full bg-[var(--color-trace)] mt-4" />
    </motion.div>
  );
}
