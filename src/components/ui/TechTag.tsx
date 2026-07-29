import { getTechIcon } from '../../data/techIcons';

export default function TechTag({ children }: { children: string }) {
  const Icon = getTechIcon(children);
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-[var(--color-panel-raised)] text-[var(--color-paper-dim)] border border-[var(--color-line)]">
      <Icon size={12} className="text-[var(--color-copper)]" />
      {children}
    </span>
  );
}
