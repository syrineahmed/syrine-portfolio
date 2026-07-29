import { useEffect, useRef, useState } from 'react';

// Ne devient "true" qu'une fois l'élément entré dans le viewport, puis le
// reste : sert à ne monter les scènes 3D (coûteuses) que quand elles sont
// réellement visibles, plutôt que de toutes les charger au démarrage.
export function useInView<T extends HTMLElement>(margin = '200px') {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, margin]);

  return { ref, inView };
}
