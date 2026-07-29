import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AvatarFaceProps {
  blink: boolean;
  talking: boolean;
  /** Geste de la main levée, varie selon la section pour rester expressif */
  gesture?: 'wave' | 'thumbsUp' | 'heart';
  /** Coupe les animations continues (respecte prefers-reduced-motion) */
  reducedMotion?: boolean;
}

// Personnage animé stylisé en SVG : silhouette de cheveux fluide, grands yeux
// expressifs, bras et mains qui bougent (salut, main près du visage), et un
// visage qui alterne naturellement entre plusieurs sourires. Dessiné à la main
// plutôt qu'assemblé à partir de primitives géométriques brutes.
export default function AvatarFace({ blink, talking, gesture = 'wave', reducedMotion = false }: AvatarFaceProps) {
  const [expression, setExpression] = useState<'smile' | 'bigSmile'>('smile');

  // Alterne doucement entre deux sourires pour donner de la vie au visage
  // quand le personnage ne parle pas.
  useEffect(() => {
    let cancelled = false;
    const loop = () => {
      const delay = 2200 + Math.random() * 2600;
      const t = setTimeout(() => {
        if (cancelled) return;
        setExpression((e) => (e === 'smile' ? 'bigSmile' : 'smile'));
        loop();
      }, delay);
      return t;
    };
    const handle = loop();
    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, []);

  const bigSmile = expression === 'bigSmile' && !talking;

  return (
    <svg viewBox="0 0 200 260" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3a2a2f" />
          <stop offset="100%" stopColor="#1f151a" />
        </linearGradient>
        <linearGradient id="topGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e0538f" />
          <stop offset="100%" stopColor="#c23d76" />
        </linearGradient>
      </defs>

      {/* Corps qui respire légèrement */}
      <motion.g
        animate={reducedMotion ? undefined : { y: [0, -2, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Épaules / haut */}
        <path d="M 45 190 Q 100 165 155 190 L 160 260 L 40 260 Z" fill="url(#topGradient)" />

        {/* Bras gauche : repose naturellement le long du corps, léger balancement */}
        <motion.g
          animate={reducedMotion ? undefined : { rotate: [0, 6, 0, -4, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '48px 193px' }}
        >
          <path
            d="M 46 195 Q 34 208 36 228 Q 37 236 42 240"
            stroke="url(#topGradient)"
            strokeWidth="21"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="43" cy="240" r="11" fill="#e8b48c" />
        </motion.g>

        {/* Bras droit : repose le long du corps, puis se lève pour un geste (salut / pouce levé / cœur) */}
        <motion.g
          animate={
            reducedMotion
              ? { rotate: -100 }
              : { rotate: [0, 0, -4, 0, -125, -105, -125, -105, -125, 0, 0, 0] }
          }
          transition={
            reducedMotion
              ? { duration: 0.4 }
              : {
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  times: [0, 0.24, 0.3, 0.36, 0.42, 0.48, 0.54, 0.6, 0.66, 0.74, 0.85, 1],
                }
          }
          style={{ transformOrigin: '152px 193px' }}
        >
          <path
            d="M 154 195 Q 166 208 164 228 Q 163 236 158 240"
            stroke="url(#topGradient)"
            strokeWidth="21"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="157" cy="240" r="11" fill="#e8b48c" />

          {gesture === 'thumbsUp' && (
            <>
              <rect x="152" y="222" width="9" height="16" rx="4" fill="#e8b48c" />
              <circle cx="156.5" cy="220" r="4.5" fill="#e8b48c" />
            </>
          )}

          {gesture === 'heart' && (
            <motion.path
              d="M 157 232 C 152 226 143 228 143 236 C 143 244 157 252 157 252 C 157 252 171 244 171 236 C 171 228 162 226 157 232 Z"
              fill="#c4715f"
              animate={reducedMotion ? undefined : { scale: [1, 1.12, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '157px 240px' }}
            />
          )}

          {gesture === 'wave' && (
            <path d="M 151 245 L 149 254 M 157 246 L 157 256 M 163 245 L 165 254" stroke="#e8b48c" strokeWidth="4" strokeLinecap="round" />
          )}
        </motion.g>

        {/* Couette arrière (derrière la tête) */}
        <motion.path
          d="M 145 90 Q 175 110 165 160 Q 155 175 140 165 Q 150 130 130 100 Z"
          fill="url(#hairGradient)"
          animate={reducedMotion ? undefined : { rotate: [0, 4, 0, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '145px 95px' }}
        />

        {/* Visage : léger balancement de tête */}
        <motion.g
          animate={reducedMotion ? undefined : { rotate: [0, -2, 0, 2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '100px 150px' }}
        >
          <ellipse cx="100" cy="110" rx="52" ry="55" fill="#e8b48c" />

          {/* Oreilles */}
          <ellipse cx="48" cy="112" rx="8" ry="12" fill="#e8b48c" />
          <ellipse cx="152" cy="112" rx="8" ry="12" fill="#e8b48c" />

          {/* Petites créoles dorées, clin d'œil au bijou de la photo de référence */}
          <circle cx="47" cy="123" r="5" fill="none" stroke="#d9a441" strokeWidth="2" />
          <circle cx="153" cy="123" r="5" fill="none" stroke="#d9a441" strokeWidth="2" />

          {/* Joues roses, plus marquées pendant le grand sourire */}
          <ellipse cx="65" cy="130" rx="9" ry="6" fill="#e8927a" opacity={bigSmile ? 0.75 : 0.5} />
          <ellipse cx="135" cy="130" rx="9" ry="6" fill="#e8927a" opacity={bigSmile ? 0.75 : 0.5} />

          {/* Yeux */}
          <motion.g
            animate={{ scaleY: blink ? 0.1 : bigSmile ? 0.55 : 1 }}
            transition={{ duration: 0.15 }}
            style={{ transformOrigin: '78px 108px' }}
          >
            <ellipse cx="78" cy="108" rx="10" ry="13" fill="#241a1e" />
            <circle cx="75" cy="102" r="3.2" fill="#fff" />
            <circle cx="81" cy="112" r="1.6" fill="#fff" opacity="0.7" />
          </motion.g>
          <motion.g
            animate={{ scaleY: blink ? 0.1 : bigSmile ? 0.55 : 1 }}
            transition={{ duration: 0.15 }}
            style={{ transformOrigin: '122px 108px' }}
          >
            <ellipse cx="122" cy="108" rx="10" ry="13" fill="#241a1e" />
            <circle cx="119" cy="102" r="3.2" fill="#fff" />
            <circle cx="125" cy="112" r="1.6" fill="#fff" opacity="0.7" />
          </motion.g>

          {/* Sourcils */}
          <motion.path
            d="M 68 90 Q 78 85 88 90"
            stroke="#2a1d21"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            animate={{ y: bigSmile ? -2 : 0 }}
          />
          <motion.path
            d="M 112 90 Q 122 85 132 90"
            stroke="#2a1d21"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            animate={{ y: bigSmile ? -2 : 0 }}
          />

          {/* Bouche : parle si "talking" (synchronisée voix), sinon sourire normal/grand sourire */}
          {talking ? (
            <motion.ellipse
              cx="100"
              cy="138"
              rx="8"
              ry={6}
              fill="#7a3b3b"
              animate={{ ry: [2.5, 9, 3.5, 7.5, 2.5, 6, 2.5] }}
              transition={{ duration: 0.55, repeat: Infinity }}
            />
          ) : bigSmile ? (
            <path d="M 82 134 Q 100 154 118 134" stroke="#a85c4c" strokeWidth="3" fill="none" strokeLinecap="round" />
          ) : (
            <path d="M 86 136 Q 100 148 114 136" stroke="#a85c4c" strokeWidth="3" fill="none" strokeLinecap="round" />
          )}

          {/* Cheveux : frange + mèches latérales (dessinés par-dessus le visage) */}
          <path
            d="M 48 100 Q 42 40 100 38 Q 158 40 152 100
               Q 148 70 130 62 Q 132 85 122 78
               Q 118 55 100 55 Q 82 55 78 78
               Q 68 85 70 62 Q 52 70 48 100 Z"
            fill="url(#hairGradient)"
          />
          {/* Mèches qui retombent sur les côtés */}
          <path d="M 46 98 Q 38 130 46 165 Q 56 150 54 115 Z" fill="url(#hairGradient)" />
          <path d="M 154 98 Q 162 130 154 165 Q 144 150 146 115 Z" fill="url(#hairGradient)" />
        </motion.g>
      </motion.g>
    </svg>
  );
}
