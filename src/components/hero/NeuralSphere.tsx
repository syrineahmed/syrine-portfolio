import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuralSphereProps {
  /** Intensité de pulsation, ex: montée quand l'assistant vocal parle */
  pulse?: number;
}

// Génère des points répartis uniformément sur une sphère (spirale de Fibonacci)
function fibonacciSpherePoints(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

export default function NeuralSphere({ pulse = 0 }: NeuralSphereProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const nodeCount = 140;
  const radius = 2.1;
  const points = useMemo(() => fibonacciSpherePoints(nodeCount, radius), []);

  // Construit les connexions "circuit" entre nœuds proches (pas toutes les paires -> perf)
  const linePositions = useMemo(() => {
    const positions: number[] = [];
    const maxDist = 0.85;
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < maxDist) {
          positions.push(points[i].x, points[i].y, points[i].z);
          positions.push(points[j].x, points[j].y, points[j].z);
        }
      }
    }
    return new Float32Array(positions);
  }, [points]);

  const nodePositions = useMemo(() => {
    const arr = new Float32Array(points.length * 3);
    points.forEach((p, i) => {
      arr[i * 3] = p.x;
      arr[i * 3 + 1] = p.y;
      arr[i * 3 + 2] = p.z;
    });
    return arr;
  }, [points]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
    if (materialRef.current) {
      const base = 0.045;
      materialRef.current.size = base + pulse * 0.06 + Math.sin(state.clock.elapsedTime * 2) * 0.006;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Connexions "circuit" */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#5a4750" transparent opacity={0.5} />
      </lineSegments>

      {/* Nœuds "neurones" */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={materialRef}
          color={pulse > 0.3 ? '#b9975b' : '#c4715f'}
          size={0.045}
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>

      {/* Noyau central lumineux */}
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color="#c4715f" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
