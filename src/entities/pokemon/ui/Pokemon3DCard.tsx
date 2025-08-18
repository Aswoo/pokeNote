'use client';

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
// import html2canvas from 'html2canvas'; // html2canvas 제거
// import PokemonCardFace from './PokemonCardFace'; // PokemonCardFace 제거

// The 3D card mesh component
function CardMesh({ frontTextureUrl, backTextureUrl }: { frontTextureUrl: string, backTextureUrl: string }) {
  const mesh = useRef<THREE.Mesh>(null!);

  // 앞면 텍스처 로드
  const frontTexture = useTexture(frontTextureUrl,
    (loader) => { loader.crossOrigin = 'anonymous'; },
    (progress) => console.log('Front texture loading progress:', progress),
    (error) => console.error('Front texture loading error:', error)
  );

  // 뒷면 텍스처 로드
  const backTexture = useTexture(backTextureUrl,
    (loader) => { loader.crossOrigin = 'anonymous'; },
    (progress) => console.log('Back texture loading progress:', progress),
    (error) => console.error('Back texture loading error:', error)
  );

  // Use useFrame for continuous animation/interaction
  useFrame((state, delta) => {
    const { x, y } = state.mouse;
    if (mesh.current) {
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, x * 0.2, 0.1);
      mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, -y * 0.2, 0.1);
    }
  });

  // 재질 배열 정의: [오른쪽, 왼쪽, 위, 아래, 앞, 뒤]
  const materials = [
    new THREE.MeshStandardMaterial({ color: new THREE.Color("#666") }), // Right
    new THREE.MeshStandardMaterial({ color: new THREE.Color("#666") }), // Left
    new THREE.MeshStandardMaterial({ color: new THREE.Color("#666") }), // Top
    new THREE.MeshStandardMaterial({ color: new THREE.Color("#666") }), // Bottom
    new THREE.MeshStandardMaterial({ map: frontTexture }), // Front (Pokemon Image)
    new THREE.MeshStandardMaterial({ map: backTexture }), // Back (Pokemon Card Back)
  ];

  return (
    <mesh ref={mesh} material={materials}> {/* materials prop 사용 */}
      <boxGeometry args={[3, 4.2, 0.05]} />
    </mesh>
  );
}

// The main 3D card viewer component
interface Pokemon3DCardProps {
  onClose: () => void;
  pokemonImageUrl: string; // 포켓몬 이미지 URL을 직접 받도록 변경
}

const Pokemon3DCard: React.FC<Pokemon3DCardProps> = ({ onClose, pokemonImageUrl }) => {
  // 포켓몬 카드 뒷면 이미지 URL
  const backCardImageUrl = 'https://images.pokemontcg.io/swsh35/1_hires.png';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="w-full h-full max-w-lg max-h-lg" onClick={(e) => e.stopPropagation()}>
          <Canvas camera={{ position: [0, 0, 5] }} flat linear style={{ background: '#ADD8E6' }}>
            <ambientLight intensity={2.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <Suspense fallback={null}>
              <CardMesh frontTextureUrl={pokemonImageUrl} backTextureUrl={backCardImageUrl} />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
      </div>
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl font-bold">&times;</button>
    </div>
  );
};

export default Pokemon3DCard;
