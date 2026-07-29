import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const NAV_ITEMS = [
  { id: 'about', file: 'nav.about' },
  { id: 'projects', file: 'nav.projects' },
  { id: 'skills', file: 'nav.skills' },
  { id: 'experience', file: 'nav.experience' },
  { id: 'education', file: 'nav.education' },
  { id: 'certificates', file: 'nav.certificates' },
  { id: 'resume', file: 'nav.resume' },
  { id: 'contact', file: 'nav.contact' },
];

export default function Sidebar() {
  const { t } = useTranslation();
  const [active, setActive] = useState('about');
  const [open, setOpen] = useState(false);

  const handleClick = (id: string) => {
    setActive(id);
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 start-4 z-50 w-10 h-10 rounded-full bg-[var(--color-panel)] border border-[var(--color-line)] flex items-center justify-center text-[var(--color-paper)] shadow-sm"
        aria-label="Menu"
      >
        <span className="text-sm">{open ? '×' : '☰'}</span>
      </button>

      <aside
        className={`
          fixed top-0 start-0 h-full w-64 bg-[var(--color-panel)] border-e border-[var(--color-line)]
          z-40 flex flex-col py-8 transition-transform duration-300
          md:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'}
        `}
      >
        <div className="px-7 mb-10">
          <p className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-paper)]">Syrine Ahmed</p>
          <p className="text-xs text-[var(--color-paper-dim)] mt-1">Software Engineer & AI Developer</p>
        </div>

        <nav className="flex-1 px-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className={`
                w-full text-start px-4 py-2.5 rounded-lg text-sm mb-1 transition-colors
                ${
                  active === item.id
                    ? 'bg-[var(--color-panel-raised)] text-[var(--color-copper)] font-medium'
                    : 'text-[var(--color-paper-dim)] hover:text-[var(--color-paper)] hover:bg-[var(--color-panel-raised)]/60'
                }
              `}
            >
              {t(item.file)}
            </button>
          ))}
        </nav>

        <div className="px-7 pt-5 border-t border-[var(--color-line)]">
          <p className="text-xs text-[var(--color-paper-dim)]">© 2026</p>
        </div>
      </aside>

      {open && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-30"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
