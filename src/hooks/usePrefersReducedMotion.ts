import { useEffect, useState } from 'react';

// Respecte la préférence système "réduire les animations" : les animations
// JS (framer-motion, three.js) ne sont pas couvertes par la règle CSS
// @media (prefers-reduced-motion) définie dans index.css, donc on l'écoute ici.
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(query.matches);
    const listener = (e: MediaQueryListEvent) => setReduced(e.matches);
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }, []);

  return reduced;
}
