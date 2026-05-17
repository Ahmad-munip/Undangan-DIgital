import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

interface GoldParticlesProps {
  count?: number;
  speed?: number;
  size?: number;
}

const GoldParticlesInner = ({ count = 120, speed = 0.15, size = 0.02 }: GoldParticlesProps) => {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * speed * 0.3;
      ref.current.rotation.x += delta * speed * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#c9a84c"
        size={size}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
};

interface Particles3DProps {
  count?: number;
  speed?: number;
  size?: number;
  className?: string;
}

const Particles3D = ({ count = 120, speed = 0.15, size = 0.02, className = "" }: Particles3DProps) => {
  return (
    <div className={`fixed inset-0 pointer-events-none z-[1] ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <GoldParticlesInner count={count} speed={speed} size={size} />
      </Canvas>
    </div>
  );
};

export default Particles3D;
