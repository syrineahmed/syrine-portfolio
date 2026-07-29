import { useEffect, useState } from 'react';

const SECTION_IDS = ['hero', 'about', 'projects', 'skills', 'experience', 'education', 'certificates', 'resume', 'contact'];

// Retourne l'ID de la section actuellement la plus visible à l'écran,
// pour permettre à l'avatar-guide d'adapter son message en conséquence.
export function useActiveSection(): string {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.3, 0.5, 0.7], rootMargin: '-15% 0px -15% 0px' }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}
