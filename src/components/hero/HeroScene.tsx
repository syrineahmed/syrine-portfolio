import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, Suspense } from 'react';
import * as THREE from 'three';
import NeuralSphere from './NeuralSphere';

interface HeroSceneProps {
  pulse?: number;
}

// Parallaxe douce : la caméra suit légèrement la souris
function CameraRig() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3());

  useFrame(() => {
    target.current.set(pointer.x * 0.4, pointer.y * 0.25, camera.position.z);
    camera.position.lerp(target.current, 0.03);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroScene({ pulse = 0 }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <NeuralSphere pulse={pulse} />
        <CameraRig />
      </Suspense>
    </Canvas>
  );
}
