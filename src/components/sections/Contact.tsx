import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionHeader from '../ui/SectionHeader';
import { contact } from '../../data/profile';
import profilePhoto from '../../assets/profile.jpg';
import { FaLinkedin, FaWhatsapp, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa6';
import { HiOutlineMail } from 'react-icons/hi';

const CHANNELS = [
  { key: 'email', icon: HiOutlineMail, label: 'Email', href: (c: typeof contact) => `mailto:${c.email}`, value: (c: typeof contact) => c.email, color: '#C4715F' },
  { key: 'whatsapp', icon: FaWhatsapp, label: 'WhatsApp', href: (c: typeof contact) => c.whatsapp, value: (c: typeof contact) => c.phone, color: '#25D366' },
  { key: 'linkedin', icon: FaLinkedin, label: 'LinkedIn', href: (c: typeof contact) => c.linkedin, value: () => 'syrine-ahmed', color: '#0A66C2' },
  { key: 'github', icon: FaGithub, label: 'GitHub', href: (c: typeof contact) => c.github, value: () => 'syrineahmed', color: '#333333' },
  { key: 'facebook', icon: FaFacebook, label: 'Facebook', href: (c: typeof contact) => c.facebook, value: () => 'syrine.ahmed', color: '#1877F2' },
  { key: 'instagram', icon: FaInstagram, label: 'Instagram', href: (c: typeof contact) => c.instagram, value: () => '@syrine_ahmeed', color: '#E4405F' },
];

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-24 px-6 md:px-16 max-w-5xl">
      <SectionHeader eyebrow="06 — Restons en contact" title={t('contact.title')} />

      <div className="grid md:grid-cols-[auto_1fr] gap-10 items-start mb-14">
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          src={profilePhoto}
          alt="Syrine Ahmed"
          className="w-28 h-28 rounded-full object-cover border-2 border-[var(--color-copper)] shadow-md"
        />

        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-panel-raised)] mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-[var(--color-paper)]">{t('contact.availableFor')}</span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-paper)] mb-2"
          >
            {t('contact.subtitle')}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[var(--color-paper-dim)] max-w-xl"
          >
            {t('contact.text')}
          </motion.p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CHANNELS.map((channel, i) => {
          const Icon = channel.icon;
          return (
            <motion.a
              key={channel.key}
              href={channel.href(contact)}
              target="_blank"
              rel="noopener noreferrer"
              data-tour-step
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--color-panel)] border border-[var(--color-line)] hover:border-[var(--color-copper)] transition-colors"
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${channel.color}18` }}
              >
                <Icon size={20} style={{ color: channel.color }} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[var(--color-paper-dim)]">{channel.label}</p>
                <p className="text-sm font-medium text-[var(--color-paper)] truncate">{channel.value(contact)}</p>
              </div>
            </motion.a>
          );
        })}
      </div>

      <footer className="mt-20 pt-8 border-t border-[var(--color-line)] text-xs text-[var(--color-paper-dim)]">
        © 2026 Syrine Ahmed — {contact.location}
      </footer>
    </section>
  );
}
