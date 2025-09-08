"use client";

import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Model 컴포넌트: Suspense로 로딩 처리
function Model({ pokemonId }: { pokemonId: number }) {
  const modelUrl = `https://raw.githubusercontent.com/Sudhanshu-Ambastha/Pokemon-3D/main/models/glb/regular/${pokemonId}.glb`;
  const { scene } = useGLTF(modelUrl); // 훅은 컴포넌트 안에서만 호출
  return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
}

export function Pokemon3DViewer({
  pokemonId,
  className,
}: {
  pokemonId: number;
  className?: string;
}) {
  if (!pokemonId) return null;

  // 주변 포켓몬 미리 로딩
  useEffect(() => {
    const preloadRange = 5;
    for (
      let i = Math.max(1, pokemonId - preloadRange);
      i <= pokemonId + preloadRange;
      i++
    ) {
      if (i !== pokemonId) {
        useGLTF.preload(
          `https://raw.githubusercontent.com/Sudhanshu-Ambastha/Pokemon-3D/main/models/glb/regular/${i}.glb`
        );
      }
    }
  }, [pokemonId]);

  return (
    <div className={className} style={{ height: "300px", width: "100%" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        <Suspense fallback={null}>
          <Model pokemonId={pokemonId} />
        </Suspense>
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>
    </div>
  );
}
