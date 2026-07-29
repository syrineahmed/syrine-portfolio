import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import SectionHeader from '../ui/SectionHeader';
import { certificates } from '../../data/profile';
import { certificateImages } from '../../data/certificateImages';

const CATEGORIES = ['ai', 'data', 'business', 'sustainability'] as const;

export default function Certificates() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section id="certificates" className="py-24 px-6 md:px-16">
      <SectionHeader eyebrow="05 — Formation continue" title={t('certificates.title')} />

      <div className="space-y-12">
        {CATEGORIES.map((cat, ci) => {
          const items = certificates.filter((c) => c.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat}>
              <p className="text-xs tracking-[0.15em] uppercase text-[var(--color-copper)] mb-5 font-medium">
                {t(`certificates.categories.${cat}`)}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((cert, i) => (
                  <motion.button
                    key={cert.id}
                    data-tour-step
                    onClick={() => setSelected(cert.id)}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.4, delay: (ci * items.length + i) * 0.03 }}
                    whileHover={{ y: -4 }}
                    className="text-start rounded-2xl bg-[var(--color-panel)] border border-[var(--color-line)] overflow-hidden hover:border-[var(--color-copper)] transition-colors group"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-white">
                      <img
                        src={certificateImages[cert.id]}
                        alt={cert.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-medium text-sm text-[var(--color-paper)]">{cert.name}</p>
                      <p className="text-xs text-[var(--color-paper-dim)] mt-1">{cert.issuer}</p>
                      <p className="text-xs text-[var(--color-trace)] mt-2">{cert.date}</p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox plein écran */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              src={certificateImages[selected]}
              alt="certificate"
              className="max-w-full max-h-full rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 end-6 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
              aria-label="Fermer"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
