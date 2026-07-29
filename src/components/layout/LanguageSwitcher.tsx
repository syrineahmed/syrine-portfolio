import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '../../i18n';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="fixed top-4 end-4 z-50 flex gap-1 bg-black/25 backdrop-blur-md border border-white/15 rounded-full p-1">
      {supportedLanguages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`
            px-3 py-1.5 rounded-full text-xs font-medium transition-colors
            ${
              i18n.language === lang.code
                ? 'bg-[var(--color-copper)] text-[var(--color-hero-bg)]'
                : 'text-white/80 hover:text-white'
            }
          `}
          aria-label={`Switch to ${lang.label}`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
