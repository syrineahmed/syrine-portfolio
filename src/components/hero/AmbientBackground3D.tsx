import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

const NODE_COUNT = 46;

function NeuralField() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);

  // Nuage de points dispersé façon "réseau de neurones", généré une seule fois
  const nodes = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      pts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 16,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 6 - 2
        )
      );
    }
    return pts;
  }, []);

  // Relie chaque nœud à ses 1-2 voisins les plus proches, pour suggérer des
  // connexions plutôt qu'un nuage de points aléatoire — un clin d'œil discret
  // au profil "IA & intégration" de Syrine, présent en filigrane tout au long
  // du scroll plutôt que largué section par section.
  const linePositions = useMemo(() => {
    const positions: number[] = [];
    nodes.forEach((a, i) => {
      const distances = nodes
        .map((b, j) => ({ j, d: i === j ? Infinity : a.distanceTo(b) }))
        .sort((x, y) => x.d - y.d)
        .slice(0, 2);
      distances.forEach(({ j, d }) => {
        if (d < 7) {
          positions.push(a.x, a.y, a.z, nodes[j].x, nodes[j].y, nodes[j].z);
        }
      });
    });
    return new Float32Array(positions);
  }, [nodes]);

  const nodePositions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3);
    nodes.forEach((p, i) => {
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    return arr;
  }, [nodes]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    // Dérive très lente, plus une légère réponse au scroll pour donner
    // l'impression que le champ accompagne la lecture de la page.
    groupRef.current.rotation.y += delta * 0.015;
    const targetScroll = typeof window !== 'undefined' ? window.scrollY * 0.0009 : 0;
    scrollRef.current += (targetScroll - scrollRef.current) * 0.05;
    groupRef.current.position.y = 6 - scrollRef.current * 4;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#b9975b" transparent opacity={0.16} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#c4715f" size={0.09} transparent opacity={0.4} sizeAttenuation />
      </points>
    </group>
  );
}

// Fond 3D discret et cohérent, présent en continu derrière tout le contenu
// pendant le scroll — plutôt qu'un objet 3D isolé par section, sans lien avec
// le propos, ce champ de nœuds reliés évoque le fil conducteur "ingénierie /
// IA" du profil, à très faible opacité pour ne jamais gêner la lecture.
export default function AmbientBackground3D() {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 9], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <NeuralField />
        </Suspense>
      </Canvas>
    </div>
  );
}
